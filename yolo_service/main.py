import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import HOST, PORT, ALLOWED_ORIGINS
from schemas import PredictionResponse, HealthResponse
from model import model

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model on startup."""
    logger.info("Starting YOLO inference service...")
    success = model.load()
    if success:
        logger.info("Model loaded successfully!")
    else:
        logger.warning("Model loading had issues, using fallback")
    yield
    logger.info("Shutting down YOLO inference service...")

# Create FastAPI app
app = FastAPI(
    title="SignWise AI - YOLO Service",
    description="Traffic sign detection using YOLOv8",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Check if the service is healthy and model is loaded."""
    return HealthResponse(
        status="healthy" if model.is_loaded else "degraded",
        model_loaded=model.is_loaded,
        model_classes=model.num_classes if model.is_loaded else None
    )

@app.post("/predict", response_model=PredictionResponse)
async def predict(image: UploadFile = File(...)):
    """
    Detect traffic signs in an uploaded image.
    
    - **image**: Image file (JPEG, PNG)
    
    Returns detected signs with class names, confidence scores, and bounding boxes.
    """
    # Validate file type
    if not image.content_type or not image.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload an image file (JPEG, PNG)."
        )
    
    # Check file size (max 10MB)
    contents = await image.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum size is 10MB."
        )
    
    # Check if model is loaded
    if not model.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Service is starting up."
        )
    
    try:
        # Run prediction
        predictions, inference_time, image_size = model.predict(contents)
        
        message = None
        if not predictions:
            message = "No traffic signs detected in the image."
        
        return PredictionResponse(
            success=True,
            predictions=predictions,
            inference_time_ms=inference_time,
            image_size=image_size,
            message=message
        )
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error during prediction: {str(e)}"
        )

@app.get("/")
async def root():
    """Root endpoint with service info."""
    return {
        "service": "SignWise AI - YOLO Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)
