import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#00D9FF',
                secondary: '#00F5D4',
                background: '#0A1128',
                surface: '#1A2238',
                'surface-elevated': '#283048',
                accent: {
                    orange: '#FF6B35',
                    purple: '#B565D8',
                },
                success: '#00F5A0',
                warning: '#FFC43D',
                error: '#FF6B93',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.3s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'bounce-in': 'bounce-in 0.5s ease-out',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'bounce-in': {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
