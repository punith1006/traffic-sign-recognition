import { Router } from 'express';
import prisma from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate a new quiz
router.get('/generate', async (req, res) => {
    const { count = '10' } = req.query;
    const questionCount = Math.min(parseInt(count as string), 20);

    // Get random quiz questions
    const questions = await prisma.quizQuestion.findMany({
        include: { sign: true },
        take: questionCount,
    });

    // Shuffle questions
    const shuffled = questions.sort(() => Math.random() - 0.5);

    const sessionId = uuidv4();

    res.json({
        success: true,
        sessionId,
        questions: shuffled.map(q => ({
            id: q.id,
            signImageUrl: q.sign.imageUrl,
            questionText: q.questionText,
            options: JSON.parse(q.options),
            difficulty: q.difficulty,
        })),
        totalQuestions: shuffled.length,
    });
});

// Submit quiz answers
router.post('/submit', async (req, res) => {
    const { sessionId, answers, visitorId = uuidv4() } = req.body;

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({
            success: false,
            message: 'Answers array is required',
        });
    }

    // Get the questions for validation
    const questionIds = answers.map((a: any) => a.questionId);
    const questions = await prisma.quizQuestion.findMany({
        where: { id: { in: questionIds } },
    });

    // Calculate results
    let correct = 0;
    const feedback = answers.map((answer: any) => {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) return { questionId: answer.questionId, correct: false, correctIndex: 0 };

        const isCorrect = answer.selectedIndex === question.correctIndex;
        if (isCorrect) correct++;

        return {
            questionId: answer.questionId,
            correct: isCorrect,
            correctIndex: question.correctIndex,
        };
    });

    const total = answers.length;
    const accuracy = Math.round((correct / total) * 100);

    // Calculate XP (5 per correct answer + bonus for accuracy)
    let xpEarned = correct * 5;
    if (accuracy >= 80) xpEarned += 20; // Bonus for high accuracy
    if (accuracy === 100) xpEarned += 30; // Perfect score bonus

    // Save quiz session
    await prisma.quizSession.create({
        data: {
            id: sessionId,
            visitorId,
            totalQuestions: total,
            correctAnswers: correct,
            xpEarned,
        },
    });

    // Update user progress
    let userProgress = await prisma.userProgress.findUnique({
        where: { visitorId },
    });

    if (!userProgress) {
        userProgress = await prisma.userProgress.create({
            data: {
                visitorId,
                xp: xpEarned,
                quizzesCompleted: 1,
                lastActiveAt: new Date(),
            },
        });
    } else {
        userProgress = await prisma.userProgress.update({
            where: { visitorId },
            data: {
                xp: { increment: xpEarned },
                quizzesCompleted: { increment: 1 },
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
        results: {
            correct,
            total,
            accuracy,
            xpEarned,
        },
        feedback,
        progress: {
            totalXp: userProgress.xp,
            level: newLevel,
            quizzesCompleted: userProgress.quizzesCompleted,
        },
    });
});

export default router;
