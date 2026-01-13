"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Settings, Award, Calendar, TrendingUp, Target, Flame, Zap, BookOpen, Camera, LogOut, ChevronRight } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar, ProgressRing } from "@/components/ui/Progress";
import { mockUserStats, mockBadges, mockCategoryProgress } from "@/data/mockData";

const menuItems = [
    { icon: Settings, label: "Settings" },
    { icon: Award, label: "All Achievements" },
    { icon: Calendar, label: "Learning History" },
    { icon: TrendingUp, label: "Performance Analytics" },
];

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card className="mb-6 overflow-hidden">
                            <div className="h-24 bg-gradient-to-r from-[#00D9FF] to-[#00F5D4]" />
                            <CardContent className="relative pt-0">
                                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-[#283048] border-4 border-[#1A2238] flex items-center justify-center">
                                            <User className="w-12 h-12 text-[#8891A0]" />
                                        </div>
                                        <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#00D9FF] text-[#0A1128]"><Camera className="w-4 h-4" /></button>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left pb-2">
                                        <h1 className="font-bold text-2xl text-white">Demo User</h1>
                                        <p className="text-[#B4BCC8]">Joined January 2026</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#00F5D4]">
                                        <span className="font-mono font-bold text-[#0A1128]">Level {mockUserStats.level}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { icon: Zap, color: "#00D9FF", value: mockUserStats.xp.toLocaleString(), label: "Total XP" },
                                { icon: Flame, color: "#FF6B35", value: mockUserStats.streakDays, label: "Day Streak" },
                                { icon: Target, color: "#00F5D4", value: mockUserStats.signsMastered, label: "Signs Mastered" },
                                { icon: BookOpen, color: "#B565D8", value: mockUserStats.totalQuizzes, label: "Quizzes Done" },
                            ].map((stat) => (
                                <Card key={stat.label} variant="interactive" className="text-center">
                                    <CardContent>
                                        <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                                        <p className="font-mono font-bold text-xl text-white">{stat.value}</p>
                                        <p className="text-xs text-[#B4BCC8]">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader><CardTitle>Level Progress</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-6">
                                        <ProgressRing value={mockUserStats.xp} max={mockUserStats.xp + mockUserStats.xpToNextLevel} size={100} label="to next" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2"><Badge>Level {mockUserStats.level}</Badge><span className="text-sm text-[#B4BCC8]">Level {mockUserStats.level + 1}</span></div>
                                            <ProgressBar value={mockUserStats.xp} max={mockUserStats.xp + mockUserStats.xpToNextLevel} size="md" />
                                            <p className="text-sm text-[#B4BCC8] mt-2">{mockUserStats.xpToNextLevel} XP needed</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle className="flex items-center justify-between"><span>Badges Earned</span><Badge variant="info">{mockBadges.filter(b => b.earned).length}/{mockBadges.length}</Badge></CardTitle></CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-4 gap-3">
                                        {mockBadges.map((badge) => (
                                            <div key={badge.id} className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${badge.earned ? "bg-[#283048] hover:scale-110" : "bg-[#1A2238] opacity-40 grayscale"}`} title={badge.name}>
                                                {badge.iconUrl}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mt-6">
                            <CardHeader><CardTitle>Category Mastery</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockCategoryProgress.map((cat) => (
                                        <div key={cat.category}>
                                            <div className="flex items-center justify-between mb-1">
                                                <Badge variant="category" category={cat.category as "WARNING" | "REGULATORY" | "GUIDE" | "CONSTRUCTION" | "RECREATION"}>{cat.category}</Badge>
                                                <span className="text-sm font-mono text-white">{cat.mastered}/{cat.total}</span>
                                            </div>
                                            <ProgressBar value={cat.percentage} color={cat.percentage > 50 ? "success" : cat.percentage > 20 ? "warning" : "default"} size="md" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardContent className="p-0">
                                {menuItems.map((item, i) => (
                                    <button key={item.label} className={`w-full flex items-center gap-4 p-4 text-left hover:bg-[#283048] transition-colors ${i !== menuItems.length - 1 ? "border-b border-[#3D4C63]" : ""}`}>
                                        <item.icon className="w-5 h-5 text-[#8891A0]" />
                                        <span className="flex-1 text-white">{item.label}</span>
                                        <ChevronRight className="w-5 h-5 text-[#8891A0]" />
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="mt-6 text-center">
                            <Button variant="ghost" className="text-[#FF6B93]" leftIcon={<LogOut className="w-4 h-4" />}>Sign Out</Button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
