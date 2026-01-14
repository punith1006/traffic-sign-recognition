import os
import time
import logging
from pathlib import Path
from typing import Optional, Tuple
import numpy as np
from PIL import Image
import io

# =============================================================================
# PyTorch 2.6+ Compatibility Fix
# The new PyTorch defaults weights_only=True which breaks loading YOLO models
# We need to monkey-patch torch.load BEFORE importing ultralytics
# =============================================================================
import torch
_original_torch_load = torch.load

def _patched_torch_load(*args, **kwargs):
    """Patched torch.load that forces weights_only=False for model loading."""
    if 'weights_only' not in kwargs:
        kwargs['weights_only'] = False
    return _original_torch_load(*args, **kwargs)

torch.load = _patched_torch_load
# =============================================================================

from config import MODEL_PATH, CONFIDENCE_THRESHOLD, get_category, get_pretty_name
from schemas import Prediction, BoundingBox

logger = logging.getLogger(__name__)

class YOLOModel:
    """Wrapper for YOLO model inference."""
    
    def __init__(self):
        self.model = None
        self.class_names = {}
        self._loaded = False
        
    def load(self, model_path: str = MODEL_PATH) -> bool:
        """Load the YOLO model from disk. Auto-downloads if missing."""
        try:
            from ultralytics import YOLO
            
            path = Path(model_path)
            
            # If model doesn't exist, try to download it
            if not path.exists():
                logger.warning(f"Model not found at {model_path}")
                logger.info("Attempting to download traffic sign detection model...")
                
                if not self._download_model(path):
                    raise FileNotFoundError(
                        f"Traffic sign model not found at {model_path}. "
                        "Please run 'python download_model.py' first."
                    )
            
            # Load the model with PyTorch 2.6+ compatibility fix
            logger.info(f"Loading model from {path}...")
            
            # Fix for PyTorch 2.6+ - add safe globals for ultralytics classes
            try:
                import torch
                import torch.serialization
                # Allow ultralytics model classes to be loaded
                torch.serialization.add_safe_globals([])
            except (AttributeError, ImportError):
                pass  # Older PyTorch version, no fix needed
            
            self.model = YOLO(str(path))
            
            # Get class names from model
            self.class_names = self.model.names if hasattr(self.model, 'names') else {}
            self._loaded = True
            logger.info(f"✅ Model loaded successfully with {len(self.class_names)} classes")
            # logger.info(f"   Classes: {list(self.class_names.values())[:10]}...")
            return True
            
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            self._loaded = False
            return False
    
    def _download_model(self, target_path: Path) -> bool:
        """Download the traffic sign detection model from HuggingFace."""
        try:
            from huggingface_hub import hf_hub_download
            
            # Try to download from HuggingFace - StreetSignSenseY12n approved
            repo_options = [
                ("AlessandroFerrante/StreetSignSenseY12n", None),  # ⭐ APPROVED - 63 classes
                ("AlessandroFerrante/StreetSignSenseY12s", None),  # Fallback - larger model
            ]
            
            for repo_id, filename in repo_options:
                try:
                    logger.info(f"Trying to download from {repo_id}...")
                    
                    downloaded_path = hf_hub_download(
                        repo_id=repo_id,
                        filename=filename,
                        local_dir=str(target_path.parent),
                        local_dir_use_symlinks=False
                    )
                    
                    # Verify download
                    if Path(downloaded_path).exists():
                        logger.info(f"✅ Downloaded model from {repo_id}")
                        return True
                        
                except Exception as e:
                    logger.warning(f"Failed to download from {repo_id}: {e}")
                    continue
            
            return False
            
        except ImportError:
            logger.error("huggingface_hub not installed. Run: pip install huggingface_hub")
            return False
    
    @property
    def is_loaded(self) -> bool:
        return self._loaded
    
    @property
    def num_classes(self) -> int:
        return len(self.class_names)
    
    def predict(self, image_bytes: bytes) -> Tuple[list, float, Tuple[int, int]]:
        """
        Run inference on an image.
        
        Args:
            image_bytes: Raw image bytes
            
        Returns:
            Tuple of (predictions list, inference time in ms, image size)
        """
        if not self._loaded:
            raise RuntimeError("Model not loaded")
        
        # Load image from bytes
        image = Image.open(io.BytesIO(image_bytes))
        image_size = image.size  # (width, height)
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Run inference
        start_time = time.time()
        results = self.model(image, conf=CONFIDENCE_THRESHOLD, verbose=False)
        inference_time = (time.time() - start_time) * 1000  # Convert to ms
        
        predictions = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for i, box in enumerate(boxes):
                    class_id = int(box.cls[0].item())
                    confidence = float(box.conf[0].item())
                    
                    # Get raw class name from model
                    raw_class_name = self.class_names.get(class_id, f"Class_{class_id}")
                    
                    # Get human-readable name and info
                    pretty_info = get_pretty_name(raw_class_name)
                    class_name = pretty_info["name"]
                    category = pretty_info["category"]
                    
                    # Get bounding box coordinates
                    xyxy = box.xyxy[0].tolist()
                    bbox = BoundingBox(
                        x1=xyxy[0],
                        y1=xyxy[1],
                        x2=xyxy[2],
                        y2=xyxy[3]
                    )
                    
                    predictions.append(Prediction(
                        class_id=class_id,
                        class_name=class_name,
                        confidence=round(confidence, 4),
                        category=category,
                        bbox=bbox
                    ))
        
        # Sort by confidence (highest first)
        predictions.sort(key=lambda x: x.confidence, reverse=True)
        
        # Rich logging output
        logger.info("=" * 60)
        logger.info(f"📸 INFERENCE COMPLETE | Time: {round(inference_time, 2)}ms | Image: {image_size[0]}x{image_size[1]}")
        logger.info("-" * 60)
        if predictions:
            for i, pred in enumerate(predictions, 1):
                raw_label = self.class_names.get(pred.class_id, 'Unknown')
                logger.info(f"  [{i}] 🎯 {pred.class_name}")
                logger.info(f"      ├─ Confidence:  {pred.confidence:.1%}")
                logger.info(f"      ├─ Category:    {pred.category}")
                logger.info(f"      ├─ Class ID:    {pred.class_id}")
                logger.info(f"      ├─ Raw Label:   {raw_label}")
                logger.info(f"      └─ BBox:        ({pred.bbox.x1:.0f}, {pred.bbox.y1:.0f}) → ({pred.bbox.x2:.0f}, {pred.bbox.y2:.0f})")
        else:
            logger.info("  ⚠️ No traffic signs detected in image")
        logger.info("=" * 60)
        
        return predictions, round(inference_time, 2), list(image_size)


# Global model instance
model = YOLOModel()
