const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Sign {
    id: string;
    name: string;
    category: 'regulatory' | 'warning' | 'guide' | 'construction';
    description: string;
    rules: string;
    imageUrl: string;
}

export interface RecognitionResult {
    success: boolean;
    recognition?: {
        sign: Sign;
        confidence: number;
        bbox?: { x1: number; y1: number; x2: number; y2: number };
        xpEarned: number;
    };
    progress?: {
        totalXp: number;
        level: number;
    };
    message?: string;
    suggestions?: string[];
}

export interface QuizQuestion {
    id: string;
    signImageUrl: string;
    questionText: string;
    options: string[];
    difficulty: number;
}

export interface QuizResult {
    correct: number;
    total: number;
    accuracy: number;
    xpEarned: number;
}

export interface UserProgress {
    xp: number;
    level: number;
    xpProgress: number;
    xpForNextLevel: number;
    quizzesCompleted: number;
    signsLearned: number;
    currentStreak: number;
    accuracy?: number;
    earnedBadges?: string[];
    badges?: Array<{
        id: string;
        earned: boolean;
        earnedAt?: string;
    }>;
    categoryProgress?: {
        regulatory: { learned: number; total: number };
        warning: { learned: number; total: number };
        guide: { learned: number; total: number };
        construction: { learned: number; total: number };
    };
}

// Get or create visitor ID
export function getVisitorId(): string {
    if (typeof window === 'undefined') return '';

    let visitorId = localStorage.getItem('signwise_visitor_id');
    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('signwise_visitor_id', visitorId);
    }
    return visitorId;
}

// Recognize traffic sign
export async function recognizeSign(imageFile: File): Promise<RecognitionResult> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/recognize`, {
        method: 'POST',
        headers: {
            'X-Visitor-Id': getVisitorId(),
        },
        body: formData,
    });

    return response.json();
}

// Get all signs
export async function getSigns(category?: string): Promise<{ signs: Sign[]; categories: string[] }> {
    const params = new URLSearchParams();
    if (category && category !== 'all') {
        params.append('category', category);
    }

    const response = await fetch(`${API_BASE_URL}/signs?${params.toString()}`);
    return response.json();
}

// Get single sign
export async function getSign(id: string): Promise<{ sign: Sign; relatedSigns: Sign[] }> {
    const response = await fetch(`${API_BASE_URL}/signs/${id}`);
    return response.json();
}

// Generate quiz
export async function generateQuiz(count: number = 10): Promise<{ sessionId: string; questions: QuizQuestion[] }> {
    const response = await fetch(`${API_BASE_URL}/quiz/generate?count=${count}`);
    return response.json();
}

// Submit quiz
export async function submitQuiz(
    sessionId: string,
    answers: { questionId: string; selectedIndex: number }[]
): Promise<{ results: QuizResult; feedback: { questionId: string; correct: boolean; correctIndex: number }[] }> {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionId,
            answers,
            visitorId: getVisitorId(),
        }),
    });

    return response.json();
}

// Get user progress
export async function getProgress(): Promise<{ progress: UserProgress; recentActivity: any[] }> {
    const response = await fetch(`${API_BASE_URL}/progress?visitorId=${getVisitorId()}`);
    return response.json();
}
