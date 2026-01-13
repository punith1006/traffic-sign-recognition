// API Client for SignWise AI Backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Get token from localStorage
const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("signwise_token");
};

// Set token in localStorage
export const setToken = (token: string) => {
    localStorage.setItem("signwise_token", token);
};

// Clear token
export const clearToken = () => {
    localStorage.removeItem("signwise_token");
};

// Fetch wrapper with auth
async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || "Request failed");
    }

    return response.json();
}

// Auth API
export const authAPI = {
    guestLogin: () => fetchAPI<{ user: User; token: string }>("/auth/guest", { method: "POST" }),

    register: (data: { username: string; email?: string; password: string }) =>
        fetchAPI<{ user: User; token: string }>("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    login: (data: { username: string; password: string }) =>
        fetchAPI<{ user: User; token: string }>("/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
        }),
};

// Signs API
export const signsAPI = {
    getAll: (params?: { category?: string; search?: string; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.category) query.set("category", params.category);
        if (params?.search) query.set("search", params.search);
        if (params?.limit) query.set("limit", params.limit.toString());
        return fetchAPI<Sign[]>(`/signs?${query.toString()}`);
    },

    getById: (id: string) => fetchAPI<Sign>(`/signs/${id}`),

    getCategories: () => fetchAPI<{ category: string; count: number }[]>("/signs/categories/stats"),
};

// Quiz API
export const quizAPI = {
    getQuestions: (params?: { count?: number; category?: string; difficulty?: number }) => {
        const query = new URLSearchParams();
        if (params?.count) query.set("count", params.count.toString());
        if (params?.category) query.set("category", params.category);
        if (params?.difficulty) query.set("difficulty", params.difficulty.toString());
        return fetchAPI<QuizQuestion[]>(`/quiz/questions?${query.toString()}`);
    },

    startSession: (data: { type?: string; questionCount?: number }) =>
        fetchAPI<{ sessionId: string }>("/quiz/start", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    submitAnswer: (data: { sessionId: string; questionId: string; selectedAnswer: number; timeSpentMs?: number }) =>
        fetchAPI<{ isCorrect: boolean; correctAnswer: number; explanation: string; signName: string }>("/quiz/answer", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    completeSession: (sessionId: string) =>
        fetchAPI<QuizResult>("/quiz/complete", {
            method: "POST",
            body: JSON.stringify({ sessionId }),
        }),
};

// User API
export const userAPI = {
    getStats: () => fetchAPI<UserStats>("/user/stats"),
    getProgress: () => fetchAPI<CategoryProgress[]>("/user/progress"),
    getLeaderboard: (limit?: number) => fetchAPI<LeaderboardEntry[]>(`/user/leaderboard?limit=${limit || 10}`),
};

// AI API
export const aiAPI = {
    recognizeSign: (imageBase64: string) =>
        fetchAPI<RecognitionResult>("/ai/recognize", {
            method: "POST",
            body: JSON.stringify({ imageBase64 }),
        }),

    chat: (message: string, conversationHistory?: { role: string; content: string }[]) =>
        fetchAPI<{ reply: string; signRef?: Sign; isMock: boolean }>("/ai/chat", {
            method: "POST",
            body: JSON.stringify({ message, conversationHistory }),
        }),
};

// Types
export interface User {
    id: string;
    username: string;
    email?: string;
    isGuest?: boolean;
    xp: number;
    level: number;
    streakDays: number;
}

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
    signName: string;
    questionText: string;
    options: string[];
    difficulty: number;
}

export interface QuizResult {
    correctAnswers: number;
    totalQuestions: number;
    accuracy: number;
    xpEarned: number;
    newTotalXp: number;
    level: number;
    leveledUp: boolean;
}

export interface UserStats {
    id: string;
    username: string;
    email?: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    streakDays: number;
    signsMastered: number;
    totalSigns: number;
    totalQuizzes: number;
    avgAccuracy: number;
    badges: Badge[];
    createdAt: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    earnedAt?: string;
}

export interface CategoryProgress {
    category: string;
    total: number;
    mastered: number;
    percentage: number;
}

export interface LeaderboardEntry {
    rank: number;
    id: string;
    username: string;
    xp: number;
    level: number;
    streakDays: number;
}

export interface RecognitionResult {
    success: boolean;
    sign?: Sign;
    confidence?: number;
    xpEarned?: number;
    annotatedImage?: string; // Base64 encoded JPEG
    error?: string;
    isMock?: boolean;
}
