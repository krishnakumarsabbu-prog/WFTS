/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wf: {
          red: '#B31B1B',
          'red-dark': '#8B0E0E',
          'red-light': '#D44444',
          'red-50': '#FEF2F2',
          'red-100': '#FEE2E2',
          'red-600': '#C8102E',
          'red-700': '#A00D1E',
          gold: '#FFC72C',
          'gold-dark': '#D4A017',
          charcoal: '#1A1A1A',
          'charcoal-light': '#2D2D2D',
          slate: '#3A3A3A',
          stone: '#6B6B6B',
          'stone-light': '#9A9A9A',
          'stone-50': '#FAFAFA',
          'stone-100': '#F5F5F5',
          'stone-200': '#E8E8E8',
          'stone-300': '#D1D1D1',
          'stone-400': '#B0B0B0',
          'stone-500': '#8A8A8A',
          'stone-600': '#6B6B6B',
          'stone-700': '#4A4A4A',
          'stone-800': '#2D2D2D',
          'stone-900': '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'progress': 'progress 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'progress': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
