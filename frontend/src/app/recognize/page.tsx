'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from '@/components/features/upload/ImageUploader';
import { RecognitionResult } from '@/components/features/upload/RecognitionResult';
import { recognizeSign, type RecognitionResult as RecognitionResultType } from '@/lib/api';

export default function RecognizePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RecognitionResultType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);

        try {
            const response = await recognizeSign(file);
            setResult(response);

            if (!response.success && response.message) {
                setError(response.message);
                URL.revokeObjectURL(imageUrl);
                setUploadedImageUrl(null);
            }
        } catch (err) {
            setError('Failed to analyze image. Please check if the backend is running.');
            console.error('Recognition error:', err);
            URL.revokeObjectURL(imageUrl);
            setUploadedImageUrl(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
        }
        setResult(null);
        setError(null);
        setUploadedImageUrl(null);
    };

    return (
        <div className="py-8">
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

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Recognize Sign
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Upload a traffic sign photo for instant AI recognition
                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <Camera className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Upload a Traffic Sign
                            </h2>
                            <p className="text-sm text-gray-400">
                                Drag & drop or click to select • JPEG, PNG • Max 5MB
                            </p>
                        </div>
                    </div>

                    <ImageUploader onUpload={handleUpload} isLoading={isLoading} />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-error/10 border border-error/30 rounded-xl text-error"
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

                {/* Tips */}
                <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-white mb-1">
                                Tips for best results
                            </p>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Make sure the traffic sign is clearly visible</li>
                                <li>• Use good lighting conditions</li>
                                <li>• Center the sign in the frame</li>
                                <li>• Avoid blurry or low-resolution images</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
