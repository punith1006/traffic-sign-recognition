"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Users, Clock, Zap, Crown, Medal, ArrowRight, Lock, Flame } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/Progress";

const challenges = [
    { id: "speed", title: "Speed Round", description: "5 questions in 30 seconds", xpReward: 75, type: "speed", available: true },
    { id: "warning", title: "Warning Signs", description: "15 warning sign questions", xpReward: 100, type: "category", available: true },
    { id: "perfect", title: "Perfect Score", description: "100% on 20 questions", xpReward: 200, type: "achievement", available: false, requiredLevel: 10 },
];

const leaderboard = [
    { rank: 1, name: "RoadMaster99", xp: 12450, streak: 45 },
    { rank: 2, name: "SignQueen", xp: 11200, streak: 38 },
    { rank: 3, name: "SafeDriver2026", xp: 10890, streak: 32 },
    { rank: 4, name: "Demo User", xp: 1247, streak: 7, isYou: true },
    { rank: 5, name: "LearnerLiam", xp: 980, streak: 5 },
];

export default function ChallengesPage() {
    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-6">
                            <h1 className="font-bold text-3xl text-white mb-2">Challenges</h1>
                            <p className="text-[#B4BCC8]">Compete, earn XP, and climb the leaderboard</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {/* Featured Challenge */}
                                <Card className="bg-gradient-to-br from-[#00D9FF]/10 to-[#00F5D4]/10 border border-[#00D9FF]/30 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9FF]/10 rounded-full blur-2xl" />
                                    <CardContent className="relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#00F5D4]"><Trophy className="w-6 h-6 text-[#0A1128]" /></div>
                                                <div><Badge variant="warning" className="mb-1">Featured</Badge><h3 className="font-semibold text-lg text-white">Daily Challenge</h3></div>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A2238]"><Clock className="w-4 h-4 text-[#8891A0]" /><span className="text-sm text-[#B4BCC8]">18h 32m</span></div>
                                        </div>
                                        <p className="text-[#B4BCC8] mb-4">Complete 10 random questions to earn XP and maintain your streak!</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-[#00F5D4]" /><span className="font-semibold text-[#00F5D4]">+50 XP</span></div>
                                            <Link href="/quiz/daily"><Button rightIcon={<ArrowRight className="w-4 h-4" />}>Start Challenge</Button></Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                <h3 className="font-semibold text-white mt-6 mb-4">More Challenges</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {challenges.map((c) => (
                                        <Card key={c.id} variant={c.available ? "interactive" : "default"} className={!c.available ? "opacity-60" : ""}>
                                            <CardContent>
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className={`p-2 rounded-lg ${c.type === "speed" ? "bg-[#FF6B35]/10" : c.type === "category" ? "bg-[#B565D8]/10" : "bg-[#283048]"}`}>
                                                        {c.type === "speed" && <Clock className="w-5 h-5 text-[#FF6B35]" />}
                                                        {c.type === "category" && <Medal className="w-5 h-5 text-[#B565D8]" />}
                                                        {c.type === "achievement" && <Crown className="w-5 h-5 text-[#FFC43D]" />}
                                                    </div>
                                                    <div className="flex-1"><h4 className="font-semibold text-white">{c.title}</h4><p className="text-sm text-[#B4BCC8]">{c.description}</p></div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#00F5D4]" /><span className="text-sm font-medium text-[#00F5D4]">+{c.xpReward} XP</span></div>
                                                    {c.available ? <Button size="sm" variant="secondary">Play</Button> : <div className="flex items-center gap-1 text-sm text-[#8891A0]"><Lock className="w-4 h-4" /><span>Level {c.requiredLevel}</span></div>}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Card>
                                    <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-[#00D9FF]" />Leaderboard</CardTitle></CardHeader>
                                    <CardContent className="p-0">
                                        {leaderboard.map((user, i) => (
                                            <div key={user.rank} className={`flex items-center gap-3 p-4 ${i !== leaderboard.length - 1 ? "border-b border-[#3D4C63]" : ""} ${user.isYou ? "bg-[#00D9FF]/5" : ""}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${user.rank === 1 ? "bg-[#FFC43D] text-[#0A1128]" : user.rank === 2 ? "bg-[#B4BCC8] text-[#0A1128]" : user.rank === 3 ? "bg-[#FF6B35] text-white" : "bg-[#1A2238] text-[#B4BCC8]"}`}>{user.rank}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2"><p className="font-medium text-white truncate">{user.name}</p>{user.isYou && <Badge variant="info" size="sm">You</Badge>}</div>
                                                    <div className="flex items-center gap-2"><span className="text-xs text-[#8891A0]">{user.xp.toLocaleString()} XP</span><span className="flex items-center gap-0.5 text-xs text-[#FF6B35]"><Flame className="w-3 h-3" />{user.streak}</span></div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-[#1A2238] to-[#283048]">
                                    <CardContent>
                                        <p className="text-sm text-[#B4BCC8] mb-2">Your Position</p>
                                        <div className="flex items-baseline gap-2 mb-3"><span className="font-mono font-bold text-3xl text-white">#4</span><span className="text-[#00F5A0]">↑ 2 this week</span></div>
                                        <p className="text-sm text-[#B4BCC8]">253 XP to reach #3</p>
                                        <ProgressBar value={75} className="mt-2" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
