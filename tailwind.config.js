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
        green: '#16a34a',
        red: '#dc2626',
        orange: '#ea580c',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
