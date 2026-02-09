import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'terminel': {
                    green: {
                        DEFAULT: '#175641',
                        50: '#e8f4f0',
                        100: '#c2e3d7',
                        200: '#9bd2be',
                        300: '#74c1a5',
                        400: '#4db08c',
                        500: '#175641',
                        600: '#134b37',
                        700: '#0f3f2d',
                        800: '#0b3323',
                        900: '#072719',
                    },
                },
                'harvest': {
                    gold: {
                        DEFAULT: '#F5B800',
                        50: '#fef9e6',
                        100: '#fef0b8',
                        200: '#fde78a',
                        300: '#fcde5c',
                        400: '#fbd52e',
                        500: '#F5B800',
                        600: '#c79600',
                        700: '#997400',
                        800: '#6b5200',
                        900: '#3d3000',
                    },
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
