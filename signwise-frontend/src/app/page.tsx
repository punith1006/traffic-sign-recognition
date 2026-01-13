"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, BookOpen, Trophy, Target, Flame, Zap, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar, ProgressRing } from "@/components/ui/Progress";
import { useAuth } from "@/lib/auth-context";
import { signsAPI, userAPI, Sign, CategoryProgress } from "@/lib/api";

export default function HomePage() {
    const { stats, isAuthenticated, isLoading: authLoading } = useAuth();
    const [recentSigns, setRecentSigns] = useState<Sign[]>([]);
    const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const signs = await signsAPI.getAll({ limit: 4 });
                setRecentSigns(signs);

                if (isAuthenticated) {
                    const progress = await userAPI.getProgress();
                    setCategoryProgress(progress);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [isAuthenticated]);

    // Use real stats if available, otherwise defaults
    const displayStats = {
        xp: stats?.xp ?? 0,
        level: stats?.level ?? 1,
        streakDays: stats?.streakDays ?? 0,
        signsMastered: stats?.signsMastered ?? 0,
        totalSigns: stats?.totalSigns ?? 0,
        avgAccuracy: stats?.avgAccuracy ?? 0,
        xpToNextLevel: stats?.xpToNextLevel ?? 500,
        badges: stats?.badges ?? [],
    };

    // All badges including unearned
    const allBadges = [
        { id: "b1", name: "First Steps", iconUrl: "🎯", earned: displayStats.badges.some(b => b.name === "First Steps") },
        { id: "b2", name: "Sign Spotter", iconUrl: "📷", earned: displayStats.badges.some(b => b.name === "Sign Spotter") },
        { id: "b3", name: "Quiz Master", iconUrl: "🏆", earned: displayStats.badges.some(b => b.name === "Quiz Master") },
        { id: "b4", name: "Perfect Score", iconUrl: "⭐", earned: displayStats.badges.some(b => b.name === "Perfect Score") },
        { id: "b5", name: "Week Warrior", iconUrl: "🔥", earned: displayStats.badges.some(b => b.name === "Week Warrior") },
        { id: "b6", name: "Road Scholar", iconUrl: "🎓", earned: displayStats.badges.some(b => b.name === "Road Scholar") },
        { id: "b7", name: "Speed Demon", iconUrl: "⚡", earned: displayStats.badges.some(b => b.name === "Speed Demon") },
        { id: "b8", name: "Category King", iconUrl: "👑", earned: displayStats.badges.some(b => b.name === "Category King") },
    ];

    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Hero Section */}
                    <motion.section className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 border border-[#3D4C63]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00D9FF]/20 to-transparent rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <Badge variant="info" className="mb-4">
                                    <Sparkles className="w-3 h-3 mr-1" />AI-Powered Learning
                                </Badge>
                                <h1 className="font-bold text-3xl md:text-4xl text-white mb-3">Master Every Traffic Sign</h1>
                                <p className="text-[#B4BCC8] text-lg mb-6 max-w-xl">Upload any sign for instant AI recognition, or practice with adaptive quizzes.</p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/upload"><Button size="lg" leftIcon={<Upload className="w-5 h-5" />}>Upload Sign</Button></Link>
                                    <Link href="/quiz/daily"><Button variant="secondary" size="lg" leftIcon={<BookOpen className="w-5 h-5" />}>Daily Quiz</Button></Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Stats Overview */}
                    <motion.section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        {[
                            { icon: Zap, color: "#00D9FF", value: displayStats.xp, label: "Total XP" },
                            { icon: Flame, color: "#FF6B35", value: displayStats.streakDays, label: "Day Streak" },
                            { icon: Target, color: "#00F5D4", value: displayStats.signsMastered, label: "Signs Mastered" },
                            { icon: TrendingUp, color: "#B565D8", value: `${displayStats.avgAccuracy}%`, label: "Accuracy" },
                        ].map((stat) => (
                            <Card key={stat.label} variant="interactive" className="text-center">
                                <CardContent>
                                    <div className="flex justify-center mb-2">
                                        <div className="p-3 rounded-full" style={{ background: `${stat.color}15` }}>
                                            <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                        </div>
                                    </div>
                                    <p className="font-mono font-bold text-2xl text-white">{stat.value}</p>
                                    <p className="text-sm text-[#B4BCC8]">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.section>

                    {/* Main Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div className="md:col-span-2 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            {/* Level Progress */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center justify-between"><span>Level Progress</span><Badge variant="info" size="md">Level {displayStats.level}</Badge></CardTitle></CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-6">
                                        <ProgressRing value={displayStats.xp} max={displayStats.xp + displayStats.xpToNextLevel} size={100} label="to next" />
                                        <div className="flex-1">
                                            <p className="text-[#B4BCC8] mb-2">{displayStats.xpToNextLevel} XP to Level {displayStats.level + 1}</p>
                                            <ProgressBar value={displayStats.xp} max={displayStats.xp + displayStats.xpToNextLevel} size="lg" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Category Progress */}
                            {categoryProgress.length > 0 ? (
                                <Card>
                                    <CardHeader><CardTitle>Category Progress</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        {categoryProgress.map((cat) => (
                                            <div key={cat.category}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <Badge variant="category" category={cat.category as "WARNING" | "REGULATORY" | "GUIDE" | "CONSTRUCTION" | "RECREATION"}>{cat.category}</Badge>
                                                    <span className="text-sm text-[#B4BCC8]">{cat.mastered}/{cat.total}</span>
                                                </div>
                                                <ProgressBar value={cat.percentage} color={cat.percentage > 50 ? "success" : cat.percentage > 20 ? "warning" : "default"} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader><CardTitle>Category Progress</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-[#B4BCC8] text-center py-4">Start quizzes to track your progress!</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Recent Signs */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Recent Signs</span>
                                        <Link href="/library" className="text-sm text-[#00D9FF] hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square rounded-xl bg-[#283048] animate-pulse" />)}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {recentSigns.map((sign) => (
                                                <div key={sign.id} className="group cursor-pointer">
                                                    <div className="aspect-square rounded-xl bg-[#283048] p-4 flex items-center justify-center mb-2 group-hover:ring-2 ring-[#00D9FF] transition-all">
                                                        <img src={sign.imageUrl} alt={sign.name} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                    <p className="text-sm font-medium text-white truncate">{sign.name}</p>
                                                    <Badge variant="category" category={sign.category} size="sm">{sign.category}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            {/* Daily Challenge */}
                            <Card className="bg-gradient-to-br from-[#00D9FF]/10 to-[#00F5D4]/10 border border-[#00D9FF]/30">
                                <CardContent>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-full bg-[#00D9FF]/20"><Trophy className="w-6 h-6 text-[#00D9FF]" /></div>
                                        <div><h3 className="font-semibold text-white">Daily Challenge</h3><p className="text-sm text-[#B4BCC8]">Ready to play!</p></div>
                                    </div>
                                    <p className="text-sm text-[#B4BCC8] mb-4">Complete 5 questions to earn XP!</p>
                                    <Link href="/quiz/daily"><Button className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>Start Challenge</Button></Link>
                                </CardContent>
                            </Card>

                            {/* Badges */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center justify-between"><span>Badges</span><span className="text-sm text-[#B4BCC8]">{allBadges.filter(b => b.earned).length}/{allBadges.length}</span></CardTitle></CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-4 gap-3">
                                        {allBadges.map((badge) => (
                                            <div key={badge.id} className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${badge.earned ? "bg-[#283048]" : "bg-[#1A2238] opacity-40 grayscale"}`} title={badge.earned ? badge.name : `Locked: ${badge.name}`}>
                                                {badge.iconUrl}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Upload */}
                            <Card variant="interactive">
                                <CardContent>
                                    <Link href="/upload" className="flex items-center gap-4">
                                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#00F5D4]"><Upload className="w-8 h-8 text-[#0A1128]" /></div>
                                        <div className="flex-1"><h3 className="font-semibold text-white">Upload a Sign</h3><p className="text-sm text-[#B4BCC8]">Get instant AI recognition</p></div>
                                        <ArrowRight className="w-5 h-5 text-[#8891A0]" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
