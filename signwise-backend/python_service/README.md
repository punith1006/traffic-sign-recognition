# SignWise AI - YOLO Traffic Sign Recognition Service

## Quick Start

### 1. Install Dependencies
```bash
cd python_service
pip install -r requirements.txt
```

### 2. Start the Service
```bash
python main.py
```
Service runs on: http://localhost:8000

### 3. Test Health
```
GET http://localhost:8000/health
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/recognize` | POST | Recognize traffic sign from base64 image |
| `/classes` | GET | List available sign classes |

## Request Format
```json
POST /recognize
{
  "image_base64": "data:image/jpeg;base64,..."
}
```

## Response Format
```json
{
  "success": true,
  "sign_name": "Stop Sign",
  "category": "REGULATORY",
  "description": "Come to a complete stop.",
  "rules": "Stop completely before proceeding.",
  "confidence": 0.95,
  "is_mock": false
}
```

## Adding Custom Model

Place pre-trained model in `models/` folder:
- `models/yolov8_traffic_signs.pt` - Traffic sign specific
- `models/best.pt` - Any trained model

The service will auto-load from these paths.
