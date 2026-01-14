'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Share2, Target, Eye, BookOpen, Trophy, Flame,
    Compass, Zap, Crown, Lock, Calendar
} from 'lucide-react';

// Badge definitions with metadata
export const BADGE_DEFINITIONS = {
    road_rookie: {
        id: 'road_rookie',
        name: 'Road Rookie',
        icon: Target,
        color: '#10B981', // Emerald
        bgColor: 'rgba(16, 185, 129, 0.15)',
        description: 'Took your first step on the road to mastery! Every expert was once a beginner.',
        requirement: 'Recognize your first traffic sign',
    },
    sharp_eyes: {
        id: 'sharp_eyes',
        name: 'Sharp Eyes',
        icon: Eye,
        color: '#8B5CF6', // Purple
        bgColor: 'rgba(139, 92, 246, 0.15)',
        description: 'Your attention to detail is impressive! You can spot signs from miles away.',
        requirement: 'Recognize 20 unique traffic signs',
    },
    sign_scholar: {
        id: 'sign_scholar',
        name: 'Sign Scholar',
        icon: BookOpen,
        color: '#3B82F6', // Blue
        bgColor: 'rgba(59, 130, 246, 0.15)',
        description: 'Knowledge is power on the road. You\'ve proven your dedication to learning.',
        requirement: 'Complete your first quiz',
    },
    quiz_champion: {
        id: 'quiz_champion',
        name: 'Quiz Champion',
        icon: Trophy,
        color: '#F59E0B', // Amber
        bgColor: 'rgba(245, 158, 11, 0.15)',
        description: 'Flawless victory! Your knowledge is unmatched. A true traffic sign master.',
        requirement: 'Score 100% on any quiz',
    },
    week_warrior: {
        id: 'week_warrior',
        name: 'Week Warrior',
        icon: Flame,
        color: '#EF4444', // Red
        bgColor: 'rgba(239, 68, 68, 0.15)',
        description: 'Consistency is key! A full week of dedication shows true commitment.',
        requirement: 'Maintain a 7-day learning streak',
    },
    category_conqueror: {
        id: 'category_conqueror',
        name: 'Category Conqueror',
        icon: Compass,
        color: '#06B6D4', // Cyan
        bgColor: 'rgba(6, 182, 212, 0.15)',
        description: 'Well-rounded knowledge! You\'ve explored all corners of traffic sign education.',
        requirement: 'Recognize signs from all 4 categories',
    },
    speed_demon: {
        id: 'speed_demon',
        name: 'Speed Demon',
        icon: Zap,
        color: '#FBBF24', // Yellow
        bgColor: 'rgba(251, 191, 36, 0.15)',
        description: 'Lightning fast! 5 signs in one day shows incredible focus and dedication.',
        requirement: 'Recognize 5 signs in a single day',
    },
    road_master: {
        id: 'road_master',
        name: 'Road Master',
        icon: Crown,
        color: '#EC4899', // Pink
        bgColor: 'rgba(236, 72, 153, 0.15)',
        description: 'The ultimate achievement! You are now a true master of road safety.',
        requirement: 'Reach Level 10',
    },
};

export type BadgeId = keyof typeof BADGE_DEFINITIONS;

interface BadgeData {
    id: string;
    earned: boolean;
    earnedAt?: string;
}

interface BadgeGridProps {
    badges: BadgeData[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
    const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

    const earnedCount = badges.filter(b => b.earned).length;

    const handleBadgeClick = (badge: BadgeData) => {
        if (badge.earned) {
            setSelectedBadge(badge);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleShare = () => {
        // Mock share functionality
        alert('Share feature coming soon! 🎉');
    };

    return (
        <>
            {/* Badge Grid */}
            <div
                className="rounded-2xl p-6"
                style={{
                    background: '#111827',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-white">Badges</h2>
                    <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                        {earnedCount}/8
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {Object.values(BADGE_DEFINITIONS).map((badgeDef) => {
                        const badgeData = badges.find(b => b.id === badgeDef.id);
                        const isEarned = badgeData?.earned || false;
                        const Icon = isEarned ? badgeDef.icon : Lock;

                        return (
                            <motion.div
                                key={badgeDef.id}
                                whileHover={isEarned ? { scale: 1.05 } : undefined}
                                whileTap={isEarned ? { scale: 0.95 } : undefined}
                                onClick={() => isEarned && handleBadgeClick(badgeData!)}
                                className="aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200"
                                style={{
                                    background: isEarned ? badgeDef.bgColor : '#1E293B',
                                    border: isEarned
                                        ? `1px solid ${badgeDef.color}40`
                                        : '1px solid rgba(255, 255, 255, 0.05)',
                                    cursor: isEarned ? 'pointer' : 'default',
                                }}
                                title={isEarned ? `${badgeDef.name} - Click to view` : badgeDef.requirement}
                            >
                                <Icon
                                    className="w-6 h-6 mb-1"
                                    style={{ color: isEarned ? badgeDef.color : '#374151' }}
                                />
                                {isEarned && (
                                    <span
                                        className="text-[10px] font-medium text-center px-1 truncate w-full"
                                        style={{ color: badgeDef.color }}
                                    >
                                        {badgeDef.name.split(' ')[0]}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Badge Detail Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                        onClick={() => setSelectedBadge(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="rounded-3xl p-8 max-w-sm w-full relative"
                            style={{
                                background: 'linear-gradient(135deg, #1A2744 0%, #111827 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedBadge(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {/* Badge Icon */}
                            {(() => {
                                const def = BADGE_DEFINITIONS[selectedBadge.id as BadgeId];
                                const BadgeIcon = def?.icon || Trophy;
                                return (
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                                            className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                                            style={{
                                                background: def?.bgColor,
                                                boxShadow: `0 0 40px ${def?.color}30`
                                            }}
                                        >
                                            <BadgeIcon
                                                className="w-12 h-12"
                                                style={{ color: def?.color }}
                                            />
                                        </motion.div>

                                        {/* Badge Name */}
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl font-bold text-white mb-2"
                                        >
                                            {def?.name}
                                        </motion.h3>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 }}
                                            className="text-sm mb-4"
                                            style={{ color: '#94A3B8' }}
                                        >
                                            {def?.description}
                                        </motion.p>

                                        {/* Requirement */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="inline-block px-4 py-2 rounded-full text-xs font-medium mb-6"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                color: '#64748B'
                                            }}
                                        >
                                            ✓ {def?.requirement}
                                        </motion.div>

                                        {/* Earned Date */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.35 }}
                                            className="flex items-center justify-center gap-2 mb-6"
                                        >
                                            <Calendar className="w-4 h-4" style={{ color: '#64748B' }} />
                                            <span className="text-sm" style={{ color: '#94A3B8' }}>
                                                Earned on {formatDate(selectedBadge.earnedAt)}
                                            </span>
                                        </motion.div>

                                        {/* Share Button */}
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            onClick={handleShare}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                                            style={{
                                                background: def?.color,
                                                color: '#0A1128'
                                            }}
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share Achievement
                                        </motion.button>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
