"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#00D9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1128] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-gradient-to-r from-[#00D9FF] to-[#00BFDD] text-[#0A1128] font-semibold hover:shadow-[0_4px_20px_rgba(0,217,255,0.4)] hover:-translate-y-0.5",
        secondary: "bg-transparent border-2 border-[#3D4C63] text-[#00D9FF] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10",
        ghost: "bg-transparent text-[#B4BCC8] hover:bg-[#283048] hover:text-white",
        danger: "bg-[#FF6B93] text-white font-semibold hover:shadow-[0_4px_20px_rgba(255,107,147,0.4)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-lg",
        md: "px-5 py-2.5 text-base rounded-xl",
        lg: "px-7 py-3.5 text-lg rounded-xl",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : leftIcon}
            {children}
            {!isLoading && rightIcon}
        </button>
    );
}
