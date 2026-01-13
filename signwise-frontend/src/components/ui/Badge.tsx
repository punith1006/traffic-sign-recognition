"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "error" | "info" | "category";
    size?: "sm" | "md";
    category?: "WARNING" | "REGULATORY" | "GUIDE" | "CONSTRUCTION" | "RECREATION";
}

export function Badge({ children, variant = "default", size = "sm", category, className, ...props }: BadgeProps) {
    const categoryColors: Record<string, string> = {
        WARNING: "bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/30",
        REGULATORY: "bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/30",
        GUIDE: "bg-[#00F5D4]/20 text-[#00F5D4] border-[#00F5D4]/30",
        CONSTRUCTION: "bg-[#FFC43D]/20 text-[#FFC43D] border-[#FFC43D]/30",
        RECREATION: "bg-[#B565D8]/20 text-[#B565D8] border-[#B565D8]/30",
    };

    const variants: Record<string, string> = {
        default: "bg-[#283048] text-[#B4BCC8] border-[#3D4C63]",
        success: "bg-[#00F5A0]/20 text-[#00F5A0] border-[#00F5A0]/30",
        warning: "bg-[#FFC43D]/20 text-[#FFC43D] border-[#FFC43D]/30",
        error: "bg-[#FF6B93]/20 text-[#FF6B93] border-[#FF6B93]/30",
        info: "bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/30",
        category: category ? categoryColors[category] : categoryColors.REGULATORY,
    };

    const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-3 py-1 text-sm" };

    return (
        <span className={cn("inline-flex items-center font-medium rounded-full border", variants[variant], sizes[size], className)} {...props}>
            {children}
        </span>
    );
}
