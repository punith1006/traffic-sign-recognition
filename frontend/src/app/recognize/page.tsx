'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles, Trophy, Target, BookOpen, Flame, Zap, ArrowRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from '@/components/features/upload/ImageUploader';
import { RecognitionResult } from '@/components/features/upload/RecognitionResult';
import { recognizeSign, getProgress, type RecognitionResult as RecognitionResultType, type UserProgress } from '@/lib/api';

export default function RecognizePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RecognitionResultType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        async function loadProgress() {
            try {
                const data = await getProgress();
                setProgress(data.progress);
            } catch (err) {
                console.error('Failed to load progress', err);
            }
        }
        loadProgress();
    }, []);

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);

        try {
            const response = await recognizeSign(file);
            setResult(response);

            if (!response.success && response.message) {
                setError(response.message);
                // Don't revoke URL immediately on error so user can see what they uploaded if needed, 
                // but usually we might want to keep it or clear it. 
                // For now, keeping it consistent with previous logic but conditional UI will handle display.
            } else if (response.success) {
                // Refresh progress after successful recognition
                const data = await getProgress();
                setProgress(data.progress);
            }
        } catch (err) {
            setError('Failed to analyze image. Please check if the backend is running.');
            console.error('Recognition error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
        }
        setResult(null);
        setError(null);
        setUploadedImageUrl(null);
    };

    // Calculate level progress percentage
    const levelProgressPercent = progress
        ? Math.min(100, Math.round((progress.xpProgress / progress.xpForNextLevel) * 100))
        : 0;

    return (
        <div className="py-8">
            {/* Recognition Result Modal */}
            {result?.success && result.recognition && uploadedImageUrl && (
                <RecognitionResult
                    sign={result.recognition.sign}
                    confidence={result.recognition.confidence}
                    xpEarned={result.recognition.xpEarned}
                    bbox={result.recognition.bbox}
                    imageUrl={uploadedImageUrl}
                    onClose={handleReset}
                />
            )}

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2"
                        style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
                        <Sparkles className="w-3 h-3" style={{ color: '#00D9FF' }} />
                        <span className="text-xs font-medium" style={{ color: '#00D9FF' }}>AI-Powered Recognition</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        Learn Traffic Signs with AI
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Upload any traffic sign photo and get instant recognition, educational content, and quiz yourself to master road safety.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left Column: Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded bg-cyan-500/10 text-cyan-400 text-xs font-bold">1</div>
                        <h2 className="text-lg font-semibold text-white">Upload a Traffic Sign</h2>
                    </div>

                    <div
                        className="rounded-3xl p-8 transition-all duration-300"
                        style={{
                            background: '#0F1629',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div className="relative">
                            <ImageUploader onUpload={handleUpload} isLoading={isLoading} />
                        </div>
                    </div>

                    {/* Conditional Error Message - Matches reference placement */}
                    {/* Conditional: Error Message OR Tips */}
                    {error ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="rounded-xl p-4 overflow-hidden"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}
                        >
                            <h3 className="text-red-400 font-semibold mb-1">Detection Failed</h3>
                            <p className="text-red-400/80 text-sm mb-2">
                                No traffic signs detected in the image. Try uploading a clearer image.
                            </p>
                            <ul className="text-red-400/70 text-xs list-disc list-inside space-y-1 ml-1">
                                <li>Make sure the traffic sign is clearly visible</li>
                                <li>Try a photo with better lighting</li>
                                <li>Ensure the sign is not too far away</li>
                            </ul>
                        </motion.div>
                    ) : (
                        <div className="rounded-xl p-4 bg-cyan-500/5 border border-cyan-500/10">
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-white mb-1">
                                        Tips for best results
                                    </p>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li>• Make sure the traffic sign is clearly visible</li>
                                        <li>• Use good lighting conditions</li>
                                        <li>• Center the sign in the frame</li>
                                        <li>• Avoid blurry or low-resolution images</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Right Column: Progress Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-2">Your Progress</h2>

                    {/* Level Card */}
                    <div
                        className="rounded-2xl p-6"
                        style={{
                            background: '#111827',
                            border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                    <Trophy className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Level</p>
                                    <p className="text-2xl font-bold text-white">{progress?.level || 1}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 mb-1">Total XP</p>
                                <p className="text-xl font-bold text-cyan-400">{progress?.xp || 0}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Progress to Level {(progress?.level || 1) + 1}</span>
                                <span className="text-cyan-400 font-medium">{progress?.xpProgress || 0} / {progress?.xpForNextLevel || 100} XP</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-cyan-400 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${levelProgressPercent}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl p-3 text-center bg-[#111827] border border-white/5">
                            <div className="mx-auto w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                                <Target className="w-4 h-4 text-emerald-500" />
                            </div>
                            <p className="text-lg font-bold text-white">{progress?.signsLearned || 0}</p>
                            <p className="text-[10px] text-gray-400 leading-tight">Signs Learned</p>
                        </div>
                        <div className="rounded-xl p-3 text-center bg-[#111827] border border-white/5">
                            <div className="mx-auto w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                            </div>
                            <p className="text-lg font-bold text-white">{progress?.quizzesCompleted || 0}</p>
                            <p className="text-[10px] text-gray-400 leading-tight">Quizzes Done</p>
                        </div>
                        <div className="rounded-xl p-3 text-center bg-[#111827] border border-white/5">
                            <div className="mx-auto w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center mb-2">
                                <Flame className="w-4 h-4 text-pink-500" />
                            </div>
                            <p className="text-lg font-bold text-white">{progress?.currentStreak || 0}</p>
                            <p className="text-[10px] text-gray-400 leading-tight">Day Streak</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/library"
                            className="group p-4 rounded-xl bg-[#111827] border border-white/5 hover:border-cyan-500/30 transition-all"
                        >
                            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">Sign Library</h3>
                            <p className="text-xs text-gray-400 mb-3">Browse all traffic signs</p>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link
                            href="/quiz"
                            className="group p-4 rounded-xl bg-[#111827] border border-white/5 hover:border-cyan-500/30 transition-all"
                        >
                            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">Take Quiz</h3>
                            <p className="text-xs text-gray-400 mb-3">Test your knowledge</p>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
