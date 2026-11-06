/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        coral: '#e07a5f',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.75', transform: 'scaleY(1.15)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 6s linear infinite',
        flicker: 'flicker 0.35s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
