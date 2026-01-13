import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const getPrisma = (req: Request): PrismaClient => req.app.get("prisma");

// Get user stats and profile
router.get("/stats", authMiddleware, async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const userId = (req as any).userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                badges: { include: { badge: true } },
                signProgress: true,
                quizSessions: { where: { completedAt: { not: null } } },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Calculate stats
        const signsMastered = user.signProgress.filter(p => p.mastered).length;
        const totalQuizzes = user.quizSessions.length;
        const totalCorrect = user.quizSessions.reduce((acc, s) => acc + s.correctAnswers, 0);
        const totalQuestions = user.quizSessions.reduce((acc, s) => acc + s.totalQuestions, 0);
        const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        // XP to next level calculation
        const currentLevelXp = (user.level - 1) * 500 + (user.level > 1 ? ((user.level - 1) * (user.level - 2) / 2) * 500 : 0);
        const nextLevelXp = currentLevelXp + user.level * 500;
        const xpToNextLevel = nextLevelXp - user.xp;

        // Get total signs count
        const totalSigns = await prisma.sign.count();

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level,
            xp: user.xp,
            xpToNextLevel: Math.max(0, xpToNextLevel),
            streakDays: user.streakDays,
            signsMastered,
            totalSigns,
            totalQuizzes,
            avgAccuracy,
            badges: user.badges.map(ub => ({
                id: ub.badge.id,
                name: ub.badge.name,
                description: ub.badge.description,
                iconUrl: ub.badge.iconUrl,
                earnedAt: ub.earnedAt,
            })),
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.error("Get user stats error:", error);
        res.status(500).json({ error: "Failed to fetch user stats" });
    }
});

// Get category progress
router.get("/progress", authMiddleware, async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const userId = (req as any).userId;

        // Get all signs grouped by category
        const categories = await prisma.sign.groupBy({
            by: ["category"],
            _count: { id: true },
        });

        // Get user's mastered signs by category
        const userProgress = await prisma.signProgress.findMany({
            where: { userId, mastered: true },
            include: { sign: true },
        });

        const masteredByCategory: Record<string, number> = {};
        userProgress.forEach(p => {
            masteredByCategory[p.sign.category] = (masteredByCategory[p.sign.category] || 0) + 1;
        });

        const progress = categories.map(c => ({
            category: c.category,
            total: c._count.id,
            mastered: masteredByCategory[c.category] || 0,
            percentage: Math.round(((masteredByCategory[c.category] || 0) / c._count.id) * 100),
        }));

        res.json(progress);
    } catch (error) {
        console.error("Get progress error:", error);
        res.status(500).json({ error: "Failed to fetch progress" });
    }
});

// Get leaderboard
router.get("/leaderboard", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const { limit = "10" } = req.query;

        const users = await prisma.user.findMany({
            orderBy: { xp: "desc" },
            take: parseInt(limit as string),
            select: {
                id: true,
                username: true,
                xp: true,
                level: true,
                streakDays: true,
            },
        });

        res.json(users.map((u, i) => ({ rank: i + 1, ...u })));
    } catch (error) {
        console.error("Get leaderboard error:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

export default router;
