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

    // Calculate category progress - count unique signs learned per category
    const categoryProgress = await prisma.$queryRaw<{ category: string; learned: number }[]>`
        SELECT s.category, COUNT(DISTINCT s.id) as learned
        FROM "Recognition" r
        JOIN "Sign" s ON r."signId" = s.id
        WHERE r."visitorId" = ${visitorId}
        GROUP BY s.category
    `;

    // Get total signs per category
    const categoryTotals = await prisma.sign.groupBy({
        by: ['category'],
        _count: true,
    });

    // Build category progress map
    const categoryMap: Record<string, { learned: number; total: number }> = {
        regulatory: { learned: 0, total: 0 },
        warning: { learned: 0, total: 0 },
        guide: { learned: 0, total: 0 },
        construction: { learned: 0, total: 0 },
    };

    // Fill in totals
    categoryTotals.forEach(cat => {
        if (categoryMap[cat.category]) {
            categoryMap[cat.category].total = cat._count;
        }
    });

    // Fill in learned counts
    categoryProgress.forEach(cat => {
        if (categoryMap[cat.category]) {
            categoryMap[cat.category].learned = Number(cat.learned);
        }
    });

    // Calculate accuracy from quiz sessions
    const quizStats = await prisma.quizSession.aggregate({
        where: { visitorId },
        _sum: {
            correctAnswers: true,
            totalQuestions: true,
        },
    });
    const totalCorrect = quizStats._sum.correctAnswers || 0;
    const totalQuestions = quizStats._sum.totalQuestions || 0;
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Check if user got 100% on any quiz
    const perfectQuiz = await prisma.quizSession.findFirst({
        where: {
            visitorId,
            correctAnswers: { equals: prisma.quizSession.fields.totalQuestions }
        },
    }).catch(() => null);
    const hasPerfectQuiz = await prisma.quizSession.findFirst({
        where: { visitorId },
    }).then(async () => {
        const perfect = await prisma.$queryRaw<{ count: number }[]>`
            SELECT COUNT(*) as count FROM "QuizSession" 
            WHERE "visitorId" = ${visitorId} AND "correctAnswers" = "totalQuestions"
        `;
        return (perfect[0]?.count || 0) > 0;
    }).catch(() => false);

    // Check if user tried all categories
    const categoriesTried = Object.values(categoryMap).filter(c => c.learned > 0).length;
    const allCategoriesTried = categoriesTried === 4;

    // Check for 5 recognitions in one day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const recognitionsToday = await prisma.recognition.count({
        where: {
            visitorId,
            createdAt: { gte: today },
        },
    });
    const hasSpeedyDay = recognitionsToday >= 5;

    // Get first recognition date for badge earned dates
    const firstRecognition = await prisma.recognition.findFirst({
        where: { visitorId },
        orderBy: { createdAt: 'asc' },
    });

    // Get first quiz date
    const firstQuiz = await prisma.quizSession.findFirst({
        where: { visitorId },
        orderBy: { completedAt: 'asc' },
    });

    // Get perfect quiz date
    const perfectQuizRecord = await prisma.$queryRaw<{ completedAt: Date }[]>`
        SELECT "completedAt" FROM "QuizSession" 
        WHERE "visitorId" = ${visitorId} AND "correctAnswers" = "totalQuestions"
        ORDER BY "completedAt" ASC LIMIT 1
    `.catch(() => []);

    // Badge definitions with earned status and dates
    interface BadgeInfo {
        id: string;
        earned: boolean;
        earnedAt?: string;
    }

    const badges: BadgeInfo[] = [
        {
            id: 'road_rookie',
            earned: userProgress.signsLearned >= 1,
            earnedAt: firstRecognition?.createdAt?.toISOString(),
        },
        {
            id: 'sharp_eyes',
            earned: userProgress.signsLearned >= 10,
            earnedAt: userProgress.signsLearned >= 10 ? userProgress.lastActiveAt?.toISOString() : undefined,
        },
        {
            id: 'sign_scholar',
            earned: userProgress.quizzesCompleted >= 1,
            earnedAt: firstQuiz?.completedAt?.toISOString(),
        },
        {
            id: 'quiz_champion',
            earned: hasPerfectQuiz,
            earnedAt: perfectQuizRecord[0]?.completedAt?.toISOString(),
        },
        {
            id: 'week_warrior',
            earned: userProgress.currentStreak >= 7,
            earnedAt: userProgress.currentStreak >= 7 ? userProgress.lastActiveAt?.toISOString() : undefined,
        },
        {
            id: 'category_conqueror',
            earned: allCategoriesTried,
            earnedAt: allCategoriesTried ? userProgress.lastActiveAt?.toISOString() : undefined,
        },
        {
            id: 'speed_demon',
            earned: hasSpeedyDay,
            earnedAt: hasSpeedyDay ? new Date().toISOString() : undefined,
        },
        {
            id: 'road_master',
            earned: userProgress.level >= 10,
            earnedAt: userProgress.level >= 10 ? userProgress.lastActiveAt?.toISOString() : undefined,
        },
    ];

    // Filter to earned badges for backward compatibility
    const earnedBadges = badges.filter(b => b.earned).map(b => b.id);

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
            categoryProgress: categoryMap,
            accuracy,
            earnedBadges,
            badges, // Full badge info with earned dates
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
