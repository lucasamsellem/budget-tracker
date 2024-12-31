/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: '#000000', // Black as primary color
        secondary: '#1a1a1a', // Dark gray for accents
        primaryGradient: 'linear-gradient(90deg, #000000, #333333)',
        secondaryGradient: 'linear-gradient(90deg, #1a1a1a, #4d4d4d)',
        green: '#16a34a',
        greenGradient: 'linear-gradient(90deg, #16a34a, #4ade80)',
        red: '#dc2626',
        redGradient: 'linear-gradient(90deg, #dc2626, #f87171)',
        orange: '#ea580c',
        orangeGradient: 'linear-gradient(90deg, #ea580c, #fbbf24)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
