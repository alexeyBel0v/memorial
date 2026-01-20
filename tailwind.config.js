/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0a0a0a',      // глубокий графит
          secondary: '#0d121c',    // тёмно-синий
        },
        text: {
          primary: '#e6e6e6',      // тёплый светло-серый
          secondary: '#a0a0a0',    // приглушённый серый
          accent: '#b8860b',       // золото, тёплое
        },
        accent: {
          primary: '#8B1E3F',      // бордовый
          secondary: '#2a2a2a',    // тёмно-серый
        },
        border: {
          light: '#252525',
          dark: '#1a1a1a',
        },
        graphite: {
          900: '#0f0f0f',
          800: '#1a1a1a',
        },
        anthracite: {
          900: '#121826',
          800: '#1a2233',
        },
        silver: {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        burgundy: {
          600: '#8B1E3F',
          700: '#7A1A36',
          800: '#60142B',
        },
      },
    },
  },
  plugins: [],
}
