"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "interactive" | "glass";
    padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ children, variant = "default", padding = "md", className, ...props }: CardProps) {
    const variants = {
        default: "bg-[#1A2238] shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        elevated: "bg-[#283048] shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        interactive: "bg-[#1A2238] shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-200 cursor-pointer",
        glass: "bg-[rgba(26,34,56,0.8)] backdrop-blur-xl border border-[#3D4C63]",
    };

    const paddings = { none: "", sm: "p-3", md: "p-5", lg: "p-8" };

    return (
        <div className={cn("rounded-2xl", variants[variant], paddings[padding], className)} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn("font-semibold text-xl text-white", className)} {...props}>{children}</h3>;
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn("text-[#B4BCC8] text-sm mt-1", className)} {...props}>{children}</p>;
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("mt-4 flex items-center gap-3", className)} {...props}>{children}</div>;
}
