'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, XCircle, Trophy, RotateCcw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { startOfDay } from 'date-fns';
import { DailyChallengeCard } from '@/components/features/quiz/DailyChallengeCard';
import { generateQuiz, submitQuiz, generateDailyQuiz, type QuizQuestion } from '@/lib/api';

type QuizState = 'start' | 'playing' | 'result';

export default function QuizPage() {
    const [state, setState] = useState<QuizState>('start');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [sessionId, setSessionId] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number }[]>([]);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isDaily, setIsDaily] = useState(false);

    // Check if daily challenge is already done today
    const [dailyCompleted, setDailyCompleted] = useState(false);
    const [dailyScore, setDailyScore] = useState<number | undefined>(undefined);

    useEffect(() => {
        const lastDaily = localStorage.getItem('last_daily_completed');
        const lastScore = localStorage.getItem('last_daily_score');

        if (lastDaily) {
            const today = startOfDay(new Date()).toISOString();
            if (lastDaily === today) {
                setDailyCompleted(true);
                if (lastScore) setDailyScore(parseInt(lastScore));
            }
        }
    }, []);

    const startQuiz = async () => {
        setLoading(true);
        setIsDaily(false);
        try {
            const data = await generateQuiz(10);
            setQuestions(data.questions || []);
            setSessionId(data.sessionId);
            setCurrentIndex(0);
            setAnswers([]);
            setResult(null);
            setState('playing');
        } catch (error) {
            console.error('Failed to generate quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    const startDailyChallenge = async () => {
        setLoading(true);
        setIsDaily(true);
        try {
            const data = await generateDailyQuiz();
            setQuestions(data.questions || []);
            setSessionId(data.sessionId);
            setCurrentIndex(0);
            setAnswers([]);
            setResult(null);
            setState('playing');
        } catch (error) {
            console.error('Failed to generate daily quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = async (selectedIndex: number) => {
        if (showFeedback) return;

        setSelectedAnswer(selectedIndex);
        setShowFeedback(true);

        const currentQuestion = questions[currentIndex];
        const newAnswers = [...answers, { questionId: currentQuestion.id, selectedIndex }];
        setAnswers(newAnswers);

        // Wait for feedback animation
        setTimeout(async () => {
            setShowFeedback(false);
            setSelectedAnswer(null);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // Quiz complete - submit answers
                setLoading(true);
                try {
                    const resultData = await submitQuiz(sessionId, newAnswers);
                    setResult(resultData);
                    setState('result');

                    if (isDaily) {
                        const today = startOfDay(new Date()).toISOString();
                        localStorage.setItem('last_daily_completed', today);
                        localStorage.setItem('last_daily_score', resultData.results.accuracy.toString());
                        setDailyCompleted(true);
                        setDailyScore(resultData.results.accuracy);
                    }
                } catch (error) {
                    console.error('Failed to submit quiz:', error);
                } finally {
                    setLoading(false);
                }
            }
        }, 1500);
    };

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return (
        <div className="py-8 max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
                {/* Start Screen */}
                {state === 'start' && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-4"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                            <Trophy className="w-8 h-8 text-background" />
                        </div>
                        <h1 className="text-3xl font-heading font-bold text-white mb-3">
                            Traffic Sign Quiz
                        </h1>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Test your knowledge. Earn XP. Level Up.
                        </p>

                        <DailyChallengeCard
                            onStart={startDailyChallenge}
                            completed={dailyCompleted}
                            loading={loading}
                            score={dailyScore}
                        />

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-gray-500">OR</span>
                            </div>
                        </div>

                        <button
                            onClick={startQuiz}
                            disabled={loading}
                            className="btn-secondary w-full py-4 inline-flex items-center justify-center gap-2"
                        >
                            {loading && !isDaily ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Play className="w-5 h-5" />
                            )}
                            Start Regular Practice (10 Questions)
                        </button>
                    </motion.div>
                )}

                {/* Playing Screen */}
                {state === 'playing' && currentQuestion && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Question {currentIndex + 1} of {questions.length}</span>
                                <span className="text-primary font-medium">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-surface rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card mb-6"
                        >
                            {/* Sign Image */}
                            <div className="w-48 h-48 mx-auto mb-6 bg-surface-elevated rounded-xl flex items-center justify-center overflow-hidden">
                                {currentQuestion.signImageUrl && currentQuestion.signImageUrl.startsWith('/') ? (
                                    <img
                                        src={currentQuestion.signImageUrl}
                                        alt="Traffic Sign"
                                        className="w-40 h-40 object-contain"
                                    />
                                ) : (
                                    <span className="text-6xl">🚸</span>
                                )}
                            </div>

                            {/* Question */}
                            <h2 className="text-xl font-semibold text-white text-center mb-6">
                                {currentQuestion.questionText}
                            </h2>

                            {/* Answer Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => {
                                    let buttonClass = 'w-full p-4 rounded-xl border text-left transition-all ';

                                    if (showFeedback) {
                                        if (index === currentQuestion.correctIndex) {
                                            // Show correct answer
                                            buttonClass += 'border-success bg-success/10 text-success';
                                        } else if (index === selectedAnswer) {
                                            buttonClass += 'border-error bg-error/10 text-error';
                                        } else {
                                            buttonClass += 'border-white/10 bg-surface text-gray-400';
                                        }
                                    } else {
                                        buttonClass += 'border-white/10 bg-surface text-white hover:border-primary/50 hover:bg-primary/5';
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            disabled={showFeedback}
                                            className={buttonClass}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-surface-elevated rounded-lg flex items-center justify-center text-sm font-medium">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span>{option}</span>
                                                {showFeedback && index === currentQuestion.correctIndex && (
                                                    <CheckCircle className="w-5 h-5 ml-auto text-success" />
                                                )}
                                                {showFeedback && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                                                    <XCircle className="w-5 h-5 ml-auto text-error" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Result Screen */}
                {state === 'result' && result && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                        >
                            <Trophy className="w-12 h-12 text-background" />
                        </motion.div>

                        <h1 className="text-3xl font-heading font-bold text-white mb-2">
                            Quiz Complete!
                        </h1>
                        <p className="text-gray-400 mb-8">
                            You scored <span className="text-primary font-bold">{result.results.accuracy}%</span> and earned <span className="text-yellow-500 font-bold">+{result.results.xpEarned} XP</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-surface-elevated p-4 rounded-xl">
                                <div className="text-2xl font-bold text-success mb-1">
                                    {result.results.correct}
                                </div>
                                <div className="text-sm text-gray-400">Correct</div>
                            </div>
                            <div className="bg-surface-elevated p-4 rounded-xl">
                                <div className="text-2xl font-bold text-white mb-1">
                                    {result.results.total}
                                </div>
                                <div className="text-sm text-gray-400">Total</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {!isDaily && (
                                <button
                                    onClick={() => {
                                        setState('start');
                                        setQuestions([]);
                                    }}
                                    className="btn-primary w-full inline-flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Try Again
                                </button>
                            )}

                            <Link
                                href="/"
                                className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading Overlay */}
            {loading && state === 'playing' && (
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
            )}
        </div>
    );
}
