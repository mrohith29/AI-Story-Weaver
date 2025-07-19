/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#fcfaf6',
        'paper': '#ffffff',
        'ink': '#333333',
        'accent': '#4f46e5', // indigo-600
        'accent-light': '#eef2ff', // indigo-50
        'subtle-border': '#e5e5e5',
        'placeholder': '#9ca3af', // gray-400
      },
      fontFamily: {
        sans: ['Lora', 'serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    }
  },
  plugins: [],
}