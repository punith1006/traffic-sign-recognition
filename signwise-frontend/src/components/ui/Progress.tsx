"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    color?: "default" | "success" | "warning" | "error";
    showLabel?: boolean;
    className?: string;
}

export function ProgressBar({ value, max = 100, size = "md", color = "default", showLabel = false, className }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const sizes = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
    const colors = {
        default: "from-[#00D9FF] to-[#00F5D4]",
        success: "from-[#00F5A0] to-[#00F5D4]",
        warning: "from-[#FFC43D] to-[#FF6B35]",
        error: "from-[#FF6B93] to-[#FF3366]",
    };

    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex justify-between mb-1 text-sm">
                    <span className="text-[#B4BCC8]">Progress</span>
                    <span className="text-white font-mono font-medium">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={cn("w-full bg-[#3D4C63] rounded-full overflow-hidden", sizes[size])}>
                <div
                    className={cn("h-full bg-gradient-to-r rounded-full transition-all duration-500", colors[color])}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

interface ProgressRingProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    color?: "default" | "success" | "warning" | "error";
    showLabel?: boolean;
    label?: string;
    className?: string;
}

export function ProgressRing({ value, max = 100, size = 120, strokeWidth = 8, color = "default", showLabel = true, label, className }: ProgressRingProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    const colors = { default: "stroke-[#00D9FF]", success: "stroke-[#00F5A0]", warning: "stroke-[#FFC43D]", error: "stroke-[#FF6B93]" };

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-[#3D4C63]" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    className={cn(colors[color], "transition-all duration-700")}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-white">{Math.round(percentage)}%</span>
                    {label && <span className="text-xs text-[#B4BCC8] mt-1">{label}</span>}
                </div>
            )}
        </div>
    );
}
