'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, TrendingUp, Loader2 } from 'lucide-react';
import { getProgress, type UserProgress } from '@/lib/api';

export function ProgressDashboard() {
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

    if (loading) {
        return (
            <div className="card flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!progress) {
        return null;
    }

    const xpProgressPercent = Math.round((progress.xpProgress / progress.xpForNextLevel) * 100);

    return (
        <div className="space-y-4">
            {/* XP and Level Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                            <Trophy className="w-6 h-6 text-background" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Level</p>
                            <p className="text-2xl font-heading font-bold text-white">
                                {progress.level}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Total XP</p>
                        <p className="text-2xl font-heading font-bold gradient-text">
                            {progress.xp}
                        </p>
                    </div>
                </div>

                {/* XP Progress Bar */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress to Level {progress.level + 1}</span>
                        <span className="text-primary">{progress.xpProgress} / {progress.xpForNextLevel} XP</span>
                    </div>
                    <div className="h-3 bg-surface-elevated rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${xpProgressPercent}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card text-center"
                >
                    <Target className="w-6 h-6 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{progress.signsLearned}</p>
                    <p className="text-xs text-gray-400">Signs Learned</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card text-center"
                >
                    <Zap className="w-6 h-6 text-warning mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{progress.quizzesCompleted}</p>
                    <p className="text-xs text-gray-400">Quizzes Done</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="card text-center"
                >
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{progress.currentStreak}</p>
                    <p className="text-xs text-gray-400">Day Streak</p>
                </motion.div>
            </div>
        </div>
    );
}
