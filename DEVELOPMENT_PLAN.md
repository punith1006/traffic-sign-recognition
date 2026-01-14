# SIGNWISE AI - 24-HOUR DEVELOPMENT PLAN

**Generated**: January 13, 2026, 21:05 IST  
**Delivery Deadline**: January 14, 2026, 21:05 IST  
**Total Available Hours**: 24  
**Team Composition**: 3 Agent Specializations (Frontend, Backend, AI/ML)  
**Architecture Pattern**: Microservices (Frontend, Backend API, YOLO Inference Service)

---

## SECTION 1: EXECUTIVE SUMMARY

### 1.1 Project Scope

SignWise AI is an AI-powered road safety learning platform that transforms traffic sign memorization into an engaging, gamified experience. Built for students (16-22) preparing for driving tests and new drivers, it solves the problem of boring, passive sign learning through real-time YOLO-based image recognition, interactive quizzes, and progress tracking. The key differentiator is combining **instant AI recognition** with **gamified learning** - users upload sign photos and get immediate identification plus educational content.

### 1.2 Critical Success Path

**The "Magic Moment" Flow**: User uploads a traffic sign image → YOLO model identifies it in <3 seconds → Results display with sign name, category, meaning, and driving action → User earns XP → Progress dashboard updates

This single vertical slice through all three services (Frontend → Backend → YOLO) is the demo centerpiece. A flawless execution of this flow is more important than having 10 half-working features.

### 1.3 Development Philosophy

**Vertical Slice First**: Build the complete image recognition flow end-to-end before expanding to quiz/library features. This validates the hardest technical component (YOLO integration) early and creates a demo-ready feature by Hour 5.

**API-First Development**: Define all API contracts upfront so Frontend and Backend can develop in parallel with confidence.

**Stub-and-Swap**: Initially stub complex features (gamification, animations) with simple implementations, then enhance as time permits.

### 1.4 Phase-Gate Checkpoints

| Checkpoint | Hour | Validation Criteria |
|------------|------|---------------------|
| **YOLO Service Live** | 3 | Python service returns predictions on test images |
| **Image Upload Working** | 6 | Frontend uploads → Backend proxies → YOLO responds → Frontend displays |
| **Quiz Playable** | 12 | User can complete 10-question quiz and see score |
| **Dashboard Complete** | 16 | Progress stats, XP, and recent activity visible |
| **Demo Ready** | 22 | Full flow working, styled, with seed data |

### 1.5 Highest Risk Factors

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| YOLO model weights incompatible | Medium | Critical | Test HuggingFace model immediately at Hour 0; have 3 fallback models identified |
| Frontend-Backend integration mismatch | Medium | High | Define API contracts in Phase 1; use TypeScript types shared between services |
| Quiz question bank insufficient | Low | Medium | Generate questions programmatically from sign metadata; minimum 50 questions |
| Styling takes too long | Medium | Medium | Use Tailwind defaults first, polish only after features complete |
| YOLO inference too slow | Low | High | Use YOLOv8n (nano) variant; target <500ms inference |

### 1.6 Scope Management Strategy

**Minimum Viable Demo (Protected Core)**:
1. Image upload + YOLO recognition (MUST)
2. Sign library browse (MUST)
3. Basic quiz (MUST)
4. Simple stats display (MUST)

**Negotiable Scope (Cut if Behind)**:
- Fancy animations → Static transitions okay
- Dark mode toggle → Just dark mode
- Streak tracking → Defer to V2
- Badges visual showcase → Simple list okay
- Search functionality → Category filters only

**If 4 Hours Behind at Hour 12**: Cut gamification entirely, focus on core recognition + quiz + library.

---

## SECTION 2: PHASE-BASED DEVELOPMENT PLAN

---

## PHASE 1: FOUNDATION & YOLO SERVICE

**Timeframe**: Hour 0 to Hour 5  
**Duration**: 5 hours  
**Phase Objective**: Establish project structure, validate YOLO model works, create working inference endpoint  
**Success Checkpoint**: `curl -X POST http://localhost:8000/predict -F "image=@stop_sign.jpg"` returns valid JSON with sign name and confidence

---

### Phase 1 Strategic Overview

**Why This Phase Matters**:
This phase front-loads the highest-risk technical component (YOLO integration). If the pre-trained model doesn't work, we need to know immediately to switch models. By Hour 5, we'll have a working AI backbone that all other features depend on.

**Key Deliverables**:
- Project repositories initialized (frontend, backend, yolo-service)
- Pre-trained YOLO model downloaded and tested
- FastAPI inference service with `/predict` endpoint
- Backend proxy endpoint to YOLO service
- Basic frontend project with upload component skeleton

**Parallel Workstreams**:
- **AI/ML Agent**: YOLO service setup (Hours 0-3)
- **Backend Agent**: Project scaffolding + API routes (Hours 1-4)
- **Frontend Agent**: Project scaffolding + upload component (Hours 2-5)

---

### Phase 1 Task Breakdown

**TASK P1-01: Initialize YOLO Inference Service**

| Property | Value |
|----------|-------|
| **Assigned To** | AI/ML Engineer |
| **Service** | YOLO Service (Python/FastAPI) |
| **Priority** | P0: Blocking |
| **Duration** | 2 hours |
| **Dependencies** | None |

**Objective**: Create FastAPI service that loads pre-trained YOLO model and exposes `/predict` endpoint.

**API Contract**:
```json
POST /predict
Response: {
  "success": true,
  "predictions": [
    {"class_id": 14, "class_name": "Stop Sign", "confidence": 0.94, "category": "regulatory"}
  ]
}
```

**Acceptance Criteria**:
- FastAPI starts on port 8000
- Model loads in <10 seconds
- Stop sign returns correct class with >80% confidence
- Response time <500ms

---

**TASK P1-02: Download Pre-Trained Weights**

| Property | Value |
|----------|-------|
| **Assigned To** | AI/ML Engineer |
| **Priority** | P0: Blocking |
| **Duration** | 30 minutes |

**Primary Source**: https://huggingface.co/nezahatkorkmaz/traffic-sign-detection

**Fallback Sources**:
1. https://github.com/ablanco1950/Yolov8DetectTrafficSign
2. https://github.com/MDhamani/Traffic-Sign-Recognition-Using-YOLO

---

**TASK P1-03: Initialize Backend API Service**

| Property | Value |
|----------|-------|
| **Assigned To** | Backend Engineer |
| **Service** | Backend (Node.js/Express) |
| **Priority** | P0: Blocking |
| **Duration** | 1.5 hours |

**Tech Stack**: TypeScript, Express.js, Prisma ORM, SQLite

**Project Structure**:
```
backend/
├── src/
│   ├── routes/ (recognize, quiz, signs, progress)
│   ├── services/
│   ├── middleware/
│   └── db/
├── prisma/schema.prisma
└── package.json
```

---

**TASK P1-04: Create Recognition Proxy Endpoint**

| Property | Value |
|----------|-------|
| **Assigned To** | Backend Engineer |
| **Priority** | P0: Blocking |
| **Duration** | 1 hour |
| **Dependencies** | P1-01, P1-03 |

**Endpoint**: `POST /api/recognize`

**Flow**: Accept image → Forward to YOLO → Enrich with DB data → Return result

---

**TASK P1-05: Initialize Frontend Application**

| Property | Value |
|----------|-------|
| **Assigned To** | Frontend Specialist |
| **Service** | Frontend (Next.js 14) |
| **Priority** | P1: Critical |
| **Duration** | 1.5 hours |

**Setup**: Next.js 14, Tailwind CSS, TypeScript

**Design Tokens**:
- Primary: #00D9FF (Electric Blue)
- Background: #0A1128 (Deep Navy)
- Surface: #1A2238

---

**TASK P1-06: Create Image Upload Component**

| Property | Value |
|----------|-------|
| **Assigned To** | Frontend Specialist |
| **Priority** | P1: Critical |
| **Duration** | 1.5 hours |
| **Dependencies** | P1-05 |

**Features**: Drag-drop, file picker, preview, validation (5MB max, JPEG/PNG only), upload to backend

---

### Phase 1 Exit Criteria

✅ User can upload an image and see detected traffic sign name and confidence

---

## PHASE 2: CORE FEATURES

**Timeframe**: Hour 5 to Hour 16  
**Duration**: 11 hours  
**Phase Objective**: Build all MUST-HAVE features

---

### Phase 2 Task Breakdown

**TASK P2-01: Recognition Result Display** (1.5 hrs)
- Animated card reveal with sign details
- Confidence indicator, XP earned notification
- "Learn More" and "Take Quiz" CTAs

**TASK P2-02: Seed Database with Signs** (2 hrs)
- 30+ signs matching YOLO classes
- Name, category, description, rules for each
- 60+ quiz questions (2 per sign)

**TASK P2-03: Sign Library API** (1 hr)
- GET /api/signs with category filtering
- GET /api/signs/:id with related signs

**TASK P2-04: Sign Library UI** (2 hrs)
- Filterable grid of sign cards
- Category chips
- Detail modal on click

**TASK P2-05: Quiz Generation API** (1.5 hrs)
- GET /api/quiz/generate (10 random questions)
- POST /api/quiz/submit (validate answers, return score)

**TASK P2-06: Quiz Interface UI** (3 hrs)
- Question cards with sign image
- 4 answer options with feedback
- Results screen with score and XP

**TASK P2-07: Progress Tracking API** (1 hr)
- GET /api/progress (XP, level, stats)
- POST /api/progress/xp (award XP)

**TASK P2-08: Progress Dashboard UI** (2 hrs)
- XP counter with level progress
- Stats cards
- Recent activity feed

---

### Phase 2 Exit Criteria

✅ Complete user journey: Recognize → Learn → Quiz → Track Progress

---

## PHASE 3: POLISH & ENHANCEMENT

**Timeframe**: Hour 16 to Hour 22  
**Duration**: 6 hours

---

### Phase 3 Task Breakdown

**TASK P3-01: Animations** (2 hrs)
- Page transitions, card hovers
- Recognition reveal, quiz feedback
- XP count-up animation

**TASK P3-02: Gamification UI** (2 hrs)
- XP toast notifications
- Level-up celebration modal
- Streak display

**TASK P3-03: Error Handling** (1.5 hrs)
- Graceful API error messages
- Service unavailable fallbacks
- Validation errors

**TASK P3-04: Mobile Responsiveness** (1 hr)
- Touch-friendly tap targets
- Stacked layouts
- Bottom navigation

---

### Phase 3 Exit Criteria

✅ Application feels professional and handles errors gracefully

---

## PHASE 4: DEMO PREPARATION

**Timeframe**: Hour 22 to Hour 24  
**Duration**: 2 hours

---

### Phase 4 Task Breakdown

**TASK P4-01: Seed Demo Data** (30 min)
- Pre-populated user with 500 XP, Level 5
- 15 completed quizzes, 25 signs learned

**TASK P4-02: Demo Script** (30 min)
1. Show dashboard (30s)
2. Upload sign → recognition (45s)
3. Browse library (30s)
4. Take 3-question quiz demo (1m)
5. Show XP update (15s)

**TASK P4-03: Record Backup Video** (30 min)

**TASK P4-04: Final Testing Pass** (30 min)

---

## SECTION 3: DATABASE SCHEMA

```prisma
model Sign {
  id          String   @id @default(uuid())
  name        String
  category    String   // regulatory, warning, guide, construction
  description String
  imageUrl    String
  rules       String
}

model QuizQuestion {
  id            String   @id @default(uuid())
  signId        String
  questionText  String
  options       String   // JSON array
  correctIndex  Int
  difficulty    Int      @default(1)
}

model UserProgress {
  id              String   @id @default(uuid())
  visitorId       String   @unique
  xp              Int      @default(0)
  level           Int      @default(1)
  quizzesCompleted Int     @default(0)
  signsLearned    Int      @default(0)
}

model Recognition {
  id          String   @id @default(uuid())
  visitorId   String
  signId      String?
  confidence  Float
  createdAt   DateTime @default(now())
}

model QuizSession {
  id          String   @id @default(uuid())
  visitorId   String
  totalQuestions Int
  correctAnswers Int
  xpEarned    Int
  completedAt DateTime @default(now())
}
```

---

## SECTION 4: API CONTRACTS

### Recognition
```
POST /api/recognize
→ { sign, confidence, xpEarned }
```

### Sign Library
```
GET /api/signs?category=warning
→ { signs: [...], total, categories }

GET /api/signs/:id
→ { sign, relatedSigns }
```

### Quiz
```
GET /api/quiz/generate?count=10
→ { sessionId, questions: [...] }

POST /api/quiz/submit
→ { correct, total, accuracy, xpEarned, feedback }
```

### Progress
```
GET /api/progress?visitorId=xxx
→ { xp, level, quizzesCompleted, signsLearned, recentActivity }
```

---

## SECTION 5: QUALITY GATES

### Performance Targets

| Metric | Target |
|--------|--------|
| YOLO Inference | <500ms |
| API Response | <200ms |
| Page Load | <2s |

### Pre-Demo Checklist

- [ ] All 3 services start without errors
- [ ] Image upload → recognition works 100%
- [ ] Quiz completes without crashing
- [ ] XP updates on dashboard
- [ ] Mobile layout is usable
- [ ] Demo script rehearsed

---

**Total Tasks**: 25  
**Estimated Hours**: 24  
**Status**: Ready for Execution
