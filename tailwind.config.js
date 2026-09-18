/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wf: {
          // Primary brand red spectrum
          red: '#D52B1E',
          'red-bright': '#E83B2E',
          'red-deep': '#B01E15',
          'red-dark': '#8A160E',
          'red-darker': '#5C0E08',
          'red-50': '#FEF2F2',
          'red-100': '#FCE4E4',
          'red-200': '#F8C5C5',
          'red-300': '#F09999',
          'red-400': '#E56B6B',
          'red-500': '#D52B1E',
          'red-600': '#B01E15',
          'red-700': '#8A160E',
          // Gold accent spectrum
          gold: '#FFC72C',
          'gold-bright': '#FFD54F',
          'gold-deep': '#D4A017',
          'gold-dark': '#B8860B',
          'gold-50': '#FFFDF5',
          'gold-100': '#FFF7E0',
          'gold-200': '#FFEBA8',
          'gold-300': '#FFD54F',
          // Dark surfaces
          ink: '#0A0A0B',
          'ink-100': '#111113',
          'ink-200': '#161618',
          'ink-300': '#1C1C1F',
          'ink-400': '#242427',
          'ink-500': '#2E2E32',
          'ink-600': '#3A3A3F',
          'ink-700': '#4A4A50',
          // Neutrals
          charcoal: '#1A1A1C',
          'charcoal-light': '#2D2D30',
          slate: '#3A3A3F',
          // Warm grays
          cream: '#FAF9F7',
          'warm-white': '#FDFCFA',
          stone: '#6B6B70',
          'stone-light': '#9A9A9F',
          'stone-50': '#FAFAFA',
          'stone-100': '#F5F5F5',
          'stone-200': '#E8E8EA',
          'stone-300': '#D1D1D4',
          'stone-400': '#B0B0B4',
          'stone-500': '#8A8A8F',
          'stone-600': '#6B6B70',
          'stone-700': '#4A4A50',
          'stone-800': '#2D2D30',
          'stone-900': '#1A1A1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-slow': 'fade-in 1.2s ease-out',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-delayed': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2.5s linear infinite',
        'progress': 'progress 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'converge': 'converge 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'expand-pulse': 'expand-pulse 1.5s ease-out',
        'draw-line': 'draw-line 1s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
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
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'drift': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(20px) translateY(-10px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'converge': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'expand-pulse': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
