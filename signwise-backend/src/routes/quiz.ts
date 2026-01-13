import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const getPrisma = (req: Request): PrismaClient => req.app.get("prisma");

// Calculate level from XP
const calculateLevel = (xp: number): number => {
    // Level formula: each level requires 500 XP more than the previous
    // Level 1: 0-499, Level 2: 500-1499, Level 3: 1500-2999, etc.
    let level = 1;
    let xpRequired = 500;
    let totalXpForLevel = 0;

    while (xp >= totalXpForLevel + xpRequired) {
        totalXpForLevel += xpRequired;
        level++;
        xpRequired += 500;
    }

    return level;
};

// Get random quiz questions
router.get("/questions", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const { count = "5", category, difficulty } = req.query;

        const where: any = {};
        if (category && category !== "ALL") {
            where.sign = { category };
        }
        if (difficulty) {
            where.difficulty = parseInt(difficulty as string);
        }

        const questions = await prisma.quizQuestion.findMany({
            where,
            include: { sign: true },
            take: parseInt(count as string),
        });

        // Shuffle questions
        const shuffled = questions.sort(() => Math.random() - 0.5);

        res.json(shuffled.map(q => ({
            id: q.id,
            signId: q.signId,
            signImageUrl: q.sign.imageUrl,
            signName: q.sign.name,
            questionText: q.questionText,
            options: JSON.parse(q.options),
            difficulty: q.difficulty,
        })));
    } catch (error) {
        console.error("Get questions error:", error);
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});

// Start a quiz session
router.post("/start", authMiddleware, async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const userId = (req as any).userId;
        const { type = "practice", questionCount = 5 } = req.body;

        const session = await prisma.quizSession.create({
            data: {
                userId,
                type,
                totalQuestions: questionCount,
            },
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Start quiz error:", error);
        res.status(500).json({ error: "Failed to start quiz" });
    }
});

// Submit quiz answer
router.post("/answer", authMiddleware, async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const userId = (req as any).userId;
        const { sessionId, questionId, selectedAnswer, timeSpentMs = 0 } = req.body;

        // Get the question to check answer
        const question = await prisma.quizQuestion.findUnique({
            where: { id: questionId },
            include: { sign: true },
        });

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        const isCorrect = selectedAnswer === question.correctAnswer;

        // Save answer
        await prisma.quizAnswer.create({
            data: {
                sessionId,
                questionId,
                selectedAnswer,
                isCorrect,
                timeSpentMs,
            },
        });

        // Update session correct count
        if (isCorrect) {
            await prisma.quizSession.update({
                where: { id: sessionId },
                data: { correctAnswers: { increment: 1 } },
            });
        }

        // Update sign progress
        await prisma.signProgress.upsert({
            where: { userId_signId: { userId, signId: question.signId } },
            create: {
                userId,
                signId: question.signId,
                timesCorrect: isCorrect ? 1 : 0,
                timesIncorrect: isCorrect ? 0 : 1,
            },
            update: {
                timesCorrect: isCorrect ? { increment: 1 } : undefined,
                timesIncorrect: isCorrect ? undefined : { increment: 1 },
                lastPracticed: new Date(),
            },
        });

        res.json({
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            signName: question.sign.name,
        });
    } catch (error) {
        console.error("Submit answer error:", error);
        res.status(500).json({ error: "Failed to submit answer" });
    }
});

// Complete quiz session
router.post("/complete", authMiddleware, async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const userId = (req as any).userId;
        const { sessionId } = req.body;

        const session = await prisma.quizSession.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        // Calculate XP: 10 per correct answer + bonus for perfect score
        const xpEarned = session.correctAnswers * 10 +
            (session.correctAnswers === session.totalQuestions ? 50 : 0);

        // Update session
        await prisma.quizSession.update({
            where: { id: sessionId },
            data: {
                completedAt: new Date(),
                xpEarned,
            },
        });

        // Update user XP
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: { increment: xpEarned },
                lastActiveAt: new Date(),
            },
        });

        // Recalculate level
        const newLevel = calculateLevel(user.xp);
        if (newLevel !== user.level) {
            await prisma.user.update({
                where: { id: userId },
                data: { level: newLevel },
            });
        }

        res.json({
            correctAnswers: session.correctAnswers,
            totalQuestions: session.totalQuestions,
            accuracy: Math.round((session.correctAnswers / session.totalQuestions) * 100),
            xpEarned,
            newTotalXp: user.xp,
            level: newLevel,
            leveledUp: newLevel > user.level,
        });
    } catch (error) {
        console.error("Complete quiz error:", error);
        res.status(500).json({ error: "Failed to complete quiz" });
    }
});

export default router;
