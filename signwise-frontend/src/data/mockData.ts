// Mock data for SignWise AI

export interface Sign {
    id: string;
    name: string;
    category: "WARNING" | "REGULATORY" | "GUIDE" | "CONSTRUCTION" | "RECREATION";
    description: string;
    imageUrl: string;
    rules: string;
    region: string;
}

export interface QuizQuestion {
    id: string;
    signId: string;
    signImageUrl: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
    difficulty: 1 | 2 | 3;
    explanation: string;
}

export interface UserStats {
    level: number;
    xp: number;
    xpToNextLevel: number;
    streakDays: number;
    signsMastered: number;
    totalSigns: number;
    totalQuizzes: number;
    avgAccuracy: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    earned: boolean;
    earnedAt?: string;
}

// Mock Signs Data
export const mockSigns: Sign[] = [
    {
        id: "1",
        name: "Stop Sign",
        category: "REGULATORY",
        description: "Come to a complete stop at the intersection.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/STOP_sign.svg/220px-STOP_sign.svg.png",
        rules: "Stop completely before the stop line or crosswalk. Check for traffic from all directions before proceeding.",
        region: "US",
    },
    {
        id: "2",
        name: "Yield Sign",
        category: "REGULATORY",
        description: "Slow down and yield to oncoming traffic.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/United_States_-_Yield.svg/220px-United_States_-_Yield.svg.png",
        rules: "Slow down as you approach. Be prepared to stop if necessary. Yield the right-of-way to pedestrians and vehicles.",
        region: "US",
    },
    {
        id: "3",
        name: "Speed Limit 25",
        category: "REGULATORY",
        description: "Maximum speed limit is 25 mph.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Speedlimit25.svg/200px-Speedlimit25.svg.png",
        rules: "Do not exceed 25 miles per hour. Common in residential areas and school zones.",
        region: "US",
    },
    {
        id: "4",
        name: "Deer Crossing",
        category: "WARNING",
        description: "Wildlife may cross the road ahead.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/OH-deer-ahead.svg/200px-OH-deer-ahead.svg.png",
        rules: "Reduce speed and stay alert, especially at dawn and dusk. Watch for deer and other wildlife.",
        region: "US",
    },
    {
        id: "5",
        name: "Pedestrian Crossing",
        category: "WARNING",
        description: "Pedestrians may be crossing ahead.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/MUTCD_W11-2.svg/200px-MUTCD_W11-2.svg.png",
        rules: "Slow down and be prepared to stop for pedestrians. Always yield to pedestrians in crosswalks.",
        region: "US",
    },
    {
        id: "6",
        name: "Railroad Crossing",
        category: "WARNING",
        description: "Railroad tracks ahead.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/MUTCD_W10-1.svg/200px-MUTCD_W10-1.svg.png",
        rules: "Slow down and look both ways. Never stop on the tracks. If gates are down, wait until they rise.",
        region: "US",
    },
    {
        id: "7",
        name: "No U-Turn",
        category: "REGULATORY",
        description: "U-turns are prohibited.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_U-Turn.svg/200px-No_U-Turn.svg.png",
        rules: "You cannot make a U-turn at this intersection. Find an alternative route.",
        region: "US",
    },
    {
        id: "8",
        name: "One Way",
        category: "REGULATORY",
        description: "Traffic flows in one direction only.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Road_Sign_One_Way.svg/200px-Road_Sign_One_Way.svg.png",
        rules: "Traffic travels only in the direction indicated. Do not enter from the opposite direction.",
        region: "US",
    },
    {
        id: "9",
        name: "Hospital",
        category: "GUIDE",
        description: "Hospital services ahead.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/MUTCD_D9-2.svg/200px-MUTCD_D9-2.svg.png",
        rules: "Follow signs for hospital access if emergency services needed.",
        region: "US",
    },
    {
        id: "10",
        name: "Road Work Ahead",
        category: "CONSTRUCTION",
        description: "Construction zone ahead, proceed with caution.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Construction_sign.svg/200px-Construction_sign.svg.png",
        rules: "Reduce speed in work zones. Watch for workers and equipment. Fines usually doubled.",
        region: "US",
    },
];

// Mock Quiz Questions
export const mockQuizQuestions: QuizQuestion[] = [
    {
        id: "q1",
        signId: "1",
        signImageUrl: mockSigns[0].imageUrl,
        questionText: "What action does this sign require?",
        options: ["Come to a complete stop", "Yield to oncoming traffic", "Slow down and proceed", "Honk your horn"],
        correctAnswer: 0,
        difficulty: 1,
        explanation: "A stop sign requires you to come to a complete stop before the stop line or crosswalk.",
    },
    {
        id: "q2",
        signId: "2",
        signImageUrl: mockSigns[1].imageUrl,
        questionText: "When you see this sign, you should:",
        options: ["Stop completely always", "Speed up to merge", "Slow down and yield to traffic", "Ignore if no cars visible"],
        correctAnswer: 2,
        difficulty: 1,
        explanation: "A yield sign means you must slow down and give way to other traffic and pedestrians.",
    },
    {
        id: "q3",
        signId: "4",
        signImageUrl: mockSigns[3].imageUrl,
        questionText: "This yellow sign warns about:",
        options: ["Zoo entrance ahead", "Deer crossing area", "Farm animals nearby", "Hunting zone"],
        correctAnswer: 1,
        difficulty: 2,
        explanation: "This warning sign indicates an area where deer frequently cross the road.",
    },
    {
        id: "q4",
        signId: "7",
        signImageUrl: mockSigns[6].imageUrl,
        questionText: "What does this sign prohibit?",
        options: ["Left turns", "Right turns", "U-turns", "All turns"],
        correctAnswer: 2,
        difficulty: 1,
        explanation: "This sign prohibits U-turns at this location.",
    },
    {
        id: "q5",
        signId: "6",
        signImageUrl: mockSigns[5].imageUrl,
        questionText: "When approaching this sign, you should:",
        options: ["Speed up to cross quickly", "Stop only if train is visible", "Slow down and look both ways", "Honk to alert the train"],
        correctAnswer: 2,
        difficulty: 2,
        explanation: "Always slow down at railroad crossings and look both ways.",
    },
];

// Mock User Stats
export const mockUserStats: UserStats = {
    level: 5,
    xp: 1247,
    xpToNextLevel: 253,
    streakDays: 7,
    signsMastered: 34,
    totalSigns: 150,
    totalQuizzes: 42,
    avgAccuracy: 83.5,
};

// Mock Badges
export const mockBadges: Badge[] = [
    { id: "b1", name: "First Steps", description: "Complete your first quiz", iconUrl: "🎯", earned: true, earnedAt: "2026-01-02" },
    { id: "b2", name: "Sign Spotter", description: "Upload and identify 10 signs", iconUrl: "📷", earned: true, earnedAt: "2026-01-05" },
    { id: "b3", name: "Quiz Master", description: "Complete 25 quizzes", iconUrl: "🏆", earned: true, earnedAt: "2026-01-10" },
    { id: "b4", name: "Perfect Score", description: "Get 100% on a quiz", iconUrl: "⭐", earned: true, earnedAt: "2026-01-08" },
    { id: "b5", name: "Week Warrior", description: "Maintain a 7-day streak", iconUrl: "🔥", earned: true, earnedAt: "2026-01-12" },
    { id: "b6", name: "Road Scholar", description: "Master 50 signs", iconUrl: "🎓", earned: false },
    { id: "b7", name: "Speed Demon", description: "Answer 5 questions under 3 seconds", iconUrl: "⚡", earned: false },
    { id: "b8", name: "Category King", description: "Master all signs in one category", iconUrl: "👑", earned: false },
];

// Mock Category Progress
export const mockCategoryProgress = [
    { category: "WARNING", mastered: 12, total: 30, percentage: 40 },
    { category: "REGULATORY", mastered: 18, total: 45, percentage: 40 },
    { category: "GUIDE", mastered: 3, total: 25, percentage: 12 },
    { category: "CONSTRUCTION", mastered: 1, total: 15, percentage: 6.7 },
    { category: "RECREATION", mastered: 0, total: 10, percentage: 0 },
];
