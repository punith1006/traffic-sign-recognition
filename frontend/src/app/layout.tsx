import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';

export const metadata: Metadata = {
    title: 'SignWise AI - Learn Traffic Signs with AI',
    description: 'AI-powered traffic sign recognition and learning platform. Upload images, take quizzes, and master road safety.',
    keywords: ['traffic signs', 'road safety', 'AI recognition', 'driving test prep', 'learn driving'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-background">
                <Navigation />
                <main className="pt-16 pb-20 md:pb-8 px-4 max-w-7xl mx-auto">
                    {children}
                </main>
            </body>
        </html>
    );
}
