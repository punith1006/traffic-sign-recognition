"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Trophy, Sparkles, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/Progress";
import { quizAPI, QuizQuestion } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type QuizState = "intro" | "loading" | "playing" | "result";

export default function QuizPage() {
    const { refreshStats, isAuthenticated, guestLogin } = useAuth();
    const [quizState, setQuizState] = useState<QuizState>("intro");
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [currentExplanation, setCurrentExplanation] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [result, setResult] = useState<{ accuracy: number; xpEarned: number; leveledUp: boolean } | null>(null);

    const question = questions[currentQuestion];
    const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    const startQuiz = async () => {
        setQuizState("loading");

        try {
            // Ensure user is logged in
            if (!isAuthenticated) {
                await guestLogin();
            }

            // Fetch questions
            const fetchedQuestions = await quizAPI.getQuestions({ count: 5 });

            if (fetchedQuestions.length === 0) {
                alert("No questions available. Please try again later.");
                setQuizState("intro");
                return;
            }

            // Start session
            const session = await quizAPI.startSession({ type: "daily", questionCount: fetchedQuestions.length });

            setQuestions(fetchedQuestions);
            setSessionId(session.sessionId);
            setQuizState("playing");
        } catch (error) {
            console.error("Failed to start quiz:", error);
            alert("Failed to start quiz. Please try again.");
            setQuizState("intro");
        }
    };

    const handleAnswerSelect = async (index: number) => {
        if (selectedAnswer !== null || !sessionId || !question) return;

        setSelectedAnswer(index);

        try {
            const response = await quizAPI.submitAnswer({
                sessionId,
                questionId: question.id,
                selectedAnswer: index,
            });

            setIsCorrect(response.isCorrect);
            setCurrentExplanation(response.explanation);
            setAnswers([...answers, response.isCorrect]);
            if (response.isCorrect) setScore(s => s + 1);
            setShowExplanation(true);
        } catch (error) {
            console.error("Failed to submit answer:", error);
        }
    };

    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setCurrentExplanation("");
        } else {
            // Complete quiz
            try {
                if (sessionId) {
                    const quizResult = await quizAPI.completeSession(sessionId);
                    setResult({
                        accuracy: quizResult.accuracy,
                        xpEarned: quizResult.xpEarned,
                        leveledUp: quizResult.leveledUp,
                    });
                    await refreshStats();
                }
            } catch (error) {
                console.error("Failed to complete quiz:", error);
            }
            setQuizState("result");
        }
    };

    const restartQuiz = () => {
        setQuizState("intro");
        setQuestions([]);
        setSessionId(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setCurrentExplanation("");
        setScore(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64">
                <div className="max-w-2xl mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {quizState === "intro" && (
                            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#00F5D4] flex items-center justify-center">
                                    <Trophy className="w-12 h-12 text-[#0A1128]" />
                                </div>
                                <Badge variant="info" className="mb-4">Daily Challenge</Badge>
                                <h1 className="font-bold text-3xl text-white mb-3">Ready for a Quiz?</h1>
                                <p className="text-[#B4BCC8] mb-8 max-w-md mx-auto">Answer 5 questions to test your knowledge and earn XP!</p>
                                <div className="flex flex-wrap gap-4 justify-center mb-8">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2238]"><span className="text-2xl">⏱️</span><span className="text-[#B4BCC8]">~2 min</span></div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2238]"><span className="text-2xl">❓</span><span className="text-[#B4BCC8]">5 questions</span></div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2238]"><Sparkles className="w-5 h-5 text-[#00F5D4]" /><span className="text-[#B4BCC8]">Up to 100 XP</span></div>
                                </div>
                                <Button size="lg" onClick={startQuiz} rightIcon={<ArrowRight className="w-5 h-5" />}>Start Quiz</Button>
                            </motion.div>
                        )}

                        {quizState === "loading" && (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#00D9FF] border-t-transparent animate-spin" />
                                <p className="text-[#B4BCC8]">Loading questions...</p>
                            </motion.div>
                        )}

                        {quizState === "playing" && question && (
                            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-[#B4BCC8]">Question {currentQuestion + 1} of {questions.length}</span>
                                        <Badge>{score} correct</Badge>
                                    </div>
                                    <ProgressBar value={progress} size="md" />
                                </div>

                                <Card className="mb-6">
                                    <CardContent>
                                        <div className="aspect-video max-h-48 rounded-xl bg-[#283048] p-4 flex items-center justify-center mb-6">
                                            <img src={question.signImageUrl} alt="Sign" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <h2 className="font-semibold text-xl text-white mb-6 text-center">{question.questionText}</h2>
                                        <div className="space-y-3">
                                            {question.options.map((option, index) => {
                                                const isSelected = selectedAnswer === index;
                                                const showResult = selectedAnswer !== null;
                                                // We need to determine if this is the correct answer
                                                const isCorrectOption = showResult && isCorrect && isSelected;
                                                const isWrongSelected = showResult && !isCorrect && isSelected;

                                                let style = "border-[#3D4C63] bg-[#1A2238]";
                                                if (showResult) {
                                                    if (isCorrectOption) style = "border-[#00F5A0] bg-[#00F5A0]/10";
                                                    else if (isWrongSelected) style = "border-[#FF6B93] bg-[#FF6B93]/10";
                                                } else if (isSelected) style = "border-[#00D9FF] bg-[#00D9FF]/10";

                                                return (
                                                    <motion.button key={index} onClick={() => handleAnswerSelect(index)} disabled={selectedAnswer !== null}
                                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${style} ${!showResult && "hover:border-[#00D9FF]/50"}`} whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}>
                                                        <div className="flex items-center justify-between">
                                                            <span className={isCorrectOption ? "text-[#00F5A0]" : isWrongSelected ? "text-[#FF6B93]" : "text-white"}>{option}</span>
                                                            {isCorrectOption && <Check className="w-5 h-5 text-[#00F5A0]" />}
                                                            {isWrongSelected && <X className="w-5 h-5 text-[#FF6B93]" />}
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>

                                <AnimatePresence>
                                    {showExplanation && (
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                                            <Card className={`mb-6 border ${isCorrect ? "border-[#00F5A0]" : "border-[#FF6B93]"}`}>
                                                <CardContent>
                                                    <div className="flex items-start gap-3">
                                                        <div className={`p-2 rounded-full ${isCorrect ? "bg-[#00F5A0]/10" : "bg-[#FF6B93]/10"}`}>
                                                            {isCorrect ? <Check className="w-5 h-5 text-[#00F5A0]" /> : <X className="w-5 h-5 text-[#FF6B93]" />}
                                                        </div>
                                                        <div>
                                                            <h4 className={`font-semibold mb-1 ${isCorrect ? "text-[#00F5A0]" : "text-[#FF6B93]"}`}>{isCorrect ? "Correct!" : "Incorrect"}</h4>
                                                            <p className="text-sm text-[#B4BCC8]">{currentExplanation}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <div className="text-center">
                                                <Button onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>{currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}</Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {quizState === "result" && (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                <div className="text-6xl mb-6">{(result?.accuracy || 0) >= 80 ? "🎉" : (result?.accuracy || 0) >= 50 ? "👍" : "📚"}</div>
                                <h1 className="font-bold text-3xl text-white mb-2">Quiz Complete!</h1>
                                <p className="text-[#B4BCC8] mb-8">Here&apos;s how you did:</p>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <Card className="text-center"><CardContent><p className="text-3xl font-mono font-bold text-white">{score}/{questions.length}</p><p className="text-sm text-[#B4BCC8]">Correct</p></CardContent></Card>
                                    <Card className="text-center"><CardContent><p className={`text-3xl font-mono font-bold ${(result?.accuracy || 0) >= 80 ? "text-[#00F5A0]" : (result?.accuracy || 0) >= 50 ? "text-[#FFC43D]" : "text-[#FF6B93]"}`}>{result?.accuracy || 0}%</p><p className="text-sm text-[#B4BCC8]">Accuracy</p></CardContent></Card>
                                    <Card className="text-center bg-gradient-to-br from-[#00F5D4]/10 to-[#00D9FF]/10"><CardContent><p className="text-3xl font-mono font-bold text-[#00F5D4]">+{result?.xpEarned || 0}</p><p className="text-sm text-[#B4BCC8]">XP Earned</p></CardContent></Card>
                                </div>
                                {result?.leveledUp && (
                                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#00D9FF]/20 to-[#00F5D4]/20 border border-[#00D9FF]/50">
                                        <p className="text-lg font-semibold text-[#00D9FF]">🎉 Level Up!</p>
                                    </div>
                                )}
                                <div className="flex justify-center gap-2 mb-8">
                                    {answers.map((correct, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${correct ? "bg-[#00F5A0]" : "bg-[#FF6B93]"}`}>
                                            {correct ? <Check className="w-4 h-4 text-[#0A1128]" /> : <X className="w-4 h-4 text-white" />}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button onClick={restartQuiz} leftIcon={<RotateCcw className="w-4 h-4" />}>Try Again</Button>
                                    <Link href="/"><Button variant="secondary" leftIcon={<Home className="w-4 h-4" />}>Back to Home</Button></Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
