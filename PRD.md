# SIGNWISE AI - Product Requirements Document

## EXECUTIVE SUMMARY

**One-liner**: An AI-powered road safety learning platform that transforms boring traffic sign memorization into an engaging, gamified experience with instant image recognition and social learning features.

**Problem**: Current road safety education relies on dry memorization through static quiz apps or expensive driving schools. Students and new drivers struggle to retain traffic sign meanings, leading to knowledge gaps that contribute to accidents. Existing apps are boring, fragmented, and don't provide practical, real-world recognition practice.

**Solution**: SignWise AI combines computer vision-powered instant sign recognition with an interactive learning platform featuring gamified quizzes, AR practice modes, social challenges, and personalized AI tutoring. Users can upload photos of signs for instant identification, compete with peers, track progress, and master road safety in an engaging, memorable way.

**Target Users**: 
- Students (ages 16-22) preparing for driving tests
- New drivers seeking to build confidence
- Driving instructors looking for supplementary teaching tools
- International drivers learning new country's road signs

**Market Opportunity**: 
- TAM: Road safety app market valued at $3.42B in 2025
- Growth: 8.4% CAGR (2025-2030)
- Key Driver: Rising smartphone penetration, government road safety initiatives, demand for interactive digital learning

**Competitive Advantage**: 
- **Only** platform combining real-world AI recognition with gamified social learning
- 10x more engaging than static quiz apps through AR, challenges, and streaks
- Real-time feedback vs. passive memorization alone

---

## 1. MARKET CONTEXT & COMPETITIVE LANDSCAPE

### 1.1 Existing Solutions Analysis

**In-Car Traffic Sign Recognition Systems** - Various automotive manufacturers
- Strengths: Real-time detection integrated into vehicle dashboards
- Weaknesses: Unreliable (frequent misidentification), not educational, expensive (requires new vehicle), passive (no learning engagement)
- Pricing: Bundled with premium vehicle packages ($30K+)
- Our Advantage: Educational focus, accessible on any smartphone, active learning with feedback loops

**Traffic & Road Signs (Mobile App)** - Educational quiz app
- Strengths: Comprehensive US sign catalog, basic quizzes
- Weaknesses: Boring static content, no real-world practice, generic UI, no social features, passive memorization
- Pricing: Free with ads / $2.99 premium
- Our Advantage: AI-powered image recognition, gamification, social challenges, personalized learning paths

**Road Signs AI: Test & Theory** - iOS app
- Strengths: Detailed explanations, practice tests, AI voice control
- Weaknesses: Limited to test prep, no image recognition, in-app purchases required for features, not engaging for younger users
- Pricing: Free with heavy IAP
- Our Advantage: Complete real-world recognition, free core features, designed for Gen Z/millennials

**Driving School Apps** - Various providers
- Strengths: Comprehensive driver education
- Weaknesses: Expensive ($200-500), time commitment required, sign recognition is small part, not focused or deep
- Pricing: $200-500 per course
- Our Advantage: Specialized and deep on traffic signs, fraction of cost, use anytime/anywhere

**Sygic GPS Navigation (TSR Feature)** - Navigation app
- Strengths: Works while driving, integrates with maps
- Weaknesses: Not educational, passive display, no retention/learning
- Pricing: $13.99/year
- Our Advantage: Designed for learning and mastery, not just passive alerts

### 1.2 User Pain Points (Research-Backed)

1. **Boring memorization** - "Current quiz apps feel like tedious homework" - Reddit r/driving
2. **No practical application** - "I can pass the test but don't recognize signs in real life" - App Store reviews
3. **Lack of engagement** - "Stopped using after 2 days, too repetitive" - makeuseof.com user feedback
4. **No feedback on real-world performance** - "Wish I could test myself on actual signs I encounter" - Driving forums
5. **Static content doesn't stick** - "I forget what I learned immediately" - Educational research on passive learning
6. **One-size-fits-all approach** - "Doesn't focus on signs I struggle with" - User interviews
7. **No social motivation** - "Would be more fun with friends/competition" - Gen Z learning preferences
8. **Fragmented learning** - "Have to use multiple apps for theory and practice" - User complaints
9. **Expensive driving school alternatives** - "$400 for lessons when I just need sign practice" - Cost barriers
10. **Regional differences ignored** - "Moving to a new state/country, signs are different" - International drivers

### 1.3 Market Opportunity

- **Total Addressable Market (TAM)**: $3.42B (Road Safety App Market, 2025) - WiseGuy Reports
- **Serviceable Addressable Market (SAM)**: $680M (Educational road safety apps segment, 20% of TAM)
- **Serviceable Obtainable Market (SOM)**: $34M (5% market capture in 3 years, focusing on US/Canada/UK)
- **Growth Rate**: 8.4% CAGR (2025-2030) - Market Report Analytics
- **Key Trends Enabling Our Solution**:
  - Government prioritization of road safety initiatives and digital learning
  - Gen Z preference for gamified, social learning experiences
  - AI/ML advancements making computer vision accessible and accurate (99%+ on GTSRB)
  - Smartphone camera quality improvements enabling reliable real-world recognition

---

## 2. PRODUCT VISION & STRATEGY

### 2.1 Innovation Thesis

**While everyone else is building either boring static quiz apps for rote memorization OR expensive in-car recognition systems that don't teach, we realized that users actually need a bridge between classroom theory and real-world application—delivered through the engaging, social, personalized experiences they expect from modern apps.**

**So we're creating an AI-powered learning platform that turns traffic sign mastery into an addictive game, where users upload photos of real signs for instant AI recognition and feedback, compete with friends through challenges and leaderboards, and receive personalized coaching from an AI tutor—all while building genuine road safety knowledge that transfers to actual driving.**

**This delivers 60-second "aha moments" through instant image recognition, sustained engagement through streaks and social competition, and measurable safety impact in a way that's fundamentally more effective and enjoyable than passive memorization or expensive alternatives.**

The key insight: Road sign education fails because it treats learning as information transfer (memorize these signs) rather than skill acquisition (recognize signs instantly in varied real-world contexts). By combining AI-powered real-world recognition practice with game mechanics that drive daily habit formation, we create neural pathways for automatic sign recognition—the actual skill needed for safe driving.


### 2.2 User Personas

#### Primary Persona: Alex - Pre-License Student (Age 17)
- **Demographics**: High school senior, tech-savvy Gen Z, suburban USA, preparing for driving test in 2 months
- **Goals**: Pass driving test on first attempt, impress friends by getting license quickly, build real driving confidence
- **Pain Points**: Parents' driving school is boring and expensive, online study materials don't stick, anxious about real-world driving
- **Behaviors**: Uses TikTok 3hrs/day, plays mobile games (Duolingo streak: 127 days), learns best through visual/interactive content
- **Success Metrics**: Passes written test with 95%+, correctly identifies 40+ signs while passenger in car
- **Quote**: 'I want to actually KNOW the signs, not just memorize them for the test and forget'

#### Secondary Persona: Maria - New Driver Immigrant (Age 28)
- **Demographics**: Recent immigrant to US from Spain, has international license but unfamiliar with US signs, marketing professional
- **Goals**: Quickly learn US-specific road signs, avoid tickets/accidents, feel confident merging into American driving culture
- **Pain Points**: Signs are different shapes/colors than home country, expensive to retake driving test if failed, embarrassed asking basic questions
- **Behaviors**: Uses Duolingo for English, relies on Google Maps heavily, prefers self-paced learning, active on WhatsApp community groups
- **Success Metrics**: Passes US driving test within 30 days, zero sign-related violations in first year
- **Quote**: 'In Spain, signs look completely different - I need side-by-side comparisons and real practice'

#### Tertiary Persona: David - Driving Instructor (Age 45)
- **Demographics**: 15 years teaching experience, runs small driving school, wants modern tools to supplement in-car lessons
- **Goals**: Improve student pass rates, reduce in-car time spent on sign basics, differentiate from competitors
- **Pain Points**: Students show up unprepared on sign knowledge, wasting valuable driving time, losing students to cheaper online-only options
- **Behaviors**: Uses Google Classroom for scheduling, recommends YouTube videos, seeks gamified tools students actually use
- **Success Metrics**: 20% reduction in sign-related errors during driving tests, student engagement with homework materials
- **Quote**: 'If students mastered signs before getting in the car, we could focus on actualdriving skills'

### 2.3 Value Proposition Canvas

**Jobs to be Done**:
- **Functional**: Learn traffic sign meanings, pass driving test, practice real-world recognition, track improvement
- **Emotional**: Feel confident as a knowledgeable driver, impress peers/parents, reduce anxiety about driving
- **Social**: Share achievements with friends, prove competence through gamified progression, join supportive learning community

**Pain Relievers**:
- **Instant image recognition** eliminates uncertainty ( What does this sign mean?)
- **Personalized quizzes** focus practice on weak areas instead of wasting time on mastered content
- **Gamification & streaks** make boring memorization addictively engaging
- **Social challenges** provide accountability and motivation vs. solo grinding
- **AI tutor** offers judgment-free explanations and encourages asking dumb questions
- **Multi-region support** helps international drivers and travelers adapt quickly

**Gain Creators**:
- **Instant gratification**: Upload a sign photo  get answer in 2 seconds (vs. Googling/asking)
- **Visible progress**: Animated XP bars, badges, level-ups create dopamine hits
- **Social proof**: Leaderboards and challenge victories provide bragging rights
- **Real-world superpowers**: Sign spotting becomes a fun game during car rides with friends/family
- **Cost savings**: Free alternative to -500 driving school sign modules
- **Confidence boost**: Measurable mastery (98% accuracy) proves readiness for real driving


## 3. PRODUCT FEATURES & REQUIREMENTS

### 3.1 Feature Prioritization Matrix

#### MUST-HAVE FEATURES (MVP Core)

**Feature 1: AI-Powered Image Recognition**
- **User Story**: As a new driver, I need to upload a photo of any traffic sign and instantly learn what it means, so that I can understand real signs I encounter in the wild
- **Acceptance Criteria**:
  - [ ] Image upload interface accessible in <1 second from home screen
  - [ ] Sign detection and classification completes in <3 seconds after upload
  - [ ] 95%+ accuracy on common US/Canada traffic signs (40+ categories)
  - [ ] Accepts JPEG/PNG formats, max 5MB file size
  - [ ] Displays sign name, category, meaning, and relevant rules
  - [ ] Saves recognized signs to personal history
- **User Flow**: 
  1. User taps 'Upload Sign Image' icon on home screen
  2. File picker opens (gallery/photos on mobile, file browser on desktop)
  3. User selects image of traffic sign
  4. Image preview shown with 'Analyze Sign' button
  5. Processing animation (1-2 sec) after confirmation
  6. Results card: sign image, name, explanation
  7. Actions: 'Add to Practice', 'View Similar', 'Share'
- **UI/UX Requirements**: 
  - Clean upload interface with drag-and-drop (desktop) and gallery picker (mobile)
  - Image preview with crop/rotate options
  - Electric blue (#00D9FF) upload button and progress indicator
  - Haptic feedback on successful upload
  - Animated card reveal with Framer Motion
- **Technical Requirements**: 
  - Frontend: File upload component with image preview
  - API: POST /api/ai/recognize-sign (multipart/form-data)
  - AI: Google Gemini Vision API + GTSRB fine-tuning
  - DB: recognition_history table
  - Validation: File type check (JPEG/PNG), size limit (5MB)
- **Success Metric**: 80% of users try upload feature in first session
- **Demo Impact**: WOW moment - instant sign recognition from uploaded image

**Feature 2: Adaptive Learning Quiz System**
- **User Story**: As a student, I need personalized quizzes focusing on my weak areas, so I can learn efficiently
- **Acceptance Criteria**:
  - [ ] Generates 10-20 questions based on user performance
  - [ ] Multiple formats: MCQ, true/false, image ID
  - [ ] Immediate visual feedback with explanations
  - [ ] Tracks accuracy per sign category
  - [ ] Awards XP and updates progress real-time
- **User Flow**:
  1. Select 'Daily Challenge' from home
  2. Question card appears with sign image
  3. Tap answer → instant feedback animation
  4. Explanation card slides up
  5. Tap 'Next' → smooth transition
  6. Final question → confetti + results
  7. Results: XP earned, accuracy %, weak areas
- **UI/UX Requirements**:
  - Progress bar at top
  - Color-coded feedback (green/red/yellow)
  - Card flip animation for explanations
  - Confetti animation on completion
- **Technical Requirements**:
  - API: GET /api/quiz/generate, POST /api/quiz/submit
  - Algorithm: Spaced repetition (Anki-style)
  - DB: quiz_sessions, quiz_answers
- **Success Metric**: 70% 7-day retention via daily streaks
- **Demo Impact**: Shows adaptive AI learning

**Feature 3: Progress Tracking Dashboard**
- **User Story**: As a motivated learner, I need visual progress stats and achievements to stay motivated
- **Acceptance Criteria**:
  - [ ] Progress bars for each sign category
  - [ ] Overall mastery score with levels
  - [ ] Streak counter with fire emoji
  - [ ] Badge showcase (locked/unlocked)
  - [ ] Performance graph over time
  - [ ] Signs mastered count (e.g., 34/43)
- **UI/UX Requirements**:
  - Animated circular progress rings (Apple Fitness style)
  - Number count-up animations
  - Badge grid with grayscale→color unlock
  - Confetti on level-up
- **Technical Requirements**:
  - API: GET /api/users/{id}/stats
  - WebSocket for real-time updates
  - Mastery = 90%+ accuracy across 3+ attempts
- **Success Metric**: 3x stats page views per session
- **Demo Impact**: Shows rapid progression

**Feature 4: Sign Library & Search**
- **User Story**: As a curious user, I need to browse all signs by category with search, so I can explore proactively
- **Acceptance Criteria**:
  - [ ] Browse by category tabs
  - [ ] Search by name/keyword
  - [ ] Sign cards: image, name, description
  - [ ] Tap for detailed view
  - [ ] Bookmark functionality
  - [ ] Multi-region support (US/CA/UK/EU)
- **UI/UX Requirements**:
  - Pinterest-style responsive grid
  - Skeleton loading states
  - Category chips with icons
  - Fuzzy search with instant results
- **Technical Requirements**:
  - API: GET /api/signs?region=US&category=warning
  - PostgreSQL full-text search
  - CDN-hosted sign images
- **Success Metric**: 50% browse library in first 3 sessions
- **Demo Impact**: Shows content depth

**Feature 5: AI Chat Tutor**
- **User Story**: As a confused learner, I need to ask questions in natural language and get helpful answers
- **Acceptance Criteria**:
  - [ ] Chat interface from any sign page
  - [ ] Understands questions like "yield vs stop difference"
  - [ ] Conversational, encouraging responses
  - [ ] References signs with image embeds
  - [ ] Maintains conversation context
  - [ ] Suggests quiz practice
- **UI/UX Requirements**:
  - WhatsApp-style chat bubbles
  - Typing indicator (3 dots)
  - Embedded sign images
  - Friendly mascot avatar
- **Technical Requirements**:
  - API: POST /api/chat/message
  - Google Gemini API for chat
  - RAG: Pinecone vector DB with sign knowledge
  - Response streaming
- **Success Metric**: 30% use AI tutor, 4 msgs/conversation avg
- **Demo Impact**: Live Q&A demonstration

#### SHOULD-HAVE FEATURES (Differentiators)

**Feature 6: Social Challenges & Leaderboards**
- Send challenge links, head-to-head battles, global+friends leaderboards, social sharing
- **Success Metric**: 25% social engagement, 40% viral coefficient

**Feature 7: AR Practice Mode**
- AR camera places virtual signs, gamified scavenger hunts, ARCore/ARKit
- **Success Metric**: 15% AR adoption

**Feature 8: Driving Instructor Tools**
- Dashboard, assign quizzes, track student progress, export reports
- **Success Metric**: 10 instructors, 5 students each

#### COULD-HAVE (Polish)
- Offline mode, multi-language, voice quizzes, parent oversight

#### WON'T-HAVE (Future)
- Full driving test prep (V2), vehicle integration (V3), insurance discounts (V2), VR simulator (V4)



### 3.2 Critical User Journeys

#### Journey 1: First-Time User Experience (FTUE)
**Goal**: Deliver value in <60 seconds

**Flow**:

1. **Landing/Entry Point**
   - Screen: Animated splash screen with SignWise AI logo + tagline "Master Every Sign"
   - Copy: "Welcome! Let's get you road-ready in 60 seconds"
   - CTA: "Start Learning" (primary button, electric blue)
   - Design Note: Gradient background (deep navy to midnight blue), smooth fade-in animation

2. **Onboarding (Minimal)**
   - Approach: Single interactive screen, no lengthy forms
   - Screen shows 3 swipeable cards with Lottie animations:
     - Card 1: "📸 Upload any sign → Instant AI recognition"
     - Card 2: "🎮 Master signs through fun quizzes"
     - Card 3: "🏆 Compete with friends & track progress"
   - Data Collected: Optional sign-in (Google/Apple, or continue as guest)
   - Skip option: "I'll do this later" (tap counter at bottom)
   - Time: Maximum 20 seconds

3. **Aha Moment**
   - Trigger: Immediately after onboarding, app shows: "Try it now! Upload this sign image:" [embedded sample stop sign image with download button]
   - User can download the sample image and upload it OR tap "Choose from Gallery" to upload any sign photo they have
   - Experience: Instant recognition → card pops up with "Perfect! That's a STOP sign" + confetti
   - Visual: Sign pulses with glow, success checkmark animates in
   - Time from Entry: 30-45 seconds

4. **First Core Action**
   - What: Complete first quiz (5 quick questions)
   - Prompt: "You recognized your first sign! Ready for a quick challenge?" 
   - Friction Eliminated: Auto-starts with beginner questions, no difficulty selection
   - Success State: "+50 XP! Level 1 Complete 🎉" with animated progress bar
   - Unlock: "Badge Earned: First Steps" appears in badge showcase

5. **Retention Hook**
   - Why Return: "Come back tomorrow to keep your streak alive! 🔥"
   - Mechanism: 
     - Push notification permission request (optional, not blocking)
     - Daily challenge visible on home screen (locked for next 18 hours)
     - Streak counter shows "1 day" with fire emoji
   - Habit Formation: "Set a daily reminder?" (10am default, customizable)

**Edge Cases & Error Handling**:
- Invalid file format: Show "Please upload a JPEG or PNG image" with format examples
- File too large (>5MB): "Image too large. Please choose a smaller file (<5MB)" with compression tip
- No internet during first recognition: "Save this image to try later when online"
- Failed recognition: "Hmm, couldn't identify this sign. Try a clearer image or different angle" with example photos
- Guest user data: Auto-save to local storage, prompt to create account after 3 sessions to sync progress

**Success Criteria**: 60%+ complete FTUE flow, 40%+ enable notifications, <10% drop-off rate

---

#### Journey 2: Daily Active User - Quiz Session
**Goal**: 5-10 minute engaging learning session

**Flow**:

1. **Entry via Notification** (or direct app open)
   - Push: "🔥 Keep your 7-day streak alive! Today's challenge: Warning Signs"
   - Opens to home screen with pulsing "Daily Challenge" card

2. **Pre-Quiz Motivation**
   - Screen: "Ready for today's challenge?"
   - Shows: Current streak, today's focus area, potential XP reward
   - Fun fact: "Did you know? 60% of new drivers can't identify this sign: [image]"
   - CTA: "Let's Go!"

3. **Quiz Gameplay**
   - 10 adaptive questions (3 easy, 4 medium, 3 hard based on history)
   - Each question: 
     - Image-based or scenario-based
     - 10-second timer (optional, can disable)
     - 4 answer choices
     - Instant feedback with explanation
   - Progress: Animated bar at top, question counter
   - Micro-delight: Encouraging messages ("Nice!", "You're on fire!", "Perfect!")

4. **Results & Rewards**
   - Animated transition to results screen
   - XP gain animation (numbers count up)
   - Accuracy percentage (color-coded: <70% yellow, 70-89% green, 90%+ gold)
   - Level progress bar updates
   - New badges unlocked (if applicable) with spotlight animation

5. **Next Actions**
   - "Practice weak areas" (if accuracy <80%)
   - "Challenge a friend" (social share)
   - "Tomorrow's topic: Regulatory Signs" (preview)
   - "Explore Sign Library"

**Edge Cases**:
- Internet drops mid-quiz: Save progress, resume when reconnected
- Background app: Pause timer, resume where left off
- Perfect score: Extra XP bonus + "Perfect Day" badge, social share prompt

---

#### Journey 3: Image Recognition in Real World
**Goal**: Learn about signs encountered while passenger/walking by uploading photos

**Flow**:

1. **Quick Launch**
   - User sees unfamiliar sign while passenger in car or walking
   - Takes photo with phone camera (outside app)
   - Opens SignWise AI → taps "Upload Sign Image"
   - Upload interface loads <1 second

2. **Upload Process**
   - User taps "Choose Image" button
   - Gallery/Photos app opens
   - Selects recently taken sign photo
   - Image preview appears with optional crop/rotate
   - Tap "Analyze Sign" button
   - "Analyzing..." with AI brain animation (1-2 seconds)

3. **Learning Moment**
   - Results card slides up:
     - Sign image (cropped/enhanced)
     - Name in large text: "Deer Crossing"
     - Category badge: "Warning"
     - Quick explanation: "Wildlife may cross road ahead. Reduce speed and stay alert."
     - Related info: "Common in rural areas, especially at dawn/dusk"
   - "Add to Study Set" toggle (auto-adds to personalized quiz pool)

4. **Discovery Actions**
   - "See similar signs" (horizontal scroll of related signs)
   - "Test yourself" (quick 3-question mini-quiz on this sign)
   - "Share" (screenshot of result with "Learned this sign today!")

5. **Gamification**
   - "+10 XP: Discovery"
   - "Signs Discovered: 23/150" (collector mindset)
   - Location-based badge (if GPS enabled): "City Explorer" (10 signs in urban area)

**Edge Cases**:
- Poor image quality: "Image unclear. Try uploading a clearer photo" with quality tips
- Multiple signs in image: "Found multiple signs! Which one do you want to learn about?" (tap to select)
- Unrecognized sign: "Can't identify yet. Report to help us improve!" (crowdsourcing)
- Very old/damaged sign: AI attempts recognition, warns if confidence is low

---

#### Journey 4: Social Challenge with Friend
**Goal**: Competitive multiplayer engagement

**Flow**:

1. **Initiation**
   - User taps "Challenges" tab → "Challenge a Friend"
   - Select friend from list OR share invite link
   - Choose challenge type: "Speed Quiz" (who answers 10 questions faster) or "Accuracy Battle" (who gets more correct)

2. **Waiting Room**
   - "Waiting for [Friend Name]..." with animated timer
   - Shows opponent's avatar, level, win/loss record
   - Trash talk prompts: "Send a message!" (pre-written fun messages)

3. **Live Battle**
   - Split-screen view (user's side highlighted)
   - Same questions appear for both simultaneously
   - Real-time score updates
   - Timer counts down (30 seconds total)
   - Visual indicator when opponent answers

4. **Results**
   - Winner announcement with confetti/fanfare
   - Score breakdown: Speed bonus, accuracy, final score
   - "Rematch?" button
   - Leaderboard update: "You're now #3 among friends!"

5. **Social Sharing**
   - Auto-generated shareable graphic: "I beat [Friend] in SignWise Challenge!"
   - Post to social media or message directly
   - Invite friend to rematch

**Edge Cases**:
- Friend declines: "No worries! Try Daily Leaderboard instead"
- Connection drops: Pause state, resume when reconnected, or forfeit after 30 sec
- Tie score: "Sudden Death" - 1 tiebreaker question

---

## 4. USER EXPERIENCE & DESIGN SPECIFICATIONS

### 4.1 Design Philosophy

**Core Emotion**: Empowered, confident, accomplished
**Brand Personality**: Friendly Gen Z expert - supportive, energetic, never condescending  
**Visual Metaphors**: 
- Road journey/progression (levels as milestones on a road)
- Illumination/clarity (light bulbs, glowing signs for "aha moments")
- Achievement/gaming (badges, streaks, XP systems)

**Competitive Visual Differentiation**: 
- **NOT** boring blue-and-white educational app aesthetic
- **NOT** cluttered gamification (avoid excessive pop-ups)
- **IS** sleek, modern, dark mode-first with vibrant accent colors
- **IS** motion-rich but purposeful (every animation communicates state/feedback)



### 4.2 Design System

#### Color Palette

**Primary Colors**:
- **Electric Blue** (#00D9FF) - Innovation, technology, "aha moment" highlights
  - Used for: Primary CTAs, success states, AI recognition bounding boxes
  - Emotion: Excitement, discovery, trust

- **Deep Navy** (#0A1128) - Sophistication, focus, learning environment
  - Used for: Backgrounds (dark mode), headers, cards
  - Emotion: Calm, professional, focused

- **Vibrant Teal** (#00F5D4) - Energy, gamification, rewards
  - Used for: XP indicators, streak flames, achievement badges
  - Emotion: Accomplishment, playful energy

**Secondary Colors**:
- **Sunset Orange** (#FF6B35) - Urgency, warnings, attention
  - Used for: Warning sign category, deadline alerts, challenge invites
  
- **Neon Purple** (#B565D8) - Premium features, advanced levels
  - Used for: Level-up animations, pro badges, special challenges

**Neutral Scale** (Dark Mode First):
- Background: #0A1128 (deep navy)
- Surface: #1A2238 (elevated cards)
- Surface Elevated: #283048 (modals, overlays)
- Text Primary: #FFFFFF (100% opacity)
- Text Secondary: #B4BCC8 (70% opacity)
- Text Tertiary: #8891A0 (50% opacity)
- Border: #3D4C63

**Semantic Colors**:
- Success: #00F5A0 (mint green) - Correct answers, completed milestones
- Warning: #FFC43D (golden yellow) - Improvement areas, moderate performance
- Error: #FF6B93 (soft red) - Incorrect answers, errors
- Info: #00D9FF (electric blue) - Tips, helpful hints, neutral information

**Rationale**: This palette breaks away from traditional educational app blues (boring) and driving app reds/yellows (too cautionary). Electric blue + teal creates a futuristic, tech-forward feeling aligned with AI innovation. Deep navy dark mode reduces eye strain for extended study sessions. Vibrant accents make gamification elements pop without feeling childish.

**Framer Inspiration**: Similar to Framer's 2025 dark themes with neon accents, creating premium SaaS feel despite being educational content.

---

#### Typography

**Headlines**: 
- Font: **Poppins** (Bold, 600-800 weights)
- Sizes: H1: 32px, H2: 24px, H3: 20px, H4: 18px
- Usage: Page titles, sign names, quiz questions, achievement announcements
- Character: Modern, friendly, slightly geometric - perfect for Gen Z appeal

**Body Text**:
- Font: **Inter** (Regular 400, Medium 500)
- Sizes: Body: 16px, Small: 14px, Caption: 12px
- Usage: Explanations, descriptions, chat messages, settings
- Character: Highly readable, optimized for screens, professional yet approachable

**UI Elements**:
- Font: **Inter** (Medium 500, SemiBold 600)
- Sizes: Buttons: 16px, Labels: 14px, Tabs: 14px
- Usage: Buttons, navigation, form labels, badges
- Character: Clean, compact, excellent at small sizes

**Data/Statistics**:
- Font: **JetBrains Mono** (Medium 500)
- Sizes: Stats: 24px, Counters: 18px
- Usage: XP counters, accuracy percentages, timer displays
- Character: Monospace for better number alignment and "tech" aesthetic

**Line Height & Letter Spacing**:
- Headlines: 1.2 line-height, -0.02em letter-spacing (tighter for impact)
- Body: 1.6 line-height, 0em letter-spacing (optimal readability)
- UI Elements: 1.4 line-height, 0.01em letter-spacing (slight spacing for clarity)

---

#### Spacing System

- **Base Unit**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
- **Usage Guide**:
  - 4px: Icon-to-text gaps, tight internal padding
  - 8px: Small component padding, list item spacing
  - 16px: Standard component padding, card internal margins
  - 24px: Section spacing within cards
  - 32px: Between major sections/cards
  - 48px: Between distinct content blocks
  - 64px+: Page-level vertical rhythm

---

#### Iconography Approach

**Style**: **Custom Duotone** (two-color icons with depth)
- **NOT** generic FontAwesome or Heroicons defaults
- Primary color: Electric blue (#00D9FF)
- Secondary color: Teal (#00 F5D4) at 40% opacity for background layer

**Design Direction**: 
- Rounded corners (4px radius) for friendliness
- 2px stroke weight for clarity at small sizes
- Duotone style adds depth without complexity
- Consistent 24x24px grid for alignment

**Source**: 
- Custom-designed icon set in Figma
- Implementation: Inline SVG components (optimized, tree-shakeable)
- Backup: Lucide React icons as base, customized with dual-tone layering

**Key Icons Needed**:
- Upload (scan function) - upload icon with AI sparkles
- Lightning bolt (streak/speed) - energetic, slightly tilted
- Trophy (achievements) - modern, not ornate
- Target (accuracy) - concentric circles with arrow
- Brain (AI tutor) - geometric brain with circuit patterns
- Flame (streak) - animated, flickering fire
- Star (favorites/bookmark) - rounded star with glow effect
- Shield (sign categories: regulatory) - badge shape
- Warning triangle (warning signs) - exclamation mark
- Compass (navigation signs) - directional arrow in circle

---

#### Component Library

**Base**: Custom components inspired by shadcn/ui patterns, fully tailored to brand

**Buttons**:
- **Primary**: 
  - Background: Electric blue linear gradient (#00D9FF → #00BFDD)
  - Text: White, Poppins SemiBold 16px
  - Padding: 12px 24px
  - Border radius: 12px
  - Hover: Lift 2px, glow effect (box-shadow: 0 4px 20px rgba(0,217,255,0.4))
  - Active: Scale 0.98
  - Disabled: Grayscale, 50% opacity

- **Secondary**: 
  - Background: Transparent
  - Border: 2px solid #3D4C63
  - Text: Electric blue
  - Hover: Border color → electric blue, subtle bg tint

- **Ghost**: 
  - Background: Transparent
  - Text: Text secondary
  - Hover: Background: Surface elevated

**Forms**:
- **Input Fields**:
  - Background: Surface (#1A2238)
  - Border: 1px solid #3D4C63
  - Focus: Border → electric blue, glow effect
  - Padding: 12px 16px
  - Border radius: 8px
  - Label: Above input, Inter Medium 14px, text secondary
  
- **Validation**:
  - Error: Red border, error icon (circle X), error message below in red
  - Success: Green border, checkmark icon
  - Real-time validation (on blur for text, on change for checkboxes)

**Cards**:
- **Default**:
  - Background: Surface (#1A2238)
  - Border: None (elevation through shadow)
  - Shadow: 0 2px 8px rgba(0,0,0,0.3)
  - Border radius: 16px
  - Padding: 20px
  
- **Elevated** (modals, important content):
  - Background: Surface Elevated (#283048)
  - Shadow: 0 8px 32px rgba(0,0,0,0.5)
  - Optional: Subtle border-top with gradient

- **Interactive** (quiz question cards):
  - Hover: Lift 4px, shadow intensifies
  - Tap/Active: Scale 0.99, shadow reduces
  - Selected: Border-left: 4px solid electric blue

**Modals/Dialogs**:
- **Backdrop**: rgba(10, 17, 40, 0.8) - semi-transparent navy
- **Container**: Surface elevated, centered, max-width 500px
- **Animation**: Fade in backdrop (200ms) → scale in modal from 0.9 to 1.0 (300ms, spring easing)
- **Close**: X button top-right, ESC key support
- **Actions**: Footer with button group (cancel left, primary right)

**Navigation**:
- **Bottom Tab Bar** (mobile):
  - Background: Surface with blur effect (glassmorphism)
  - Height: 64px
  - Icons: 24px, active = electric blue, inactive = text tertiary
  - Active indicator: 3px rounded pill above icon
  - Tabs: Home, Library, Upload (center, enlarged), Challenges, Profile
  
- **Top Header**:
  - Background: Deep navy gradient
  - Height: 56px  
  - Left: Back/menu icon
  - Center: Page title (Poppins SemiBold 18px)
  - Right: Action icons (search, settings, notifications)

**Data Display**:
- **Progress Rings** (circular):
  - Stroke width: 8px
  - Background ring: #3D4C63
  - Progress ring: Gradient (teal → electric blue)
  - Animated: Spring ease-out over 800ms
  - Center: Percentage or icon
  
- **Linear Progress Bars**:
  - Height: 8px
  - Background: #3D4C63
  - Fill: Gradient, animated translateX
  - Border radius: 4px
  
- **Stat Cards**:
  - Large number (JetBrains Mono 32px)
  - Label below (Inter Medium 14px, text secondary)
  - Icon left or top
  - Trend indicator (arrow up/down with percentage change)

---

### 4.3 Micro-Interactions & Animations

**Philosophy**: Motion guides attention, provides feedback, and delights. Every animation should answer "what happened?" or "what's next?"

**Key Animations**:

**Loading States**:
- **Skeleton Screens**: Shimmer effect from left to right, gradient overlay (#1A2238 → #283048 → #1A2238), 1.5s loop
- **Spinners**: Custom AI brain icon with rotating circuit paths, electric blue glow pulse
- **Page Transitions**: Fade + slight vertical slide (20px), 300ms ease-out

**Success Confirmations**:
- **Correct Answer**: 
  - Checkmark icon scales in from 0 to 1.2 to 1.0 (elastic spring)
  - Green glow pulse radiates outward
  - Haptic: Medium impact
  - Sound: Soft "ding" (optional, respects audio settings)
  - Confetti: 20-30 particles burst from center (0.5s duration)
  
- **Level Up**:
  - Screen flash (white overlay at 30% opacity, 100ms)
  - Trophy icon drops in from top with bounce
  - Confetti explosion (100+ particles, 2s duration, physics-based)  
  - Sound: Triumphant chime
  - Haptic: Heavy impact

**Error Handling**:
- **Incorrect Answer**:
  - Card shakes horizontally (±10px, 3 oscillations, 400ms)
  - Red glow pulse
  - Haptic: Light impact (2x quick taps)
  - X icon fades in
  - Explanation card slides up from bottom (500ms spring ease)

**Transitions**:
- **Page Transitions**: Shared element transitions where possible (sign image stays in place, content crossfades)
- **Modal Entry**: Backdrop fade-in (200ms)→ modal scale-in from 0.9 (300ms spring)
- **Modal Exit**: Scale-out to 0.95 + fade-out (250ms ease-in)

**Hover States** (desktop):
- **Cards**: Lift 4px, shadow intens ifies, 200ms ease-out
- **Buttons**: Lift 2px, glow effect, 150ms
- **Interactive Icons**: Scale 1.1, rotate 5°, 200ms

**Empty States**:
- **Illustration**: Custom Lottie animation (e.g., empty sign library = bouncing question mark)
- **Copy**: Encouraging and actionable ("No signs learned yet! Upload an image to discover your first sign")
- **CTA**: Primary button with icon

**Performance Budget**:
- Max animation duration: 800ms (except confetti celebrations)
- Target: 60 FPS for all animations
- Reduce motion: Respect prefers-reduced-motion (disable non-essential animations)

---

### 4.4 Responsive Design Strategy

**Breakpoints**:
- Mobile: 0-639px (default, mobile-first)
- Tablet: 640px-1023px
- Desktop: 1024px+
- Large Desktop: 1440px+

**Mobile-First Considerations**:
- **Touch Targets**: Minimum 44x44px (Apple HIG standard)
- **Thumb Zones**: Primary actions within bottom 2/3 of screen
- **Single-Column Layouts**: Stack content vertically, avoid horizontal scrolling
- **Bottom Navigation**: Easier to reach than top
- **Simplified Layouts**: Fewer columns, larger text, more whitespace

**Key Differences by Breakpoint**:

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Bottom tab bar | Bottom tab + sidebar option | Persistent left sidebar |
| Sign Library Grid | 2 columns | 3-4 columns | 4-6 columns |
| Quiz Layout | Full-screen cards | Full-screen with margins | Split view (question left, explanation right) |
| Upload | Full-screen picker | Full-screen picker | 60% width modal over dimmed background |
| Dashboard Stats | Vertical stack | 2x2 grid | Horizontal row |
| Chat | Full-screen | Full-screen | Right sidebar (400px) |

** Consistent Elements**:
- Color scheme, typography, spacing system
- Core interactions (tap/click, swipe)
- Content structure and information hierarchy

---

### 4.5 Accessibility Standards

- [x] **WCAG 2.1 AA Compliance** across all screens
- [x] **Color Contrast Ratios**:
  - Text on background: 7:1 (AAA level for body text)
  - UI elements: 3:1 minimum (buttons, form borders)
  - Testing tool: Built-in contrast checker in design system
- [x] **Keyboard Navigation**:
  - All interactive elements focusable (tab order)
  - Focus indicators: 2px electric blue outline with 2px offset
  - Shortcuts: "/" for search, "U" for upload, "Q" for quiz
  - Escape to close modals
- [x] **Screen Reader Support**:
  - Semantic HTML5 (header, nav, main, section, article)
  - ARIA labels for icon-only buttons
  - ARIA live regions for dynamic content (XP updates, quiz feedback)
  - Alt text for all sign images (descriptive, not just sign name)
- [x] **Focus Indicators**: 
  - Never `outline: none` without visible replacement
  - Custom focus rings match brand (electric blue glow)
- [x] **Alt Text Strategy**:
  - Sign images: "[Sign Type] - [Meaning]" (e.g., "Stop sign - Full stop required")
  - Decorative images: Empty alt tag (aria-hidden)
  - Informative icons: aria-label
- [x] **Error Messages**:
  - Clear, actionable language ("Enter a valid email" not "Error: Invalid input")
  - Persistent (don't auto-dismiss)
  - Associated with form fields (aria-describedby)
  - Icon + text (don't rely on color alone)
- [x] **No Flashing Animations**: All animations <3 flashes per second (seizure safety)
- [x] **Minimum Font Size**: 14px for body text (16px recommended)
- [x] **Scalable Text**: Supports browser zoom up to 200% without breaking layout
- [x] **Motion Preferences**: Detect `prefers-reduced-motion` and disable decorative animations

---

### 4.6 Content Strategy & Voice

**Tone Attributes**: 
- **Encouraging** (not condescending): "Nice try! Here's why..."
- **Energetic** (not overwhelming): "Let's go!", emojis sparingly
- **Clear** (not oversimplified): Direct language, no jargon unless explained

**Writing Principles**:
1. **Active Voice**: "You earned 50 XP!" vs. "50 XP has been earned"
2. **Second Person**: Always address user as "you", never "users" or third person
3. **Concise**: Under 15 words for buttons/CTAs, under 2 sentences for tips

**Key Microcopy Examples**:

- **Empty State (No History)**: "📸 No signs uploaded yet! Choose an image of any traffic sign to get started"
- **Error (Failed Recognition)**: "Hmm, I couldn't identify that sign. Try getting closer or check the lighting 💡"
- **Success (Quiz Complete)**: "🎉 Perfect score! You're crushing it. Ready for tomorrow's challenge?"
- **Loading (AI Processing)**: "🧠 AI analyzing... This usually takes 2 seconds"
- **CTA (First Upload Use)**: "Upload Your First Sign" (not "Choose Image")
- **Onboarding Headline**: "Master Every Sign. Ace Every Test."
- **Streak Lost**: "Oops, your streak ended. No worries—start fresh today! 💪"
- **Level Up**: "🚀 Level 5 Unlocked! You're now an Intermediate Driver"

**Emoji Usage**: Purposeful accents, not excessive. Use for emotions (🎉 celebrations, 🔥 streaks) and categories (⚠️ warnings, 🚫 prohibitions).



## 5. TECHNICAL ARCHITECTURE

### 5.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       USER DEVICES                           │
│  (iOS/Android/Web - React Native/Next.js Progressive Web App)│
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS / WebSocket
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND - Next.js 14+ (Port 3000)             │
│  • App Router with Server Components                        │
│  • Tailwind CSS + Framer Motion                             │
│  • Zustand (state) + TanStack Query (data fetching)         │
│  • PWA capabilities (offline mode)                           │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API + WebSocket
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           BACKEND API - Node.js/Express (Port 8000)         │
│  • TypeScript + Express.js 4.18+                            │  
│  • Prisma ORM (PostgreSQL)                                   │
│  • JWT Authentication + OAuth (Google/Apple)                │
│  • Redis caching layer                                       │
│  • Socket.io for real-time features                         │
└───────┬──────────────────────────────┬─────────────────────┘
        │                              │
        │ gRPC/HTTP                    │ REST API
        ▼                              ▼
┌────────────────────────┐    ┌──────────────────────────────┐
│  AI SERVICE - Python   │    │   DATABASE LAYER             │
│  FastAPI (Port 5000)   │    │  • PostgreSQL 15+ (primary)  │
│  • Gemini Vision API   │    │  • Redis (cache/sessions)    │
│  • Custom CNN model    │    │  • AWS S3 (image storage)    │
│  • Pinecone vector DB  │    │  • Pinecone (vector search)  │
└────────────────────────┘    └──────────────────────────────┘
```

**Architecture Pattern**: Microservices with clear separation of concerns
**Communication**: RESTful APIs (CRUD), WebSocket (real-time), gRPC (AI service for performance)
**Data Flow**: Frontend → API Gateway → Business Logic → Data Layer / AI Service

---

### 5.2 Frontend Architecture (Next.js + React)

#### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.4+ with custom configuration
- **State Management**: Zustand (global state), React Context (theme, auth)
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Custom components (shadcn/ui as inspiration, fully branded)
- **Animations**: Framer Motion for complex animations, CSS for micro-interactions
- **Icons**: Lucide React + custom SVG components
- **File Upload**: react-dropzone for drag-and-drop + image preview
- **Image Processing**: react-image-crop for crop/rotate functionality
- **Charts**: Recharts for progress visualizations
- **PWA**: next-pwa for offline capabilities

#### Project Structure
```
/signwise-frontend
├── /src
│   ├── /app                    # Next.js App Router
│   │   ├── /(auth)            # Auth routes (login, signup)
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── /(dashboard)        # Main app (authenticated)
│   │   │   ├── layout.tsx     # Dashboard layout with nav
│   │   │   ├── page.tsx       # Home/dashboard
│   │   │   ├── library/page.tsx
│   │   │   ├── challenges/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── quiz/[id]/page.tsx
│   │   ├── /api               # API routes (proxies to backend)
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   └── proxy/[...path]/route.ts
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles + Tailwind
│   ├── /components
│   │   ├── /ui               # Base components (Button, Card, Input)
│   │   ├── /features         # Feature-specific components
│   │   │   ├── /upload       # ImageUploader, ImagePreview, RecognitionResult
│   │   │   ├── /quiz         # QuizCard, QuestionCard, ResultsScreen
│   │   │   ├── /progress     # ProgressRing, StatCard, BadgeShowcase
│   │   │   └── /chat         # ChatInterface, MessageBubble, AIAvatar
│   │   └── /layouts          # Layout components (DashboardNav, Header)
│   ├── /lib
│   │   ├── /api              # API client functions
│   │   │   ├── signs.ts      # Sign-related API calls
│   │   │   ├── quiz.ts       # Quiz API calls
│   │   │   ├── users.ts      # User/profile API
│   │   │   └── ai.ts         # AI service calls
│   │   ├── /hooks            # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useUpload.ts
│   │   │   ├── useQuiz.ts
│   │   │   └── useWebSocket.ts
│   │   ├── /utils            # Utility functions
│   │   │   ├── cn.ts         # Class name merger
│   │   │   ├── format.ts     # Date/number formatters
│   │   │   └── constants.ts
│   │   ├── /validations      # Zod schemas
│   │   │   ├── auth.ts
│   │   │   └── quiz.ts
│   │   └── /stores           # Zustand stores
│   │       ├── authStore.ts
│   │       ├── quizStore.ts
│   │       └── uiStore.ts
│   ├── /styles
│   │   └── globals.css
│   └── /public              # Static assets
│       ├── /images
│       ├── /icons
│       └── manifest.json    # PWA manifest
├── tailwind.config.ts       # Custom Tailwind theme
├── next.config.js
└── package.json
```

#### Key Frontend Feature Implementations

**Image Upload & Recognition Component**:
```typescript
// Simplified architecture
<ImageUploader>
  → File input (accept JPEG/PNG, max 5MB)
  → Drag-and-drop zone (desktop) / Gallery picker (mobile)
  → Image preview with crop/rotate tools
  → Validate file type & size
  → Convert to base64 or FormData
  → POST /api/ai/recognize-sign (multipart/form-data)
  → Display <RecognitionResult> component
  → Save to history (TanStack Query mutation)
</ImageUploader>
```

**Quiz System**:
```typescript
// State management flow
Zustand Store (quizStore):
  - currentQuestion
  - answers[]
  - score
  - timeRemaining

TanStack Query:
  - useQuery('quizGenerate') → fetches adaptive questions
  - useMutation('submitAnswer') → submits + gets feedback
  - useMutation('submitQuiz') → final submission

Components:
  <QuizContainer> → orchestrates flow
  <QuestionCard> → displays question + options
  <AnswerFeedback> → animated correct/incorrect
  <ResultsScreen> → final stats + next actions
```

**Real-Time Features (WebSocket)**:
```typescript
// useWebSocket hook pattern
useEffect(() => {
  const socket = io(process.env.NEXT_PUBLIC_WS_URL);
  
  socket.on('challenge:invite', handleInvite);
  socket.on('challenge:start', handleStart);
  socket.on('challenge:answer', handleOpponentAnswer);
  socket.on('xp:update', updateUserXP);
  
  return () => socket.disconnect();
}, []);
```

**Performance Optimizations**:
- [x] Server Components for static content (sign library, about pages)
- [x] Dynamic imports for heavy components (ImageUploader, Chart)
- [x] Image optimization via next/image (sign images from CDN)
- [x] Font optimization via next/font (Poppins, Inter, JetBrains Mono)
- [x] API response caching with TanStack Query (5-minute stale time for signs)
- [x] Lazy loading for below-fold content
- [x] Code splitting per route (automatic with App Router)

---

### 5.3 Backend Architecture (Node.js + Express)

#### Technology Stack
- **Framework**: Express.js 4.18+ OR Fastify 4+ (choose based on performance needs)
- **Language**: TypeScript 5+
- **Database ORM**: Prisma 5+ (PostgreSQL)
- **Authentication**: JWT (access + refresh tokens), OAuth 2.0 (Google, Apple)
- **Password Hashing**: bcrypt (10 rounds)
- **Validation**: Zod (shared schemas with frontend)
- **File Upload**: Multer + AWS S3 SDK
- **Email**: SendGrid OR Resend
- **Real-Time**: Socket.io 4+
- **Caching**: Redis 7+ (ioredis client)
- **Task Queue**: Bull (Redis-based) for async jobs
- **Logging**: Winston + Morgan (HTTP logging)
- **Monitoring**: Sentry-ready error tracking

### 3. AI Service Architecture (The Brain)

**Core Technology**: Google Gemini 1.5 Flash (via API)
- **Role**: Primary image recognition engine.
- **Why**: Zero-shot recognition, multimodal context understanding, ultra-fast (<1s), and generous Free Tier (15 RPM).
- **Fallback**: Lightweight YOLOv8 (future roadmap only) for offline mode.

**Data Strategy**:
- **Validation Dataset**: LISA Traffic Sign Dataset (US) 🇺🇸 for verification.
- **Training**: None required for MVP (Gemini is pre-trained).

**Infrastructure**:
- **Compute**: Serverless / Local CPU (No GPU required).
- **Communication**: REST API (POST image → JSON response).
- **Student/Dev Mode**: Fully capable of running on a standard laptop CPU.
- **Logging**: Winston + Morgan (HTTP logging)
- **Monitoring**: Sentry-ready error tracking

#### Project Structure
```
/signwise-backend
├── /src
│   ├── /controllers         # Request handlers
│   │   ├── authController.ts
│   │   ├── signController.ts
│   │   ├── quizController.ts
│   │   ├── userController.ts
│   │   └── chatController.ts
│   ├── /services           # Business logic
│   │   ├── authService.ts
│   │   ├── quizService.ts  # Adaptive quiz generation
│   │   ├── aiService.ts    # Calls to Python AI service
│   │   └── spacedRepetition.ts
│   ├── /models             # Prisma schema (DB models)
│   ├── /routes             # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── signs.routes.ts
│   │   ├── quiz.routes.ts
│   │   └── user.routes.ts
│   ├── /middleware
│   │   ├── authenticate.ts  # JWT verification
│   │   ├── validateRequest.ts # Zod validation
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── cors.ts
│   ├── /utils
│   │   ├── jwt.ts
│   │   ├── s3.ts
│   │   └── email.ts
│   ├── /config
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── /types              # TypeScript type definitions
│   ├── /jobs               # Background jobs (Bull queues)
│   │   ├── emailJobs.ts
│   │   └── analyticsJobs.ts
│   ├── /websocket          # Socket.io handlers
│   │   ├── challengeHandler.ts
│   │   └── notificationHandler.ts
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── /prisma
│   ├── schema.prisma       # Database schema
│   └── /migrations
├── .env.example
└── package.json
```

#### Database Schema (Prisma)

```prisma
// Simplified schema - key entities

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String?  // null for OAuth users
  name          String
  avatarUrl     String?
  role          Role     @default(USER)
  level         Int      @default(1)
  xp            Int      @default(0)
  streakDays    Int      @default(0)
  lastActiveAt  DateTime @default(now())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  quizSessions    QuizSession[]
  recognitions    Recognition[]
  userSignStats   UserSignStat[]
  badges          UserBadge[]
  challenges      Challenge[]     @relation("ChallengeCreator")
  chatConversations ChatConversation[]
  
  @@index([email])
}

enum Role {
  USER
  INSTRUCTOR
  ADMIN
}

model Sign {
  id          String   @id @default(uuid())
  name        String   // "Stop Sign"
  description String   // "Full stop required at intersection"
  category    SignCategory
  region      String   // "US", "CA", "UK", "EU"
  imageUrl    String   // CDN URL
  rules       String   // Detailed rules/context
  createdAt   DateTime @default(now())
  
  // Relations
  recognitions    Recognition[]
  quizQuestions   QuizQuestion[]
  
  @@index([category, region])
}

enum SignCategory {
  WARNING
  REGULATORY
  GUIDE
  CONSTRUCTION
  RECREATION
}

model QuizSession {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        QuizType
  totalQuestions Int
  correctAnswers Int
  xpEarned    Int
  completedAt DateTime?
  createdAt   DateTime @default(now())
  
  // Relations
  answers     QuizAnswer[]
  
  @@index([userId, createdAt])
}

enum QuizType {
  DAILY_CHALLENGE
  PRACTICE
  CATEGORY_FOCUSED
  CHALLENGE_BATTLE
}

model QuizQuestion {
  id          String   @id @default(uuid())
  signId      String
  sign        Sign     @relation(fields: [signId], references: [id])
  questionText String
  options     String[] // JSON array of 4 options
  correctAnswer Int    // Index of correct option (0-3)
  difficulty  Int      // 1-3
  
  // Relations
  quizAnswers QuizAnswer[]
}

model QuizAnswer {
  id          String   @id @default(uuid())
  sessionId   String
  session     QuizSession @relation(fields: [sessionId], references: [id])
  questionId  String
  question    QuizQuestion @relation(fields: [questionId], references: [id])
  selectedAnswer Int
  isCorrect   Boolean
  timeSpent   Int      // milliseconds
  createdAt   DateTime @default(now())
}

model Recognition {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  signId      String?  // null if unrecognized
  sign        Sign?    @relation(fields: [signId], references: [id])
  imageUrl    String   // User-uploaded image (S3)
  confidence  Float    // AI confidence score (0-1)
  location    String?  // Optional geolocation
  createdAt   DateTime @default(now())
  
  @@index([userId, createdAt])
}

model UserSignStat {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  signId      String
  sign        Sign     @relation(fields: [signId], references: [id])
  attempts    Int      @default(0)
  correctCount Int     @default(0)
  lastSeenAt  DateTime @default(now())
  
  @@unique([userId, signId])
  @@index([userId])
}

model Badge {
  id          String   @id @default(uuid())
  name        String   @unique
  description String
  iconUrl     String
  requirement String   // "Complete 10 quizzes"
}

model UserBadge {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  badgeId     String
  badge       Badge    @relation(fields: [badgeId], references: [id])
  earnedAt    DateTime @default(now())
  
  @@unique([userId, badgeId])
}

model Challenge {
  id          String   @id @default(uuid())
  creatorId   String
  creator     User     @relation("ChallengeCreator", fields: [creatorId], references: [id])
  opponentId  String?
  opponent    User?    @relation("ChallengeOpponent", fields: [opponentId], references: [id])
  type        ChallengeType
  status      ChallengeStatus
  winnerId    String?
  createdAt   DateTime @default(now())
  completedAt DateTime?
}

enum ChallengeType {
  SPEED_QUIZ
  ACCURACY_BATTLE
}

enum ChallengeStatus {
  PENDING
  ACTIVE
  COMPLETED
  DECLINED
}

model ChatConversation {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  messages    ChatMessage[]
  createdAt   DateTime @default(now())
}

model ChatMessage {
  id              String  @id @default(uuid())
  conversationId  String
  conversation    ChatConversation @relation(fields: [conversationId], references: [id])
  role            MessageRole  // USER or ASSISTANT
  content         String
  createdAt       DateTime @default(now())
}

enum MessageRole {
  USER
  ASSISTANT
}
```

**Key Design Decisions**:
- PostgreSQL chosen for ACID compliance, complex queries (joins), and strong indexing
- UUIDs for IDs (better for distributed systems, security)
- Composite indexes on common query patterns (userId + createdAt for history)
- Soft deletes not implemented in MVP (hard deletes acceptable for simplicity)
- JSON arrays for quiz options (denormalized for performance)


#### API Endpoints Specification

**Authentication Endpoints**

`POST /api/auth/register`
- **Purpose**: Create new user account
- **Request Body**:
```json
{
  "email": "alex@example.com",
  "password": "SecurePass123!",
  "name": "Alex Chen"
}
```
- **Response (201)**:
```json
{
  "user": {
    "id": "uuid-here",
    "email": "alex@example.com",
    "name": "Alex Chen",
    "level": 1,
    "xp": 0
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```
- **Errors**: 
  - 400: Email invalid format, password < 8 chars
  - 409: Email already exists
- **Validation**: Email regex, password min 8 chars (1 uppercase, 1 number, 1 special), name 2-50 chars

`POST /api/auth/login`
- **Purpose**: Authenticate existing user
- **Request Body**:
```json
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}
```
- **Response (200)**: Same as register
- **Errors**: 
  - 400: Missing fields
  - 401: Invalid credentials
  - 429: Too many login attempts (rate limited)

`POST /api/auth/refresh`
- **Purpose**: Get new access token using refresh token
- **Headers**: `Authorization: Bearer {refreshToken}`
- **Response (200)**:
```json
{
  "accessToken": "new-jwt-token"
}
```
- **Errors**: 401: Invalid/expired refresh token

`POST /api/auth/oauth/google`
- **Purpose**: Sign in/up via Google OAuth
- **Request Body**: `{ "credential": "google-id-token" }`
- **Response**: Same as register/login
- **Flow**: Verify Google token → Create/update user → Return JWT

---

**Sign Endpoints**

`GET /api/signs?region=US&category=WARNING&search=deer&limit=20&offset=0`
- **Purpose**: Browse/search sign library
- **Query Params**:
  - `region`: US | CA | UK | EU (optional)
  - `category`: WARNING | REGULATORY | GUIDE | CONSTRUCTION | RECREATION (optional)
  - `search`: Fuzzy search term (optional)
  - `limit`: 1-50, default 20
  - `offset`: Pagination offset, default 0
- **Response (200)**:
```json
{
  "signs": [
    {
      "id": "uuid",
      "name": "Deer Crossing",
      "description": "Wildlife may cross ahead",
      "category": "WARNING",
      "region": "US",
      "imageUrl": "https://cdn.signwise.ai/signs/us/deer-crossing.png",
      "rules": "Reduce speed, especially dawn/dusk..."
    },
    // ... more signs
  ],
  "total": 156,
  "hasMore": true
}
```
- **Caching**: 1 hour (signs rarely change)

`GET /api/signs/{id}`
- **Purpose**: Get detailed sign information
- **Response (200)**:
```json
{
  "id": "uuid",
  "name": "Stop Sign",
  "description": "Come to complete stop",
  "category": "REGULATORY",
  "region": "US",
  "imageUrl": "https://...",
  "rules": "Full stop at white line or before entering intersection...",
  "relatedSigns": [
    { "id": "...", "name": "Yield", "imageUrl": "..." }
  ],
  "userStats": {
    "attempts": 12,
    "accuracy": 91.7
  }
}
```
- **Errors**: 404: Sign not found

---

**Quiz Endpoints**

`GET /api/quiz/generate?type=DAILY_CHALLENGE&count=10`
- **Purpose**: Generate adaptive quiz questions
- **Auth**: Required (JWT)
- **Query Params**:
  - `type`: DAILY_CHALLENGE | PRACTICE | CATEGORY_FOCUSED
  - `count`: 5-20, default 10
  - `category`: (optional, for CATEGORY_FOCUSED)
- **Response (200)**:
```json
{
  "sessionId": "uuid",
  "questions": [
    {
      "id": "uuid",
      "signId": "uuid",
      "signImageUrl": "https://...",
      "questionText": "What does this sign mean?",
      "options": [
        "Stop completely",
        "Yield to traffic",
        "Speed limit 25",
        "Pedestrian crossing"
      ],
      "difficulty": 2
    },
    // ... 9 more
  ],
  "xpPotential": 50
}
```
- **Algorithm**: 
  1. Fetch user's sign stats (accuracy per sign)
  2. Prioritize signs with <70% accuracy OR last_seen > 7 days
  3. Mix difficulties: 30% easy, 40% medium, 30% hard
  4. Ensure variety (no duplicate categories in a row)

`POST /api/quiz/submit`
- **Purpose**: Submit quiz answers and get results
- **Auth**: Required
- **Request Body**:
```json
{
  "sessionId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "selectedAnswer": 0,
      "timeSpent": 4500
    },
    // ... 9 more
  ]
}
```
- **Response (200)**:
```json
{
  "results": {
    "correct": 8,
    "total": 10,
    "accuracy": 80.0,
    "xpEarned": 40,
    "newLevel": 5,
    "leveledUp": false,
    "weakAreas": ["WARNING", "CONSTRUCTION"]
  },
  "answerFeedback": [
    {
      "questionId": "uuid",
      "isCorrect": true,
      "correctAnswer": 0,
      "explanation": "This is a stop sign requiring full stop..."
    },
    // ... 9 more
  ],
  "newBadges": []
}
```
- **Side Effects**: 
  - Update user XP and level
  - Update UserSignStat for each question
  - Check and award badges
  - Update streak if daily challenge

---

**AI Recognition Endpoints**

`POST /api/ai/recognize-sign`
- **Purpose**: Identify traffic sign from uploaded image
- **Auth**: Required
- **Request**: Multipart form-data
  - `image`: File (JPEG/PNG, max 5MB)
  - `location`: Optional geolocation string
- **Response (200)**:
```json
{
  "recognition": {
    "id": "uuid",
    "sign": {
      "id": "uuid",
      "name": "Speed Limit 25",
      "category": "REGULATORY",
      "description": "Maximum speed 25 mph",
      "imageUrl": "https://...",
      "rules": "Do not exceed posted speed..."
    },
    "confidence": 0.97,
    "uploadedImageUrl": "https://s3.../user-uploads/uuid.jpg",
    "xpEarned": 10
  }
}
```
- **Response (200 - Unrecognized)**:
```json
{
  "recognition": {
    "id": "uuid",
    "sign": null,
    "confidence": 0.42,
    "uploadedImageUrl": "https://...",
    "message": "Could not identify sign. Try better lighting or closer photo.",
    "suggestions": [
      "Ensure sign is centered and in focus",
      "Avoid glare or shadows"
    ]
  }
}
```
- **Errors**: 
  - 400: Invalid image format, file too large
  - 413: File exceeds 5MB
  - 429: Rate limit (10 requests per minute)
- **Processing Flow**:
  1. Upload image to S3
  2. Call Python AI service (Gemini Vision API)
  3. If confidence > 80%, return matched sign
  4. If confidence < 80%, return unrecognized
  5. Save recognition record to DB
  6. Award XP to user

---

**User/Profile Endpoints**

`GET /api/users/{id}/stats`
- **Purpose**: Get comprehensive user statistics
- **Auth**: Required (can only access own stats unless admin)
- **Response (200)**:
```json
{
  "user": {
    "id": "uuid",
    "name": "Alex Chen",
    "level": 5,
    "xp": 1247,
    "xpToNextLevel": 253,
    "streakDays": 7,
    "joinedAt": "2025-01-01T00:00:00Z"
  },
  "progress": {
    "signsMastered": 34,
    "totalSigns": 150,
    "masteryPercentage": 22.7,
    "categoryProgress": [
      { "category": "WARNING", "mastered": 12, "total": 30, "percentage": 40.0 },
      { "category": "REGULATORY", "mastered": 18, "total": 45, "percentage": 40.0 },
      // ... others
    ]
  },
  "quizStats": {
    "totalQuizzes": 42,
    "avgAccuracy": 83.5,
    "totalQuestionsAnswered": 420,
    "correctAnswers": 351
  },
  "recognitions": {
    "total": 67,
    "successRate": 94.0
  },
  "badges": [
    {
      "id": "uuid",
      "name": "First Steps",
      "description": "Complete first quiz",
      "iconUrl": "https://...",
      "earnedAt": "2025-01-02T10:30:00Z"
    },
    // ... more badges
  ]
}
```

`PATCH /api/users/{id}/profile`
- **Purpose**: Update user profile
- **Auth**: Required (own profile only)
- **Request Body**:
```json
{
  "name": "Alex Chen Jr.",
  "avatarUrl": "https://...",
  "notificationSettings": {
    "dailyReminder": true,
    "challengeInvites": true
  }
}
```
- **Response (200)**: Updated user object

---

**Chat (AI Tutor) Endpoints**

`POST /api/chat/message`
- **Purpose**: Send message to AI tutor and get response
- **Auth**: Required
- **Request Body**:
```json
{
  "conversationId": "uuid-or-null-for-new",
  "message": "What's the difference between a yield sign and a stop sign?"
}
```
- **Response (200)**:
```json
{
  "conversationId": "uuid",
  "response": {
    "role": "ASSISTANT",
    "content": "Great question! Here are the key differences:\n\n**Stop Sign:**\n- Requires full stop...\n\n**Yield Sign:**\n- Requires slowing down...",
    "referencedSigns": [
      {
        "id": "uuid",
        "name": "Stop Sign",
        "imageUrl": "https://..."
      },
      {
        "id": "uuid",
        "name": "Yield Sign",
        "imageUrl": "https://..."
      }
    ],
    "suggestedQuiz": {
      "topic": "Regulatory Signs",
      "questionCount": 5
    }
  }
}
```
- **Streaming**: Support SSE for real-time response streaming
- **Backend Processing**:
  1. Create/fetch conversation
  2. Call Python AI service (Gemini + RAG)
  3. Parse response for sign references
  4. Save message to DB
  5. Return formatted response

---

### 5.4 AI Service Architecture (Simplified for Student MVP)

**Overview**: 
A lightweight service that acts as a proxy to the Google Gemini 1.5 Flash API. This approach leverages cloud AI for zero-shot recognition, eliminating the need for local GPU inference or complex model hosting.

**Core Technology**: Google Gemini 1.5 Flash (via API)
- **Role**: Primary image recognition engine.
- **Why**: Zero-shot recognition, multimodal context understanding, ultra-fast (<1s), and generous Free Tier (15 RPM).
- **Fallback**: None required for MVP (highly reliable API).

**Tech Stack**:
- **Runtime**: Node.js (integrated into main backend) OR Python FastAPI (optional lightweight wrapper)
- **AI Provider**: Google Vertex AI / Gemini API
- **Model**: `gemini-1.5-flash`
- **Key Libraries**: `@google/generative-ai` (Official SDK)

**Workflow**:
1. **Input**: User uploads image (multipart/form-data)
2. **Preprocessing**: Validate file size (<5MB), resize if necessary
3. **AI Request**: Send image + System Prompt to Gemini API
4. **Parsing**: Extract JSON from AI response
5. **Output**: Return structured data (Sign Name, Category, Explanation)

**System Prompt Strategy**:
```text
Role: Traffic Safety Expert
Input: Image of a traffic sign
Task: Identify the sign and explain it to a learner driver.
Output Format: JSON
{
  "detected": boolean,
  "sign_name": "string",
  "category": "Warning|Regulatory|Guide|Construction",
  "explanation": "concise string (<50 words)",
  "driving_action": "what should the driver do?",
  "confidence": number (0-1)
}
```

**Project Structure (Simplified)**:
```
/signwise-backend
├── /src
│   ├── /ai
│   │   ├── gemini.service.ts    # Setup and API calls
│   │   ├── prompts.ts           # System prompts
│   │   └── mock.service.ts      # For offline testing
```

#### Key AI Features Implementation (Node.js Example)

**Traffic Sign Recognition**:

```typescript
// src/ai/gemini.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function recognizeSign(imageBuffer: Buffer, mimeType: string) {
  // 1. Prepare image for API
  const imagePart = {
    inlineData: {
      data: imageBuffer.toString("base64"),
      mimeType
    },
  };

  // 2. Send to Gemini with System Prompt
  const result = await model.generateContent([
    SYSTEM_PROMPT_SIGN_RECOGNITION, 
    imagePart
  ]);
  
  // 3. Parse JSON response
  const responseText = result.response.text();
  try {
    // Clean markdown code blocks if present (```json ... ```)
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse AI response", error);
    return null; // Or retry logic
  }
}
```

**AI Chat Tutor (RAG-Lite)**:

```typescript
// src/ai/chat.service.ts
export async function chatWithTutor(message: string, history: any[]) {
  const chat = model.startChat({
    history: history, // Pass previous conversation context
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}
```

#### Integration & Communication

**Backend → AI Proxy**:
- **Protocol**: Internal function call (since AI service is part of backend)
- **Timeout**: 10 seconds (Gemini API limit)
- **Retry**: 3 attempts with exponential backoff
- **Caching**: Redis cache for identical image hashes (1 hour TTL)

### 5.5 Security Considerations

- [x] **Input Validation**: 
  - All user inputs validated with Zod schemas (frontend + backend)
  - Image uploads: File type whitelist (JPEG, PNG only), max 5MB size
  - SQL injection prevention via Prisma parameterized queries
  
- [x] **XSS Prevention**:
  - React auto-escapes output by default
  - Sanitize user-generated content (chat messages, usernames) via DOMPurify
  - Content Security Policy headers:
    ```
    Content-Security-Policy: default-src 'self'; 
      script-src 'self' 'unsafe-inline' https://apis.google.com;
      img-src 'self' https://cdn.signwise.ai https://s3.amazonaws.com data:;
      connect-src 'self' https://api.signwise.ai wss://ws.signwise.ai
    ```

- [x] **CSRF Protection**:
  - SameSite=Strict cookies for refresh tokens
  - CSRF tokens for state-changing operations from web clients
  
- [x] **Rate Limiting** (Express Rate Limit):
  - Auth endpoints: 5 requests/15 minutes per IP
  - Recognition endpoint: 10 requests/minute per user
  - Quiz generation: 20 requests/hour per user
  - General API: 100 requests/15 minutes per user
  
- [x] **Secure Password Storage**:
  - bcrypt with 10 salt rounds
  - Passwords never logged or returned in API responses
  - Password reset via time-limited tokens (1-hour expiry)
  
- [x] **JWT Token Security**:
  - Access tokens: 15-minute expiry, stored in memory (not localStorage)
  - Refresh tokens: 7-day expiry, httpOnly secure cookies
  - Rotation: New refresh token issued on every refresh
  - Invalidation: Blacklist mechanism for logout (Redis-based)
  
- [x] **HTTPS Only** (TLS 1.3):
  - Strict-Transport-Security header (HSTS): `max-age=31536000; includeSubDomains`
  - All cookies: Secure flag enabled
  
- [x] **Environment Variables**:
  - Secrets never committed (`.env` in `.gitignore`)
  - Production secrets managed via secure storage (AWS Secrets Manager, Vercel Env Vars)
  - Frontend env vars prefixed with `NEXT_PUBLIC_` only for safe values
  
- [x] **CORS Configuration**:
  - Whitelist allowed origins: `https://signwise.ai`, `https://www.signwise.ai`
  - Credentials: true (for cookies)
  - Methods: GET, POST, PATCH, DELETE
  
- [x] **File Upload Restrictions**:
  - Virus scanning for uploaded images (ClamAV integration)
  - Store user uploads in isolated S3 bucket with strict permissions
  - Generate signed URLs for temporary access (1-hour expiry)
  
- [x] **Data Encryption**:
  - At rest: AWS S3 server-side encryption (AES-256)
  - In transit: TLS 1.3
  - Sensitive fields: PII encrypted before database storage (user addresses if added)

- [x] **Dependency Security**:
  - Automated scanning via Dependabot
  - Weekly updates for security patches
  - Pin major versions, allow patch/minor updates

- [x] **Error Handling (No Information Leakage)**:
  - Generic error messages to users ("Something went wrong")
  - Detailed errors logged server-side only (Winston)
  - Stack traces never exposed in production

---

### 5.6 Performance Targets

**Frontend**:
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms
- Lighthouse Score: >90 (Performance, Accessibility, Best Practices, SEO)

**Backend**:
- API Response Time (p50): <100ms
- API Response Time (p95): <200ms
- API Response Time (p99): <500ms
- Throughput: 1000 requests/second (horizontal scaling)
- Database Query Time (p95): <50ms

**AI Service**:
- Sign Recognition Inference: <3 seconds (p95)
- Chat Response (first token): <1 second
- Concurrent Recognition Requests: 50+ (with queue for overflow)

**Monitoring**:
- Real User Monitoring (RUM): Google Analytics 4
- Error tracking: Sentry (frontend + backend)
- APM: (optional) New Relic or Datadog for detailed performance insights
- Logging: Winston (backend), CloudWatch (AWS)

---

### 5.7 Deployment Strategy

**Option A: Student MVP (Recommended - $0 Cost)**
- **Frontend**: Localhost / Vercel (Hobby Tier)
- **Backend/AI**: Localhost (Node.js/Python) on Laptop CPU
- **Database**: Local SQLite or Supabase/Neon Free Tier
- **AI Engine**: Google Gemini API (Free Tier)
- **Requirements**: No GPU needed, standard laptop is sufficient.

**Option B: Production Cloud**
- **Frontend**: Vercel Pro ($20/mo)
- **Backend**: AWS Lambda / Google Cloud Run
- **Database**: AWS RDS / PlanetScale

**Hosting Stack**:
- **Frontend**: Vercel (Next.js optimized deployment)
  - Auto-deploy from `main` branch (GitHub integration)
  - Edge caching for static pages
  - Image optimization via Vercel Image API
  - Preview deployments for PRs

- **Backend API**: AWS ECS (Elastic Container Service) OR Railway OR Render
  - Docker containers (Node.js app)
  - Auto-scaling: 2-10 instances based on CPU/memory
  - Load balancer (ALB) for traffic distribution
  - Health checks: GET /health endpoint
  
- **AI Service**: AWS ECS with GPU (or Hugging Face Inference Endpoints)
  - Docker containers (Python FastAPI)
  - g4dn.xlarge instances (NVIDIA T4 GPU for custom models)
  - Fallback to Gemini API if GPU unavailable
  
- **Database**: 
  - PostgreSQL: AWS RDS (Multi-AZ for HA)
    - Instance: db.t3.medium (2 vCPU, 4GB RAM) for MVP
    - Automatic backups (daily, 7-day retention)
    - Read replicas for scaling if needed
  - Redis: AWS ElastiCache (cache.t3.micro for MVP)
  
- **Object Storage**: AWS S3
  - Buckets: `signwise-cdn-signs` (public, CloudFront CDN), `signwise-user-uploads` (private, signed URLs)
  - Lifecycle policies: Delete unmatched uploads after 30 days
  
- **CDN**: CloudFlare (for static assets, sign images)
  - Caching TTL: 1 year for signs, 1 hour for API responses
  - DDoS protection
  
- **Monitoring & Logging**:
  - Sentry (error tracking)
  - AWS CloudWatch (logs, metrics, alarms)
  - Uptime monitoring: UptimeRobot (free tier)

**Environment Variables** (all services):

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=https://api.signwise.ai
NEXT_PUBLIC_WS_URL=wss://ws.signwise.ai
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxx
NEXT_PUBLIC_SENTRY_DSN=xxx
```

Backend (.env):
```
DATABASE_URL=postgresql://user:pass@rds.amazonaws.com:5432/signwise
REDIS_URL=redis://elasticache.amazonaws.com:6379
JWT_SECRET=xxx
JWT_REFRESH_SECRET=xxx
AWS_S3_BUCKET=signwise-user-uploads
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
SENDGRID_API_KEY=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
AI_SERVICE_URL=http://ai-service:5000
AI_SERVICE_API_KEY=xxx
SENTRY_DSN=xxx
NODE_ENV=production
```

AI Service (.env):
```
GEMINI_API_KEY=xxx
PINECONE_API_KEY=xxx
PINECONE_ENVIRONMENT=us-west1-gcp
MODEL_PATH=/models/cnn_gtsrb.h5
REDIS_URL=redis://elasticache.amazonaws.com:6379
```

---

## 6. SUCCESS METRICS & ANALYTICS

### 6.1 Quantitative Metrics

**North Star Metric**: **Weekly Active Users (WAU) with 3+ sessions**
- Rationale: Indicates genuine habit formation and value delivery
- Target: 60% of registered users become WAU within 30 days

**User Engagement** (Pirate Metrics: AARRR):

**Acquisition**:
- Website visitors → signups: 15% conversion
- Viral coefficient (K-factor): 0.4 (40% of users invite 1+ friend)
- Tracking: Google Analytics 4 events (`page_view`, `sign_up_started`, `sign_up_completed`)

**Activation** (Aha Moment):
- % users completing FTUE: >70%
- % users using upload feature in first session: >60%
- % users completing first quiz: >55%
- Time to first value: <60 seconds (median)
- Tracking: Custom events (`upload_first_use`, `quiz_first_complete`, `aha_moment_reached`)

**Retention**:
- Day 1 retention: >40%
- Day 7 retention: >25%
- Day 30 retention: >15%
- 7-day active streaks maintained: >20% of active users
- Tracking: Cohort analysis in Amplitude/Mixpanel (or custom Postgres queries)

**Revenue** (Future - Freemium Model):
- Free → Pro conversion: >5% of monthly active users
- Monthly Recurring Revenue (MRR): Track after monetization launch
- Customer Lifetime Value (LTV): Calculate after 6 months of revenue data

**Referral**:
- % users who send challenge invite: >25%
- % invites accepted: >30%
- Organic share rate (social media): >10% of users
- Tracking: Custom events (`challenge_invite_sent`, `social_share_clicked`)

**Feature Adoption**:
- Image upload/recognition usage: 70% of DAU
- Quiz completion rate: 60% of DAU
- AI chat tutor engagement: 30% of WAU, 4+ messages/conversation avg
- Social challenges: 20% participation rate
- AR mode (if shipped): 10% adoption

**Performance & Quality**:
- Recognition accuracy (user-validated): >90%
- Quiz completion rate (started → finished): >80%
- App crash rate: <0.5% of sessions
- API error rate: <1% of requests
- Average session duration: 8-12 minutes

**Learning Outcomes**:
- Sign mastery growth: +15 signs per week per active user
- Quiz accuracy improvement: +10% within first month
- Users reaching "Expert" level (90%+ mastery): >10% after 3 months

---

### 6.2 Qualitative Indicators

**User Sentiment Signals** (App Store reviews, in-app surveys):
- "This is so much better than [competitor]" mentions
- "I passed my driving test because of this app!"
- "I actually enjoy learning signs now"
- "The upload feature is so easy to use"
- "My streak motivates me to practice daily"

**Target NPS (Net Promoter Score)**: >50 (excellent)

**Judge/Demo Reactions** (for hackathons/pitches):
- Leaning forward during live demo
- "Wow" reactions to instant recognition
- Questions about business model (sign of interest)
- Requests for beta access
- Social shares of demo video

**Investor/Stakeholder Signals**:
- "This has real product-market fit"
- "Scalable to other countries/regions"
- "Potential for B2B2C (driving schools)"
- Partnership inquiries from edu-tech companies

---

### 6.3 Analytics Implementation

**Analytics Platform**: PostHog (open-source, self-hosted OR cloud)
- Advantages: Event tracking, session replay, feature flags, A/B testing, funnels, cohorts - all-in-one
- Alternative: Mixpanel (easier setup, paid)

**Events to Track**:

**Page/Screen Views**:
- `page_viewed`: { page_name, previous_page, session_id }

**Authentication**:
- `signup_started`: { method }
- `signup_completed`: { method, user_id }
- `login_success`: { method, user_id }
- `login_failed`: { reason }

**Image Upload & Recognition**:
- `upload_opened`: { entry_point }
- `image_selected`: { file_size_kb, file_type }
- `image_uploaded`: { session_id }
- `recognition_success`: { sign_id, confidence, time_taken_ms, user_id }
- `recognition_failed`: { confidence, user_id }
- `recognition_added_to_practice`: { sign_id, user_id }

**Quiz**:
- `quiz_started`: { type, question_count, user_id }
- `quiz_question_answered`: { question_id, is_correct, time_spent_ms, user_id }
- `quiz_completed`: { session_id, accuracy, xp_earned, user_id }
- `quiz_abandoned`: { questions_answered, total_questions, user_id }

**Progress & Gamification**:
- `level_up`: { old_level, new_level, user_id }
- `badge_earned`: { badge_id, badge_name, user_id }
- `streak_milestone`: { streak_days, user_id }
- `streak_broken`: { previous_streak, user_id }

**Social Features**:
- `challenge_sent`: { opponent_id, challenge_type, user_id }
- `challenge_accepted`: { challenge_id, user_id }
- `challenge_completed`: { challenge_id, winner_id, score_diff }
- `social_share`: { content_type, platform, user_id }

**AI Chat**:
- `chat_opened`: { entry_point, user_id }
- `chat_message_sent`: { conversation_id, message_length, user_id }
- `chat_response_received`: { conversation_id, response_length, time_taken_ms }

**Engagement**:
- `session_start`: { user_id, platform, app_version }
- `session_end`: { session_duration_sec, user_id }
- `feature_discovered`: { feature_name, user_id }

**Funnels to Monitor**:

**Signup Funnel**:
1. Landing page view
2. Signup button click
3. Form started
4. Form submitted
5. Email verified (if required)
6. First login

**FTUE Funnel**:
1. First app open
2. Onboarding completed
3. Upload feature first use
4. First recognition success
5. First quiz started
6. First quiz completed

**Retention Funnel**:
1. Day 0 (signup)
2. Day 1 return
3. Day 3 return
4. Day 7 return
5. Day 30 return

**Conversion to Power User**:
1. Regular user (5+ sessions)
2. Daily streak established (3+ days)
3. Social feature use (challenge sent)
4. Expert level reached (30+ signs mastered)

**User Properties** (enriched with every event):
- `user_id`
- `level`
- `xp`
- `streak_days`
- `signs_mastered`
- `total_quizzes_completed`
- `account_age_days`
- `region` (US/CA/UK/EU)
- `platform` (iOS/Android/Web)

**Implementation** (Frontend):
```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

export const analytics = {
  track: (event: string, properties?: object) => {
    posthog.capture(event, properties);
  },
  identifyUser: (userId: string, traits: object) => {
    posthog.identify(userId, traits);
  },
  page: (pageName: string) => {
    posthog.capture('$pageview', { page_name: pageName });
  }
};

// Usage in components
analytics.track('quiz_completed', {
  session_id: quizId,
  accuracy: 85,
  xp_earned: 42,
  user_id: currentUser.id
});
```

---

### 6.4 A/B Testing Roadmap (Post-MVP)

**Experiments to Run**:
1. **Onboarding flow**: 3-screen vs. 1-screen vs. skip option
2. **Gamification intensity**: High (confetti, sounds) vs. minimal (just XP)
3. **Quiz question count**: 5 vs. 10 vs. 20 questions per session
4. **Daily reminder time**: 9am vs. 6pm vs. user-selected
5. **Recognition feedback**: Immediate popup vs. slide-up card vs. full-screen
6. **Pricing** (when monetization launches): $4.99/month vs. $29.99/year vs. $2.99/month + ads

**Tooling**: PostHog feature flags OR LaunchDarkly

---

## 7. APPENDIX

### 7.1 Design References & Inspiration
- [Framer.com](https://framer.com) - Dark mode, motion design, modern SaaS aesthetics
- Duolingo - Gamification, streaks, micro-interactions
- Notion - Clean UI, information density, dark mode palettes
- Linear - Command palette, keyboard shortcuts, premium feel
- Apple Fitness - Circular progress rings, achievement animations

### 7.2 Competitive Products (Full List)
1. Traffic & Road Signs (iOS/Android)
2. Road Signs AI: Test & Theory (iOS)
3. Practice Test USA & Road Signs
4. Sygic GPS Navigation (TSR feature)
5. Google Maps (limited sign info)
6. Driving school apps (AAA, DriversEd.com)
7. DMV Genie (test prep, includes signs)

### 7.3 Technical Dependencies (Key Libraries)
**Frontend**:
- next: ^14.0.0
- react: ^18.2.0
- tailwindcss: ^3.4.0
- framer-motion: ^11.0.0
- zustand: ^4.4.0
- @tanstack/react-query: ^5.0.0
- react-hook-form: ^7.48.0
- zod: ^3.22.0
- socket.io-client: ^4.6.0
- lucide-react: ^0.300.0

**Backend**:
- express: ^4.18.0
- @prisma/client: ^5.7.0
- jsonwebtoken: ^9.0.0
- bcrypt: ^5.1.0
- zod: ^3.22.0
- socket.io: ^4.6.0
- ioredis: ^5.3.0
- bull: ^4.12.0
-aws-sdk: ^2.1500.0

**AI Service**:
- fastapi: ^0.104.0
- google-generativeai: ^0.3.0 (Gemini SDK)
- tensorflow: ^2.15.0 OR pytorch: ^2.0.0
- opencv-python: ^4.8.0
- pillow: ^10.1.0
- pinecone-client: ^2.2.0
- celery: ^5.3.0

---

### 7.4 Open Questions & Future Considerations

**Product**:
- Should we support EU signs in MVP or focus on US/CA only?
- Is AR mode critical for differentiation or can it wait for V2?
- Should instructors get free access in beta?

**Technical**:
- Self-host AI models vs. rely 100% on Gemini API? (Cost vs. control trade-off)
- PostgreSQL full-text search sufficient or invest in Algolia/Elasticsearch early?
- Monorepo (Turborepo) vs. separate repos for frontend/backend/AI?

**Business**:
- Freemium from day 1 or fully free MVP to maximize growth?
- B2C only or also pursue B2B (driving schools, insurance companies)?
- Which markets to expand to first: EU, Australia, or Asia?

---

### 7.5 Success Criteria Summary

**MVP Success Definition** (3 months post-launch):
- ✅ 10,000+ registered users
- ✅ 25% Day-7 retention rate
- ✅ 60+ average signs mastered per power user
- ✅ 4.5+ star rating on App Store/Google Play (min 100 reviews)
- ✅ 90%+ sign recognition accuracy (user-validated)
- ✅ <2% crash rate, <1% API error rate
- ✅ One successful partnership with driving school OR DMV

**Innovation Validation**:
- ✅ Users prefer SignWise over static quiz apps (survey-based)
- ✅ Measurable learning outcomes (quiz scores improve 15%+ in 1 month)
- ✅ Upload feature is #1 cited reason for daily usage (user interviews)
- ✅ Social challenges drive 30%+ of user invites

**Investor-Ready Metrics** (6-12 months):
- 50K+ MAU with 15%+ 30-day retention
- Viral coefficient K > 0.6 (organic growth)
- Product-market fit score (Sean Ellis test) > 40%
- Clear path to monetization with pilot users/instructors

---

**END OF PRD**

---

## Document Control

**Version**: 1.0 (MVP)
**Last Updated**: January 13, 2026
**Owner**: Product Team
**Status**: Ready for Development
**Next Review**: After stakeholder approval

**Changelog**:
- v1.0 (2026-01-13): Initial comprehensive PRD created
- v0.9 (Planning): Market research and competitive analysis
- v0.5 (Concept): Innovation thesis formulation

