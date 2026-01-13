"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, Image as ImageIcon, Sparkles, X, Check, Plus, Share2, BookOpen, ArrowRight, RotateCcw, AlertTriangle, Shield, Info } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { aiAPI, Sign } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function UploadPage() {
    const { refreshStats } = useAuth();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recognitionResult, setRecognitionResult] = useState<{ sign: Sign; confidence: number; xpEarned: number; annotatedImage?: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
                setRecognitionResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file?.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
                setRecognitionResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const result = await aiAPI.recognizeSign(selectedImage);

            if (result.success && result.sign) {
                setRecognitionResult({
                    sign: result.sign,
                    confidence: result.confidence || 0.95,
                    xpEarned: result.xpEarned || 0,
                    annotatedImage: result.annotatedImage,
                });
                await refreshStats();
            } else {
                setError(result.error || "Could not identify the sign");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to analyze image");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetUpload = () => {
        setSelectedImage(null);
        setRecognitionResult(null);
        setError(null);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "WARNING": return <AlertTriangle className="w-4 h-4" />;
            case "REGULATORY": return <Shield className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    return (
        <div className="h-screen bg-[#0A1128] overflow-hidden flex flex-col">
            <Navbar />

            {/* Main Content - Takes full remaining height */}
            <main className="flex-1 pt-20 md:pl-64 h-full relative">
                <AnimatePresence mode="wait">
                    {!recognitionResult ? (
                        /* UPLOAD STATE - Centered Full Screen */
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center p-6 relative"
                        >
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00D9FF]/5 via-transparent to-transparent pointer-events-none" />

                            <div className="max-w-xl w-full space-y-8 relative z-10 -mt-20">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-[#00D9FF]/10 mb-4 animate-pulse">
                                        <Sparkles className="w-8 h-8 text-[#00D9FF]" />
                                    </div>
                                    <h1 className="font-bold text-5xl text-white tracking-tight">SignWise AI</h1>
                                    <p className="text-[#B4BCC8] text-xl">Upload a traffic sign to instantly analyze its meaning and rules.</p>
                                </div>

                                <div
                                    className={`relative border-2 border-dashed rounded-3xl transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center cursor-pointer overflow-hidden group
                                        ${dragActive ? "border-[#00D9FF] bg-[#00D9FF]/5" : "border-[#1A2238] hover:border-[#00D9FF]/30 hover:bg-[#1A2238]/50"}
                                        ${selectedImage ? "border-solid border-[#00D9FF]/20" : ""}
                                    `}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => !selectedImage && document.getElementById("file-upload")?.click()}
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        disabled={!!selectedImage}
                                    />

                                    {selectedImage ? (
                                        <div className="relative w-full h-full min-h-[300px] bg-black/40">
                                            <img src={selectedImage} alt="Upload preview" className="w-full h-full object-contain absolute inset-0 p-8" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                                                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center p-10 pointer-events-none">
                                            <div className="w-16 h-16 rounded-full bg-[#1A2238] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                                <UploadIcon className="w-8 h-8 text-[#00D9FF]" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Image</h3>
                                            <p className="text-[#64748B]">or click to browse files</p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center animate-in fade-in slide-in-from-top-2">
                                        {error}
                                    </div>
                                )}

                                {selectedImage && (
                                    <Button
                                        size="lg"
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                        className="w-full h-16 text-xl bg-gradient-to-r from-[#00D9FF] to-[#00F5A0] hover:opacity-90 text-[#0A1128] font-bold rounded-2xl shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-all transform hover:scale-[1.02]"
                                    >
                                        {isAnalyzing ? (
                                            <span className="flex items-center gap-3">
                                                <Sparkles className="w-6 h-6 animate-spin" /> Analyzing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                Identified Sign <ArrowRight className="w-6 h-6" />
                                            </span>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        /* RESULT STATE - Full Screen Dashboard */
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full grid lg:grid-cols-12 overflow-hidden bg-[#050B18]"
                        >
                            {/* Left Column: Visual Canvas (8 cols) */}
                            <div className="lg:col-span-8 relative bg-black/30 flex items-center justify-center p-4">
                                {/* Grid Pattern Overlay */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

                                {/* Floating Header */}
                                <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
                                    <Button variant="ghost" onClick={resetUpload} className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md">
                                        <RotateCcw className="w-4 h-4 mr-2" /> Upload New
                                    </Button>
                                </div>

                                {/* Main Image Content */}
                                <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                                    {recognitionResult.annotatedImage ? (
                                        <img
                                            src={recognitionResult.annotatedImage}
                                            alt="AI Analysis Result"
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5"
                                        />
                                    ) : recognitionResult.sign.imageUrl ? (
                                        <img
                                            src={recognitionResult.sign.imageUrl}
                                            alt={recognitionResult.sign.name}
                                            className="max-w-full max-h-full object-contain p-12"
                                        />
                                    ) : (
                                        <div className="text-9xl">🚦</div>
                                    )}

                                    {/* Floating Confidence Badge */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/70 backdrop-blur-xl border border-[#00D9FF]/30 flex items-center gap-4 shadow-xl z-20">
                                        <span className="text-[#B4BCC8] text-sm font-medium uppercase tracking-wider">AI Confidence</span>
                                        <div className="h-4 w-px bg-white/20"></div>
                                        <span className="text-[#00F5A0] font-bold text-lg">{Math.round(recognitionResult.confidence * 100)}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Intel Sidebar (4 cols) */}
                            <div className="lg:col-span-4 bg-[#1A2238] border-l border-[#00D9FF]/10 flex flex-col h-full shadow-2xl z-30">
                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

                                    {/* Header Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="category" category={recognitionResult.sign.category as any} className="px-4 py-1.5 text-sm gap-2">
                                                {getCategoryIcon(recognitionResult.sign.category)}
                                                {recognitionResult.sign.category}
                                            </Badge>
                                            {recognitionResult.xpEarned > 0 && (
                                                <Badge variant="success" className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/30 animate-pulse">
                                                    +{recognitionResult.xpEarned} XP
                                                </Badge>
                                            )}
                                        </div>
                                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                            {recognitionResult.sign.name}
                                        </h1>
                                        <p className="text-[#B4BCC8] text-lg leading-relaxed border-l-2 border-[#B4BCC8]/20 pl-4">
                                            {recognitionResult.sign.description}
                                        </p>
                                    </div>

                                    {/* Rules / Action Card */}
                                    <Card className="bg-gradient-to-br from-[#00D9FF]/10 to-transparent border border-[#00D9FF]/20 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-3 opacity-10">
                                            <Shield className="w-24 h-24 text-[#00D9FF]" />
                                        </div>
                                        <CardContent className="pt-6 relative z-10">
                                            <h4 className="font-bold text-[#00D9FF] mb-3 flex items-center gap-2 uppercase tracking-wide text-sm">
                                                <Check className="w-5 h-5" /> Driver Action
                                            </h4>
                                            <p className="text-white text-xl font-medium leading-relaxed">
                                                {recognitionResult.sign.rules}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Additional Stats/Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-[#0A1128] border border-white/5">
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Region</p>
                                            <p className="text-white font-semibold">Vietnam</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-[#0A1128] border border-white/5">
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Type</p>
                                            <p className="text-white font-semibold capitalize">{recognitionResult.sign.category.toLowerCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 bg-[#0A1128]/50 border-t border-white/5 backdrop-blur-sm space-y-3">
                                    <Button className="w-full h-14 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#0A1128] font-bold text-lg rounded-xl shadow-lg shadow-[#00D9FF]/10">
                                        <Plus className="w-5 h-5 mr-2" /> Add to Practice List
                                    </Button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="secondary" className="h-12 border-white/10 hover:bg-white/5 text-white">
                                            <Share2 className="w-4 h-4 mr-2" /> Share
                                        </Button>
                                        <Button variant="secondary" className="h-12 border-white/10 hover:bg-white/5 text-white">
                                            <BookOpen className="w-4 h-4 mr-2" /> Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
