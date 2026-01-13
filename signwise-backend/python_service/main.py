"""
SignWise AI - YOLO Traffic Sign Recognition Service
FastAPI service for traffic sign detection and classification
"""

import os
import io
import base64
from typing import Optional, List, Dict, Any
from PIL import Image
from PIL import Image
import numpy as np
import cv2

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Fix for PyTorch 2.6+ security restrictions
# These models are from trusted sources (HuggingFace, ultralytics), so we disable strict mode
import torch

# Monkey-patch torch.load to use weights_only=False for model loading
_original_torch_load = torch.load
def _patched_torch_load(*args, **kwargs):
    if 'weights_only' not in kwargs:
        kwargs['weights_only'] = False
    return _original_torch_load(*args, **kwargs)
torch.load = _patched_torch_load

# Try to import ultralytics
try:
    from ultralytics import YOLO
    YOLO_AVAILABLE = True
except ImportError:
    YOLO_AVAILABLE = False
    print("Warning: ultralytics not installed. Using mock mode.")

app = FastAPI(
    title="SignWise AI - YOLO Recognition Service",
    description="Traffic sign detection and classification using YOLOv8",
    version="1.0.0"
)

# CORS for Express backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model = None

# Traffic sign class names mapping (TT100K + common signs)
# This will be populated from the model or use a default mapping
SIGN_CLASSES = {
    0: {"name": "Stop Sign", "category": "REGULATORY", "description": "Come to a complete stop.", "rules": "Stop completely before proceeding."},
    1: {"name": "Yield Sign", "category": "REGULATORY", "description": "Yield to other traffic.", "rules": "Slow down and give way to other vehicles."},
    2: {"name": "Speed Limit 20", "category": "REGULATORY", "description": "Maximum speed 20 km/h.", "rules": "Do not exceed 20 km/h in this zone."},
    3: {"name": "Speed Limit 30", "category": "REGULATORY", "description": "Maximum speed 30 km/h.", "rules": "Do not exceed 30 km/h in this zone."},
    4: {"name": "Speed Limit 50", "category": "REGULATORY", "description": "Maximum speed 50 km/h.", "rules": "Do not exceed 50 km/h in this zone."},
    5: {"name": "Speed Limit 60", "category": "REGULATORY", "description": "Maximum speed 60 km/h.", "rules": "Do not exceed 60 km/h in this zone."},
    6: {"name": "Speed Limit 70", "category": "REGULATORY", "description": "Maximum speed 70 km/h.", "rules": "Do not exceed 70 km/h in this zone."},
    7: {"name": "Speed Limit 80", "category": "REGULATORY", "description": "Maximum speed 80 km/h.", "rules": "Do not exceed 80 km/h in this zone."},
    8: {"name": "No Entry", "category": "REGULATORY", "description": "Entry prohibited.", "rules": "Do not enter this road."},
    9: {"name": "No Parking", "category": "REGULATORY", "description": "Parking not allowed.", "rules": "Do not park in this area."},
    10: {"name": "No U-Turn", "category": "REGULATORY", "description": "U-turns prohibited.", "rules": "Do not make a U-turn here."},
    11: {"name": "One Way", "category": "REGULATORY", "description": "Traffic flows one direction.", "rules": "Travel only in the direction indicated."},
    12: {"name": "Pedestrian Crossing", "category": "WARNING", "description": "Pedestrians may cross ahead.", "rules": "Slow down and watch for pedestrians."},
    13: {"name": "Deer Crossing", "category": "WARNING", "description": "Wildlife may cross the road.", "rules": "Be alert for deer, especially at dawn/dusk."},
    14: {"name": "Road Work", "category": "CONSTRUCTION", "description": "Construction zone ahead.", "rules": "Slow down and watch for workers."},
    15: {"name": "Curve Ahead", "category": "WARNING", "description": "Road curves ahead.", "rules": "Reduce speed before entering the curve."},
    16: {"name": "Slippery Road", "category": "WARNING", "description": "Road may be slippery.", "rules": "Reduce speed in wet conditions."},
    17: {"name": "Railroad Crossing", "category": "WARNING", "description": "Railroad tracks ahead.", "rules": "Look both ways and never stop on tracks."},
    18: {"name": "School Zone", "category": "WARNING", "description": "School area ahead.", "rules": "Reduce speed and watch for children."},
    19: {"name": "Hospital", "category": "GUIDE", "description": "Hospital nearby.", "rules": "Follow signs for hospital access."},
    20: {"name": "Parking", "category": "GUIDE", "description": "Parking available.", "rules": "Parking is permitted in this area."},
}

class RecognitionRequest(BaseModel):
    image_base64: str

class RecognitionResult(BaseModel):
    success: bool
    sign_name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    rules: Optional[str] = None
    confidence: float = 0.0
    class_id: Optional[int] = None
    xp_value: int = 10
    annotated_image: Optional[str] = None  # Base64 encoded JPEG
    all_detections: Optional[List[Dict[str, Any]]] = None
    error: Optional[str] = None
    message: Optional[str] = None
    is_mock: bool = False

def categorize_sign(sign_name: str) -> str:
    """Categorize traffic sign based on its name"""
    name_lower = sign_name.lower()
    
    # Regulatory signs (red/white, commands or prohibitions)
    regulatory_keywords = ['stop', 'yield', 'speed limit', 'no entry', 'no parking', 
                          'no u-turn', 'no turn', 'one way', 'do not', 'prohibited',
                          'limit', 'restrict', 'no overtaking', 'no horn']
    if any(kw in name_lower for kw in regulatory_keywords):
        return "REGULATORY"
    
    # Warning signs (yellow/orange)
    warning_keywords = ['warning', 'caution', 'ahead', 'crossing', 'curve', 'turn',
                       'slippery', 'bump', 'children', 'pedestrian', 'animal',
                       'deer', 'cattle', 'road work', 'construction', 'danger',
                       'slope', 'hill', 'narrow', 'merge']
    if any(kw in name_lower for kw in warning_keywords):
        return "WARNING"
    
    # Guide/Information signs (blue/green)
    guide_keywords = ['hospital', 'parking', 'information', 'direction', 'route',
                     'exit', 'entrance', 'service', 'food', 'fuel', 'rest']
    if any(kw in name_lower for kw in guide_keywords):
        return "GUIDE"
    
    # Construction signs
    construction_keywords = ['work', 'construction', 'detour', 'closed']
    if any(kw in name_lower for kw in construction_keywords):
        return "CONSTRUCTION"
    
    return "TRAFFIC_SIGN"

def get_sign_rules(sign_name: str) -> str:
    """Generate appropriate rules based on sign name"""
    name_lower = sign_name.lower()
    
    if 'stop' in name_lower:
        return "Come to a complete stop. Check all directions before proceeding."
    elif 'yield' in name_lower:
        return "Slow down and give way to other traffic. Stop if necessary."
    elif 'speed' in name_lower or 'limit' in name_lower:
        return "Do not exceed the posted speed limit in this zone."
    elif 'no entry' in name_lower or 'do not enter' in name_lower:
        return "Entry is prohibited. Do not enter this road."
    elif 'no parking' in name_lower:
        return "Parking is not allowed. Vehicles may be towed."
    elif 'no u-turn' in name_lower:
        return "U-turns are prohibited at this location."
    elif 'pedestrian' in name_lower or 'crossing' in name_lower:
        return "Watch for pedestrians. Slow down and be prepared to stop."
    elif 'curve' in name_lower or 'turn' in name_lower:
        return "Road curves ahead. Reduce speed before the curve."
    elif 'construction' in name_lower or 'work' in name_lower:
        return "Construction zone ahead. Reduce speed and watch for workers."
    elif 'school' in name_lower or 'children' in name_lower:
        return "School zone. Watch for children and reduce speed."
    elif 'hospital' in name_lower:
        return "Hospital nearby. Follow signs for hospital access."
    else:
        return "Follow this traffic sign's instructions for safe driving."

def load_model():
    """Load YOLO model on startup"""
    global model
    
    if not YOLO_AVAILABLE:
        print("YOLO not available, running in mock mode")
        return
    
    # Try to load traffic sign models in order of preference
    model_paths = [
        "./models/vietnam_traffic.pt",  # YOLOv8 Vietnam traffic signs (many classes)
        "./models/trafic.pt",  # HuggingFace traffic sign model (24 Turkish classes)
        "./models/best.pt",  # Any best.pt in models folder
        "yolov8n.pt",  # Fallback to nano model (general detection - NOT for traffic signs!)
    ]
    
    for path in model_paths:
        if os.path.exists(path):
            try:
                model = YOLO(path)
                print(f"✅ Loaded model from: {path}")
                print(f"📊 Model has {len(model.names)} classes:")
                for idx, name in model.names.items():
                    print(f"   {idx}: {name}")
                return
            except Exception as e:
                print(f"❌ Failed to load {path}: {e}")
    
    # Fallback: download and use yolov8n (general detection)
    try:
        model = YOLO("yolov8n.pt")
        print("⚠️ Loaded default YOLOv8n model (NOT trained for traffic signs!)")
    except Exception as e:
        print(f"❌ Failed to load any model: {e}")
        model = None

def decode_base64_image(image_base64: str) -> Image.Image:
    """Decode base64 image to PIL Image"""
    # Remove data URL prefix if present
    if "," in image_base64:
        image_base64 = image_base64.split(",")[1]
    
    image_data = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_data))
    
    # Convert to RGB if necessary
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    return image

def get_mock_prediction() -> RecognitionResult:
    """Return mock prediction when model not available"""
    import random
    class_id = random.choice(list(SIGN_CLASSES.keys()))
    sign_info = SIGN_CLASSES[class_id]
    
    return RecognitionResult(
        success=True,
        sign_name=sign_info["name"],
        category=sign_info["category"],
        description=sign_info["description"],
        rules=sign_info["rules"],
        confidence=0.85 + random.random() * 0.14,
        class_id=class_id,
        is_mock=True
    )

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    load_model()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "yolo_available": YOLO_AVAILABLE
    }

@app.post("/recognize", response_model=RecognitionResult)
async def recognize_sign(request: RecognitionRequest):
    """
    Recognize traffic sign from base64 image
    """
    try:
        # Decode image
        image = decode_base64_image(request.image_base64)
        print(f"\n{'='*60}")
        print(f"📷 Processing image: {image.size[0]}x{image.size[1]}")
        
        # If model not available, return mock
        if model is None:
            print("❌ Model not loaded - returning mock")
            return get_mock_prediction()
        
        print(f"🔍 Running inference with model: {type(model).__name__}")
        print(f"📊 Model classes available: {len(model.names) if hasattr(model, 'names') else 'unknown'}")
        
        # Run inference
        results = model.predict(
            source=np.array(image),
            conf=0.25,  # Confidence threshold
            verbose=False
        )
        
        # Log all detections
        print(f"📦 Results received: {len(results)} result batches")
        if len(results) > 0:
            r = results[0]
            print(f"   Boxes detected: {len(r.boxes) if r.boxes is not None else 0}")
            if hasattr(r, 'probs') and r.probs is not None:
                print(f"   Classification probs: top={r.probs.top1}, conf={r.probs.top1conf:.2%}")
            if r.boxes is not None and len(r.boxes) > 0:
                print("   Detections:")
                for i, box in enumerate(r.boxes):
                    cls_id = int(box.cls[0])
                    conf = float(box.conf[0])
                    cls_name = r.names.get(cls_id, f"class_{cls_id}")
                    print(f"     [{i}] Class {cls_id}: '{cls_name}' (conf: {conf:.2%})")
        
        # Process results
        if len(results) == 0 or len(results[0].boxes) == 0:
            print("⚠️ No boxes detected in image")
            # No detection - try classification approach
            # For classification models, check probs
            if hasattr(results[0], 'probs') and results[0].probs is not None:
                print("📊 Using classification probabilities")
                probs = results[0].probs
                top_class = int(probs.top1)
                top_conf = float(probs.top1conf)
                
                if top_class in SIGN_CLASSES:
                    sign_info = SIGN_CLASSES[top_class]
                else:
                    # Unknown class - return with class name from model
                    class_name = results[0].names.get(top_class, f"Unknown Sign {top_class}")
                    sign_info = {
                        "name": class_name,
                        "category": "UNKNOWN",
                        "description": f"Traffic sign detected: {class_name}",
                        "rules": "Follow the sign's instructions."
                    }
                
                # Generate annotated image
                annotated_base64 = None
                try:
                    print("📸 Generating annotated image...")
                    # Get plotted image (BGR numpy array)
                    plot_arr = results[0].plot()
                    print(f"   - Plot shape: {plot_arr.shape}")
                    
                    # Convert BGR to RGB
                    plot_rgb = cv2.cvtColor(plot_arr, cv2.COLOR_BGR2RGB)
                    
                    # Convert to PIL Image
                    plot_img = Image.fromarray(plot_rgb)
                    
                    # Save to buffer as JPEG
                    buff = io.BytesIO()
                    plot_img.save(buff, format="JPEG")
                    
                    # Encode to base64
                    img_str = base64.b64encode(buff.getvalue()).decode("utf-8")
                    annotated_base64 = f"data:image/jpeg;base64,{img_str}"
                    print(f"   - Image generated successfully! Length: {len(annotated_base64)} chars")
                except Exception as e:
                    print(f"❌ Failed to generate annotated image: {e}")
                    import traceback
                    traceback.print_exc()

                print(f"✅ Classification result: {sign_info['name']} ({top_conf:.2%})")
                return RecognitionResult(
                    success=True,
                    sign_name=sign_info["name"],
                    category=sign_info["category"],
                    description=sign_info["description"],
                    rules=sign_info["rules"],
                    confidence=top_conf,
                    class_id=top_class,
                    annotated_image=annotated_base64,
                    is_mock=False
                )
            
            # No detections at all - return mock fallback
            print("❌ No detections - returning MOCK RANDOM prediction")
            mock = get_mock_prediction()
            print(f"🎲 Mock sign: {mock.sign_name}")
            return mock
        
        # Process detection results
        all_detections = []
        best_detection = None
        best_conf = 0
        
        for box in results[0].boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            
            detection = {
                "class_id": class_id,
                "confidence": confidence,
                "bbox": box.xyxy[0].tolist()
            }
            all_detections.append(detection)
            
            if confidence > best_conf:
                best_conf = confidence
                best_detection = detection
        
        if best_detection:
            class_id = best_detection["class_id"]
            # Get class name from model if available
            class_name = results[0].names.get(class_id, f"Traffic Sign {class_id}")
            
            # Try to categorize the sign based on its name
            sign_category = categorize_sign(class_name)
            
            print(f"✅ Detected: {class_name} (class {class_id}) with confidence {best_conf:.2%}")
            print(f"   Category: {sign_category}")
            
            sign_info = {
                "name": class_name,
                "category": sign_category,
                "description": f"Traffic sign detected: {class_name}",
                "rules": get_sign_rules(class_name)
            }
            
            # Generate annotated image
            annotated_base64 = None
            try:
                print("📸 Generating annotated image...")
                # Get plotted image (BGR numpy array)
                plot_arr = results[0].plot()
                print(f"   - Plot shape: {plot_arr.shape}")
                
                # Convert BGR to RGB
                plot_rgb = cv2.cvtColor(plot_arr, cv2.COLOR_BGR2RGB)
                
                # Convert to PIL Image
                plot_img = Image.fromarray(plot_rgb)
                
                # Save to buffer as JPEG
                buff = io.BytesIO()
                plot_img.save(buff, format="JPEG")
                
                # Encode to base64
                img_str = base64.b64encode(buff.getvalue()).decode("utf-8")
                annotated_base64 = f"data:image/jpeg;base64,{img_str}"
                print(f"   - Image generated successfully! Length: {len(annotated_base64)} chars")
            except Exception as e:
                print(f"❌ Failed to generate annotated image: {e}")
                import traceback
                traceback.print_exc()
            
            print(f"{'='*60}\n")
            return RecognitionResult(
                success=True,
                sign_name=sign_info["name"],
                category=sign_info["category"],
                description=sign_info["description"],
                rules=sign_info["rules"],
                confidence=best_conf,
                class_id=class_id,
                all_detections=all_detections,
                annotated_image=annotated_base64,
                is_mock=False
            )
        
        # Fallback to mock
        print("❌ No best detection - returning MOCK")
        return get_mock_prediction()
        
    except Exception as e:
        print(f"Recognition error: {e}")
        # Return mock on error
        mock = get_mock_prediction()
        mock.error = str(e)
        return mock

@app.get("/classes")
async def get_classes():
    """Return available sign classes"""
    return {
        "classes": SIGN_CLASSES,
        "count": len(SIGN_CLASSES)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
