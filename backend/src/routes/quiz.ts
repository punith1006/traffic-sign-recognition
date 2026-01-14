import { Router } from 'express';
import prisma from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate a new quiz
router.get('/generate', async (req, res) => {
    const { count = '10' } = req.query;
    const questionCount = Math.min(parseInt(count as string), 20);

    // 1. Get all question IDs first for true randomization
    const allQuestions = await prisma.quizQuestion.findMany({
        select: { id: true }
    });

    // 2. Shuffle IDs and pick N
    const shuffledIds = allQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);
    const selectedIds = shuffledIds.map(q => q.id);

    // 3. Fetch full details for selected questions
    const questions = await prisma.quizQuestion.findMany({
        where: { id: { in: selectedIds } },
        include: { sign: true },
    });

    const sessionId = uuidv4();

    // 4. Process questions: Shuffle options and track new correct index
    const processedQuestions = questions.map(q => {
        const originalOptions = JSON.parse(q.options) as string[];
        const originalCorrectAnswer = originalOptions[q.correctIndex];

        // Create options with original index to track correctness
        const optionsWithIndex = originalOptions.map((opt, idx) => ({
            text: opt,
            originalIndex: idx,
            isCorrect: idx === q.correctIndex
        }));

        // Shuffle options
        const shuffledOptions = optionsWithIndex.sort(() => Math.random() - 0.5);

        // Find new correct index
        const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

        return {
            id: q.id,
            signImageUrl: q.sign.imageUrl,
            questionText: q.questionText,
            options: shuffledOptions.map(o => o.text),
            correctIndex: newCorrectIndex, // Send this to frontend for immediate feedback
            difficulty: q.difficulty,
        };
    });

    res.json({
        success: true,
        sessionId,
        questions: processedQuestions,
        totalQuestions: processedQuestions.length,
    });
});

// Generate daily challenge (2 Easy, 2 Mid, 1 Hard)
router.get('/daily', async (req, res) => {
    try {
        // Fetch 2 Random Easy (Difficulty 1)
        const easyQuestions = await prisma.quizQuestion.findMany({
            where: { difficulty: 1 },
            select: { id: true }
        });
        const selectedEasy = easyQuestions.sort(() => Math.random() - 0.5).slice(0, 2);

        // Fetch 2 Random Medium (Difficulty 2)
        const mediumQuestions = await prisma.quizQuestion.findMany({
            where: { difficulty: 2 },
            select: { id: true }
        });
        const selectedMedium = mediumQuestions.sort(() => Math.random() - 0.5).slice(0, 2);

        // Fetch 1 Random Hard (Difficulty 3)
        const hardQuestions = await prisma.quizQuestion.findMany({
            where: { difficulty: 3 },
            select: { id: true }
        });
        const selectedHard = hardQuestions.sort(() => Math.random() - 0.5).slice(0, 1);

        // Combine IDs
        const allSelectedIds = [
            ...selectedEasy.map(q => q.id),
            ...selectedMedium.map(q => q.id),
            ...selectedHard.map(q => q.id)
        ];

        // Fetch full details
        const questions = await prisma.quizQuestion.findMany({
            where: { id: { in: allSelectedIds } },
            include: { sign: true },
        });

        const sessionId = uuidv4();

        // Process questions (Shuffle options & set correctIndex)
        const processedQuestions = questions.map(q => {
            const originalOptions = JSON.parse(q.options) as string[];

            // Create options with original index tracking
            const optionsWithIndex = originalOptions.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === q.correctIndex
            }));

            // Shuffle options
            const shuffledOptions = optionsWithIndex.sort(() => Math.random() - 0.5);
            const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

            return {
                id: q.id,
                signImageUrl: q.sign.imageUrl,
                questionText: q.questionText,
                options: shuffledOptions.map(o => o.text),
                correctIndex: newCorrectIndex,
                difficulty: q.difficulty,
            };
        });

        res.json({
            success: true,
            sessionId,
            questions: processedQuestions,
            isDaily: true
        });

    } catch (error) {
        console.error('Daily challenge error:', error);
        res.status(500).json({ success: false, message: 'Failed to generate daily challenge' });
    }
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
