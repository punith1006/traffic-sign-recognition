# SignWise AI - Traffic Sign Recognition Platform

An AI-powered road safety learning platform that uses YOLO-based image recognition to help users learn traffic signs through gamified quizzes and interactive learning.

## 🚀 Features

- **AI Image Recognition**: Upload any traffic sign photo and get instant identification using YOLO
- **Interactive Quiz System**: Test your knowledge with randomized quizzes
- **Progress Tracking**: Earn XP, level up, and track your learning journey
- **Sign Library**: Browse 35+ traffic signs with detailed descriptions and rules

## 🏗️ Architecture

```
Sign_Recognition/
├── yolo_service/     # Python FastAPI - YOLO inference (Port 8000)
├── backend/          # Node.js Express - API server (Port 3001)
└── frontend/         # Next.js 14 - Web application (Port 3000)
```

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

## 🛠️ Setup Instructions

### 1. YOLO Service (Python)

```bash
cd yolo_service

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start service (will download YOLOv8n model on first run)
python main.py
```

The YOLO service will start at `http://localhost:8000`

### 2. Backend API (Node.js)

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client and create database
npx prisma generate
npx prisma db push

# Seed database with traffic signs
npm run db:seed

# Start development server
npm run dev
```

The Backend API will start at `http://localhost:3001`

### 3. Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The Frontend will start at `http://localhost:3000`

## 🧪 Testing the Application

1. Open `http://localhost:3000` in your browser
2. Upload a traffic sign image (JPEG/PNG)
3. See the AI recognition result
4. Browse the Sign Library
5. Take a Quiz to test your knowledge

## 📁 Project Structure

### YOLO Service
- `main.py` - FastAPI application
- `model.py` - YOLO model wrapper
- `config.py` - Configuration and category mapping
- `schemas.py` - Pydantic response models

### Backend
- `src/routes/` - API route handlers
  - `recognize.ts` - Image recognition proxy
  - `signs.ts` - Sign library endpoints
  - `quiz.ts` - Quiz generation/submission
  - `progress.ts` - User progress tracking
- `prisma/schema.prisma` - Database schema
- `src/db/seed.ts` - Database seeding script

### Frontend
- `src/app/` - Next.js App Router pages
  - `page.tsx` - Home page with upload
  - `library/page.tsx` - Sign library
  - `quiz/page.tsx` - Quiz interface
- `src/components/` - Reusable React components
- `src/lib/api.ts` - API client functions

## 🎨 Design System

- **Primary Color**: #00D9FF (Electric Blue)
- **Background**: #0A1128 (Deep Navy)
- **Font Heading**: Poppins
- **Font Body**: Inter

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/recognize` | POST | Upload image for recognition |
| `/api/signs` | GET | Get all signs with filters |
| `/api/signs/:id` | GET | Get single sign details |
| `/api/quiz/generate` | GET | Generate quiz questions |
| `/api/quiz/submit` | POST | Submit quiz answers |
| `/api/progress` | GET | Get user progress |

## 🚦 Traffic Sign Categories

- **Regulatory**: Stop, Speed Limits, No Entry, etc.
- **Warning**: Curves, Pedestrians, Slippery Road, etc.
- **Guide**: Route markers, End of restrictions
- **Construction**: Road Work signs

## 📝 License

MIT License - Feel free to use for educational purposes.
