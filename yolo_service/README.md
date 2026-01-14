# YOLO Traffic Sign Detection Service

FastAPI service for traffic sign recognition using pre-trained YOLOv8.

## Setup

```bash
pip install -r requirements.txt
python main.py
```

## API

- `GET /health` - Health check
- `POST /predict` - Upload image for sign detection
