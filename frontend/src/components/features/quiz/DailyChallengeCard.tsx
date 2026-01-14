import { Flame, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyChallengeCardProps {
    onStart: () => void;
    completed?: boolean;
    loading?: boolean;
    score?: number;
}

export function DailyChallengeCard({ onStart, completed = false, loading = false, score }: DailyChallengeCardProps) {
    return (
        <motion.div
            whileHover={!completed ? { y: -5 } : undefined}
            className={`w-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden group ${!completed && !loading ? 'cursor-pointer' : ''}`}
            onClick={!completed && !loading ? onStart : undefined}
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-orange-500/20 transition-colors" />

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/30 flex items-center gap-1 font-medium">
                            <Flame className="w-3 h-3" /> DAILY CHALLENGE
                        </span>
                        {completed && (
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30 flex items-center gap-1 font-medium">
                                COMPLETED
                            </span>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Today's Gauntlet
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                        5 questions. Rising difficulty. Can you survive the Extreme round?
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>150 XP Potential</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Trophy className="w-4 h-4 text-purple-500" />
                            <span>Unique Badge</span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    {completed && score !== undefined ? (
                        <div className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex flex-col items-center justify-center shadow-lg">
                            <span className="text-sm text-green-400 font-medium">Score</span>
                            <span className="text-2xl font-bold text-white">{score}%</span>
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform">
                            <Flame className="w-10 h-10 text-white" />
                        </div>
                    )}
                </div>
            </div>

            {/* Locked Overlay if completed */}
            {completed && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-20 cursor-default">
                    <div className="bg-surface border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 shadow-xl">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold text-white">
                            {score !== undefined ? `You scored ${score}% today!` : 'Challenge Conquered'}
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
