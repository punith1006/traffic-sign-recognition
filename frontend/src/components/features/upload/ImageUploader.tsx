'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Loader2, Camera } from 'lucide-react';

interface ImageUploaderProps {
    onUpload: (file: File) => Promise<void>;
    isLoading: boolean;
}

export function ImageUploader({ onUpload, isLoading }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const validateFile = (file: File): string | null => {
        if (!file.type.startsWith('image/')) {
            return 'Please upload an image file (JPEG, PNG)';
        }
        if (file.size > 5 * 1024 * 1024) {
            return 'File size must be less than 5MB';
        }
        return null;
    };

    const handleFile = useCallback(async (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        await onUpload(file);
    }, [onUpload]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        setError(null);
    };

    return (
        <div className="w-full">
            {preview ? (
                <div className="relative card animate-fade-in">
                    <button
                        onClick={clearPreview}
                        className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-xl"
                    />
                    {isLoading && (
                        <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-3" />
                                <p className="text-gray-300">Analyzing traffic sign...</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isDragging
                            ? 'border-primary bg-primary/10 scale-102'
                            : 'border-gray-600 hover:border-primary/50 hover:bg-surface-elevated/50'
                        }`}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <div className="flex flex-col items-center gap-4">
                        <div className={`p-4 rounded-2xl transition-colors ${isDragging ? 'bg-primary/20' : 'bg-surface-elevated'
                            }`}>
                            {isDragging ? (
                                <Upload className="w-12 h-12 text-primary" />
                            ) : (
                                <Camera className="w-12 h-12 text-gray-400" />
                            )}
                        </div>

                        <div>
                            <p className="text-lg font-medium text-white mb-1">
                                {isDragging ? 'Drop your image here' : 'Upload a traffic sign'}
                            </p>
                            <p className="text-sm text-gray-400">
                                Drag & drop or click to select • JPEG, PNG • Max 5MB
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm animate-slide-up">
                    {error}
                </div>
            )}
        </div>
    );
}
