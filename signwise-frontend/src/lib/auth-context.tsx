"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI, userAPI, setToken, clearToken, User, UserStats } from "@/lib/api";

interface AuthContextType {
    user: User | null;
    stats: UserStats | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, email?: string) => Promise<void>;
    guestLogin: () => Promise<void>;
    logout: () => void;
    refreshStats: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("signwise_token");
                if (token) {
                    const userStats = await userAPI.getStats();
                    setUser({
                        id: userStats.id,
                        username: userStats.username,
                        email: userStats.email,
                        xp: userStats.xp,
                        level: userStats.level,
                        streakDays: userStats.streakDays,
                    });
                    setStats(userStats);
                }
            } catch (error) {
                // Token invalid, clear it
                clearToken();
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        const response = await authAPI.login({ username, password });
        setToken(response.token);
        setUser(response.user);
        await refreshStats();
    };

    const register = async (username: string, password: string, email?: string) => {
        const response = await authAPI.register({ username, password, email });
        setToken(response.token);
        setUser(response.user);
        await refreshStats();
    };

    const guestLogin = async () => {
        const response = await authAPI.guestLogin();
        setToken(response.token);
        setUser(response.user);
        await refreshStats();
    };

    const logout = () => {
        clearToken();
        setUser(null);
        setStats(null);
    };

    const refreshStats = async () => {
        try {
            const userStats = await userAPI.getStats();
            setStats(userStats);
            setUser(prev => prev ? { ...prev, xp: userStats.xp, level: userStats.level, streakDays: userStats.streakDays } : null);
        } catch (error) {
            console.error("Failed to refresh stats:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                stats,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                guestLogin,
                logout,
                refreshStats,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
