/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'luna-black': '#0a0a0f',
        'luna-dark': '#131320',
        'luna-purple': '#8b5cf6',
        'luna-violet': '#7c3aed',
        'luna-glow': '#a78bfa',
      },
    },
  },
  plugins: [],
};