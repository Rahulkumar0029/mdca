/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fe',
          100: '#e1ecfd',
          200: '#c3dbfc',
          300: '#94c2fa',
          400: '#5ea2f5',
          500: '#357fed',
          600: '#2363e1',
          700: '#1b4dcd',
          800: '#1c40a6',
          900: '#1c3783',
          950: '#152350',
        },
        gold: {
          500: '#eab308',
          600: '#ca8a04',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
