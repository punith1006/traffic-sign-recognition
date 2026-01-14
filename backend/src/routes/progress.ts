import { Router } from 'express';
import prisma from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get user progress
router.get('/', async (req, res) => {
    const visitorId = (req.query.visitorId as string) || (req.headers['x-visitor-id'] as string);

    if (!visitorId) {
        return res.status(400).json({
            success: false,
            message: 'Visitor ID is required',
        });
    }

    let userProgress = await prisma.userProgress.findUnique({
        where: { visitorId },
    });

    // Create new user if doesn't exist
    if (!userProgress) {
        userProgress = await prisma.userProgress.create({
            data: {
                visitorId,
                xp: 0,
                level: 1,
                quizzesCompleted: 0,
                signsLearned: 0,
                currentStreak: 0,
            },
        });
    }

    // Get recent activity
    const recentRecognitions = await prisma.recognition.findMany({
        where: { visitorId },
        include: { sign: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    const recentQuizzes = await prisma.quizSession.findMany({
        where: { visitorId },
        orderBy: { completedAt: 'desc' },
        take: 5,
    });

    // Combine and sort recent activity
    const recentActivity = [
        ...recentRecognitions.map(r => ({
            type: 'recognition' as const,
            signName: r.sign?.name || 'Unknown Sign',
            xp: 10,
            timestamp: r.createdAt,
        })),
        ...recentQuizzes.map(q => ({
            type: 'quiz' as const,
            score: Math.round((q.correctAnswers / q.totalQuestions) * 100),
            xp: q.xpEarned,
            timestamp: q.completedAt,
        })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

    // Calculate XP needed for next level
    const xpForNextLevel = (userProgress.level) * 100;
    const xpProgress = userProgress.xp % 100;

    res.json({
        success: true,
        progress: {
            xp: userProgress.xp,
            level: userProgress.level,
            xpProgress,
            xpForNextLevel,
            quizzesCompleted: userProgress.quizzesCompleted,
            signsLearned: userProgress.signsLearned,
            currentStreak: userProgress.currentStreak,
        },
        recentActivity,
    });
});

// Award XP
router.post('/xp', async (req, res) => {
    const { visitorId, xp } = req.body;

    if (!visitorId || typeof xp !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Visitor ID and XP amount are required',
        });
    }

    let userProgress = await prisma.userProgress.findUnique({
        where: { visitorId },
    });

    if (!userProgress) {
        userProgress = await prisma.userProgress.create({
            data: {
                visitorId,
                xp,
            },
        });
    } else {
        userProgress = await prisma.userProgress.update({
            where: { visitorId },
            data: {
                xp: { increment: xp },
                lastActiveAt: new Date(),
            },
        });
    }

    // Update level
    const newLevel = Math.floor(userProgress.xp / 100) + 1;
    if (newLevel > userProgress.level) {
        await prisma.userProgress.update({
            where: { visitorId },
            data: { level: newLevel },
        });
    }

    res.json({
        success: true,
        progress: {
            xp: userProgress.xp,
            level: newLevel,
        },
    });
});

export default router;
