'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, Upload, BookOpen, Zap, Flame, Target, TrendingUp,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { getProgress, type UserProgress } from '@/lib/api';
import { BadgeGrid } from '@/components/features/badges/BadgeGrid';

export default function HomePage() {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProgress() {
            try {
                const data = await getProgress();
                setProgress(data.progress);
            } catch (error) {
                console.error('Failed to load progress:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProgress();
    }, []);

    const xpProgressPercent = progress
        ? Math.round((progress.xpProgress / progress.xpForNextLevel) * 100)
        : 0;

    // Category progress from API (with fallback defaults)
    const catData = progress?.categoryProgress;
    const categoryProgressData = [
        { name: 'REGULATORY', color: '#FF4B6E', bgColor: 'rgba(255,75,110,0.15)', learned: catData?.regulatory?.learned || 0, total: catData?.regulatory?.total || 18 },
        { name: 'WARNING', color: '#FFB800', bgColor: 'rgba(255,184,0,0.15)', learned: catData?.warning?.learned || 0, total: catData?.warning?.total || 12 },
        { name: 'GUIDE', color: '#00D97E', bgColor: 'rgba(0,217,126,0.15)', learned: catData?.guide?.learned || 0, total: catData?.guide?.total || 2 },
        { name: 'CONSTRUCTION', color: '#FF8C42', bgColor: 'rgba(255,140,66,0.15)', learned: catData?.construction?.learned || 0, total: catData?.construction?.total || 1 },
    ];

    // Use accuracy from API (calculated from quiz sessions)
    const accuracy = progress?.accuracy || 0;

    return (
        <div className="py-8 space-y-6">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl p-8 md:p-10"
                style={{
                    background: 'linear-gradient(135deg, #0F1629 0%, #1A2744 50%, #0F1629 100%)',
                    border: '1px solid rgba(0, 217, 255, 0.1)',
                }}
            >
                {/* Decorative glow */}
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #00D9FF 0%, transparent 70%)' }}
                />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                        style={{ background: 'rgba(0, 217, 255, 0.15)', border: '1px solid rgba(0, 217, 255, 0.3)' }}>
                        <Sparkles className="w-4 h-4" style={{ color: '#00D9FF' }} />
                        <span className="text-sm font-medium" style={{ color: '#00D9FF' }}>AI-Powered Learning</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                        Master Every Traffic Sign
                    </h1>
                    <p className="text-lg mb-8 max-w-xl" style={{ color: '#94A3B8' }}>
                        Upload any sign for instant AI recognition, or practice with adaptive quizzes.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/recognize"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            style={{ background: '#00D9FF', color: '#0A1128' }}
                        >
                            <Upload className="w-5 h-5" />
                            Upload Sign
                        </Link>
                        <Link
                            href="/quiz"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
                            style={{
                                background: 'rgba(0, 217, 255, 0.1)',
                                border: '1px solid rgba(0, 217, 255, 0.4)',
                                color: '#00D9FF'
                            }}
                        >
                            <BookOpen className="w-5 h-5" />
                            Daily Quiz
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Zap, value: progress?.xp || 0, label: 'Total XP', color: '#00D9FF', bg: 'rgba(0, 217, 255, 0.1)' },
                    { icon: Flame, value: progress?.currentStreak || 0, label: 'Day Streak', color: '#FF8C42', bg: 'rgba(255, 140, 66, 0.1)' },
                    { icon: Target, value: progress?.signsLearned || 0, label: 'Signs Mastered', color: '#00D97E', bg: 'rgba(0, 217, 126, 0.1)' },
                    { icon: TrendingUp, value: `${accuracy}%`, label: 'Accuracy', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.1)' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="rounded-2xl p-5 text-center"
                        style={{
                            background: '#111827',
                            border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                            style={{ background: stat.bg }}
                        >
                            <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm" style={{ color: '#64748B' }}>{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Level Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-white">Level Progress</h2>
                        <span
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ background: 'rgba(0, 217, 255, 0.15)', color: '#00D9FF' }}
                        >
                            Level {progress?.level || 1}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Circular Progress */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="#1E293B"
                                    strokeWidth="6"
                                    fill="none"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${xpProgressPercent * 2.01} 201`}
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00D9FF" />
                                        <stop offset="100%" stopColor="#00F5D4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-bold text-white">{xpProgressPercent}%</span>
                                <span className="text-xs" style={{ color: '#64748B' }}>to next</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm mb-2" style={{ color: '#94A3B8' }}>
                                {progress?.xpForNextLevel ? progress.xpForNextLevel - progress.xpProgress : 200} XP to Level {(progress?.level || 1) + 1}
                            </p>
                            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#1E293B' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgressPercent}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="h-full rounded-full"
                                    style={{ background: 'linear-gradient(90deg, #00D9FF, #00F5D4)' }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Daily Challenge */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.08) 0%, rgba(0, 245, 212, 0.08) 100%)',
                        border: '1px solid rgba(0, 217, 255, 0.2)'
                    }}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="p-3 rounded-xl flex-shrink-0"
                            style={{ background: 'rgba(0, 217, 255, 0.15)' }}
                        >
                            <Zap className="w-6 h-6" style={{ color: '#00D9FF' }} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-white mb-1">Daily Challenge</h2>
                            <p className="text-sm mb-4" style={{ color: '#94A3B8' }}>
                                Complete 5 questions to earn XP!
                            </p>
                            <Link
                                href="/quiz"
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                                style={{ background: '#00D9FF', color: '#0A1128' }}
                            >
                                Start Challenge
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Category Progress & Badges */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Category Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                >
                    <h2 className="text-lg font-semibold text-white mb-5">Category Progress</h2>
                    <div className="space-y-4">
                        {categoryProgressData.map((cat) => (
                            <div key={cat.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className="px-2.5 py-1 text-xs font-bold rounded"
                                        style={{ background: cat.bgColor, color: cat.color }}
                                    >
                                        {cat.name}
                                    </span>
                                    <span className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                                        {cat.learned}/{cat.total}
                                    </span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1E293B' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(cat.learned / cat.total) * 100}%` }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ background: cat.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                >
                    <BadgeGrid badges={progress?.badges || []} />
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Link
                    href="/library"
                    className="group rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                        background: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                Sign Library
                            </h3>
                            <p className="text-sm" style={{ color: '#64748B' }}>Browse all traffic signs</p>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#64748B' }} />
                    </div>
                </Link>

                <Link
                    href="/quiz"
                    className="group rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                        background: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                Take Quiz
                            </h3>
                            <p className="text-sm" style={{ color: '#64748B' }}>Test your knowledge</p>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#64748B' }} />
                    </div>
                </Link>
            </div>
        </div>
    );
}
