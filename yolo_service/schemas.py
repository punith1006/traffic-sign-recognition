from pydantic import BaseModel
from typing import List, Optional

class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float

class Prediction(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    category: str
    bbox: Optional[BoundingBox] = None

class PredictionResponse(BaseModel):
    success: bool
    predictions: List[Prediction]
    inference_time_ms: float
    image_size: List[int]
    image_phash: Optional[str] = None  # Perceptual hash for duplicate detection
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_classes: Optional[int] = None
