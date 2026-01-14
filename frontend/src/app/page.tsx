'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from '@/components/features/upload/ImageUploader';
import { RecognitionResult } from '@/components/features/upload/RecognitionResult';
import { ProgressDashboard } from '@/components/features/progress/ProgressDashboard';
import { recognizeSign, type RecognitionResult as RecognitionResultType } from '@/lib/api';

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RecognitionResultType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        // Create object URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);

        try {
            const response = await recognizeSign(file);
            setResult(response);

            if (!response.success && response.message) {
                setError(response.message);
                // Clean up object URL if failed
                URL.revokeObjectURL(imageUrl);
                setUploadedImageUrl(null);
            }
        } catch (err) {
            setError('Failed to analyze image. Please check if the backend is running.');
            console.error('Recognition error:', err);
            // Clean up object URL if error
            URL.revokeObjectURL(imageUrl);
            setUploadedImageUrl(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        // Clean up object URL
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
        }
        setResult(null);
        setError(null);
        setUploadedImageUrl(null);
    };

    return (
        <div className="space-y-8 py-8">
            {/* Recognition Result Modal */}
            {result?.success && result.recognition && uploadedImageUrl && (
                <RecognitionResult
                    sign={result.recognition.sign}
                    confidence={result.recognition.confidence}
                    xpEarned={result.recognition.xpEarned}
                    bbox={result.recognition.bbox}
                    imageUrl={uploadedImageUrl}
                    onClose={handleReset}
                />
            )}

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">AI-Powered Recognition</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                    Learn Traffic Signs with <span className="gradient-text">AI</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Upload any traffic sign photo and get instant recognition,
                    educational content, and quiz yourself to master road safety.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Upload/Recognition */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                            1
                        </span>
                        Upload a Traffic Sign
                    </h2>

                    <ImageUploader onUpload={handleUpload} isLoading={isLoading} />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-error/10 border border-error/30 rounded-xl text-error"
                        >
                            <p className="font-medium mb-1">Detection Failed</p>
                            <p className="text-sm opacity-80">{error}</p>
                            {result?.suggestions && (
                                <ul className="mt-2 text-sm opacity-80 list-disc list-inside">
                                    {result.suggestions.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Right Column - Progress & Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">Your Progress</h2>
                    <ProgressDashboard />

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/library" className="card card-hover group">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                                    Sign Library
                                </span>
                                <span className="text-xs text-gray-400">
                                    Browse all traffic signs
                                </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors mt-2" />
                        </Link>

                        <Link href="/quiz" className="card card-hover group">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                                    Take Quiz
                                </span>
                                <span className="text-xs text-gray-400">
                                    Test your knowledge
                                </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors mt-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
