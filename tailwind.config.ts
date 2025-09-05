import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Space Theme Colors
        'deep-space': '#0A0A0F',
        'cosmic-blue': '#1E293B',
        'stellar-purple': '#6366F1',
        'nebula-pink': '#EC4899',
        'star-white': '#F8FAFC',
        'asteroid-gray': '#64748B',
        'solar-gold': '#F59E0B',
        'comet-green': '#10B981',
        'mars-red': '#EF4444',
        'moon-silver': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'holographic': 'holographic 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.stellar-purple), 0 0 10px theme(colors.stellar-purple)' },
          '100%': { boxShadow: '0 0 20px theme(colors.stellar-purple), 0 0 30px theme(colors.stellar-purple)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0px)' },
          '100%': { transform: 'translateY(-10vh) translateX(100px)' },
        },
        holographic: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'holographic-gradient': 'linear-gradient(45deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)',
      },
      backdropBlur: {
        'space': '12px',
      },
      boxShadow: {
        'holographic': '0 0 20px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
