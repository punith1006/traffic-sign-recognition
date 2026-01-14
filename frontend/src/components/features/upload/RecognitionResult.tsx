'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Plus, RotateCcw, Shield } from 'lucide-react';
import type { Sign } from '@/lib/api';
import { getSignContext, type SignContext } from '@/lib/gemini';

interface RecognitionResultProps {
    sign: Sign;
    confidence: number;
    xpEarned: number;
    bbox?: { x1: number; y1: number; x2: number; y2: number };
    imageUrl: string;
    onClose: () => void;
}

const categoryColors = {
    regulatory: 'text-red-400 bg-red-500/20 border-red-500/30',
    warning: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    guide: 'text-green-400 bg-green-500/20 border-green-500/30',
    construction: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
};

const categoryLabels = {
    regulatory: 'REGULATORY',
    warning: 'WARNING',
    guide: 'GUIDE',
    construction: 'CONSTRUCTION',
};

export function RecognitionResult({ sign, confidence, xpEarned, bbox, imageUrl, onClose }: RecognitionResultProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<SignContext | null>(null);
    const [isLoadingContext, setIsLoadingContext] = useState(true);
    const [addedToPractice, setAddedToPractice] = useState(false);
    const confidencePercent = Math.round(confidence * 100);
    const containerRef = useRef<HTMLDivElement>(null);

    // Draw bounding box on image - fills container
    useEffect(() => {
        if (!canvasRef.current || !imageUrl || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            // Get container dimensions and fill it
            const containerWidth = container.clientWidth - 20; // padding
            const containerHeight = container.clientHeight - 20;

            let width = img.width;
            let height = img.height;
            const aspectRatio = width / height;

            // Scale to fill container while maintaining aspect ratio
            if (containerWidth / containerHeight > aspectRatio) {
                // Container is wider - fit to height
                height = containerHeight;
                width = height * aspectRatio;
            } else {
                // Container is taller - fit to width
                width = containerWidth;
                height = width / aspectRatio;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw image
            ctx.drawImage(img, 0, 0, width, height);

            // Draw bounding box if available
            if (bbox) {
                const scaleX = width / img.width;
                const scaleY = height / img.height;

                const x1 = bbox.x1 * scaleX;
                const y1 = bbox.y1 * scaleY;
                const x2 = bbox.x2 * scaleX;
                const y2 = bbox.y2 * scaleY;

                // Draw box with thicker line for visibility
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 4;
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

                // Draw label background - larger font
                const label = `${sign.name} ${confidencePercent}%`;
                ctx.font = 'bold 18px Arial';
                const textWidth = ctx.measureText(label).width;
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(x1, y1 - 30, textWidth + 16, 28);

                // Draw label text
                ctx.fillStyle = '#000000';
                ctx.fillText(label, x1 + 8, y1 - 10);
            }
        };
        img.src = imageUrl;
    }, [imageUrl, bbox, sign.name, confidencePercent]);

    // Fetch context from Gemini
    useEffect(() => {
        async function fetchContext() {
            setIsLoadingContext(true);
            try {
                const ctx = await getSignContext(sign.name, sign.category);
                setContext(ctx);
            } catch (error) {
                console.error('Failed to get sign context:', error);
            } finally {
                setIsLoadingContext(false);
            }
        }
        fetchContext();
    }, [sign.name, sign.category]);

    const handleAddToPractice = () => {
        // Save to localStorage practice list
        const practiceList = JSON.parse(localStorage.getItem('signwise_practice_list') || '[]');
        if (!practiceList.find((s: any) => s.id === sign.id)) {
            practiceList.push({
                id: sign.id,
                name: sign.name,
                category: sign.category,
                addedAt: new Date().toISOString(),
            });
            localStorage.setItem('signwise_practice_list', JSON.stringify(practiceList));
        }
        setAddedToPractice(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col lg:flex-row">

                {/* Left Panel - Annotated Image (LARGE) */}
                <div className="lg:w-[65%] bg-black p-6 flex flex-col">
                    {/* Upload New Button */}
                    <button
                        onClick={onClose}
                        className="self-start flex items-center gap-2 px-4 py-2 bg-surface-elevated hover:bg-white/10 rounded-full text-white text-sm transition-colors mb-4"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Upload New
                    </button>

                    {/* Annotated Image - Full Size */}
                    <div ref={containerRef} className="flex-1 flex items-center justify-center min-h-[500px]">
                        <canvas
                            ref={canvasRef}
                            className="rounded-xl shadow-2xl"
                        />
                    </div>

                    {/* AI Confidence Badge */}
                    <div className="flex justify-center mt-4">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-elevated rounded-full">
                            <span className="text-gray-400 text-sm font-medium">AI CONFIDENCE</span>
                            <span className="text-primary font-bold text-lg">{confidencePercent}%</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Sign Info (Compact) */}
                <div className="lg:w-[35%] p-6 flex flex-col overflow-y-auto bg-surface-elevated">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${categoryColors[sign.category]}`}>
                            <Shield className="w-3 h-3" />
                            {categoryLabels[sign.category]}
                        </span>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 500 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 rounded-full"
                        >
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="font-bold text-primary text-sm">+{xpEarned} XP</span>
                        </motion.div>
                    </div>

                    {/* Sign Name */}
                    <h1 className="text-4xl font-heading font-bold text-white mb-4">
                        {sign.name}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-8">
                        {isLoadingContext ? (
                            <span className="animate-pulse">Loading description...</span>
                        ) : (
                            context?.description || sign.description
                        )}
                    </p>

                    {/* Driver Action Section */}
                    <div className="bg-surface/50 rounded-xl p-5 mb-6 border border-success/20">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            <span className="text-success font-semibold text-base">DRIVER ACTION</span>
                        </div>
                        <p className="text-white text-lg">
                            {isLoadingContext ? (
                                <span className="animate-pulse">Loading...</span>
                            ) : (
                                context?.driverAction || sign.rules
                            )}
                        </p>
                    </div>

                    {/* Safety Tip */}
                    {context?.safetyTip && (
                        <div className="bg-primary/10 rounded-xl p-5 mb-6 border border-primary/20">
                            <p className="text-base text-primary">
                                💡 <span className="font-semibold">Safety Tip:</span> {context.safetyTip}
                            </p>
                        </div>
                    )}

                    {/* Type Badge */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 bg-surface-elevated rounded-lg p-3">
                            <span className="text-xs text-gray-500 block mb-1">TYPE</span>
                            <span className="text-white font-medium capitalize">{sign.category}</span>
                        </div>
                    </div>

                    {/* Add to Practice List Button */}
                    <button
                        onClick={handleAddToPractice}
                        disabled={addedToPractice}
                        className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${addedToPractice
                            ? 'bg-success/20 text-success cursor-default'
                            : 'bg-primary hover:bg-primary/90 text-black'
                            }`}
                    >
                        {addedToPractice ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Added to Practice List
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5" />
                                Add to Practice List
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
