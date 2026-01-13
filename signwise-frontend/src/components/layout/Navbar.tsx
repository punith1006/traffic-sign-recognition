"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Home, Library, Upload, Trophy, User, MessageCircle, Flame, Zap, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";

const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/library", icon: Library, label: "Library" },
    { href: "/upload", icon: Upload, label: "Upload", highlight: true },
    { href: "/challenges", icon: Trophy, label: "Challenges" },
    { href: "/profile", icon: User, label: "Profile" },
];

export function Navbar() {
    const pathname = usePathname();
    const { user, stats, isAuthenticated, guestLogin, isLoading } = useAuth();
    const [loggingIn, setLoggingIn] = useState(false);

    const handleGuestLogin = async () => {
        setLoggingIn(true);
        try {
            await guestLogin();
        } catch (error) {
            console.error("Guest login failed:", error);
        } finally {
            setLoggingIn(false);
        }
    };

    // Use stats if available, fallback to mock data for display
    const displayXP = stats?.xp ?? 0;
    const displayStreak = stats?.streakDays ?? 0;
    const displayLevel = stats?.level ?? 1;

    return (
        <>
            {/* Top Header */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-[#3D4C63]">
                <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#00F5D4] flex items-center justify-center">
                            <span className="text-xl">🚦</span>
                        </div>
                        <span className="font-bold text-xl text-white hidden sm:block">SignWise AI</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A2238]">
                                    <Flame className="w-4 h-4 text-[#FF6B35]" />
                                    <span className="font-mono font-medium text-sm text-white">{displayStreak}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A2238]">
                                    <Zap className="w-4 h-4 text-[#00F5D4]" />
                                    <span className="font-mono font-medium text-sm text-white">{displayXP} XP</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#00F5D4]">
                                    <span className="font-mono font-bold text-sm text-[#0A1128]">Lv. {displayLevel}</span>
                                </div>
                                <Link href="/chat" className="p-2 rounded-full bg-[#1A2238] hover:bg-[#283048] transition-colors">
                                    <MessageCircle className="w-5 h-5 text-[#00D9FF]" />
                                </Link>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                onClick={handleGuestLogin}
                                isLoading={loggingIn || isLoading}
                                leftIcon={<LogIn className="w-4 h-4" />}
                            >
                                Start Learning
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Bottom Tab Bar (Mobile) */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[#3D4C63] md:hidden">
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all",
                                    item.highlight
                                        ? "bg-gradient-to-r from-[#00D9FF] to-[#00F5D4] -mt-6 rounded-full w-14 h-14 shadow-[0_4px_20px_rgba(0,217,255,0.4)]"
                                        : isActive ? "text-[#00D9FF]" : "text-[#8891A0] hover:text-[#B4BCC8]"
                                )}
                            >
                                <Icon className={cn("w-6 h-6", item.highlight && "text-[#0A1128]")} />
                                {!item.highlight && <span className="text-xs font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Side Navigation (Desktop) */}
            <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 flex-col border-r border-[#3D4C63] bg-[#0A1128] z-40">
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive
                                        ? "bg-[#00D9FF]/10 text-[#00D9FF] border-l-4 border-[#00D9FF]"
                                        : "text-[#B4BCC8] hover:bg-[#1A2238] hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A2238] to-[#283048] border border-[#3D4C63]">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-[#00F5D4]" />
                            <span className="font-semibold text-sm text-white">Daily Challenge</span>
                        </div>
                        <p className="text-xs text-[#B4BCC8] mb-3">Complete today&apos;s quiz to keep your streak!</p>
                        <Link
                            href="/quiz/daily"
                            className="block w-full text-center py-2 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#00F5D4] text-[#0A1128] font-semibold text-sm"
                        >
                            Start Challenge
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
