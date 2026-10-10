/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MDCA Authentic Visual Identity Tokens (from Engineering Plan)
        navy: {
          50: '#f0f4f9',
          100: '#dce5f1',
          200: '#bdcfe4',
          300: '#93b2d2',
          400: '#648fbd',
          500: '#4373a6',
          600: '#325b8a',
          700: '#28486f',
          800: '#233d5d',
          900: '#142B4A', // Core Primary Navy
          950: '#0c1a2e',
        },
        ivory: {
          50: '#fbfaf7',
          100: '#F5F2EA', // Core Warm Ivory
          200: '#ebe5d5',
          300: '#ded4bc',
          400: '#cebe9e',
        },
        brass: {
          100: '#f6f1e6',
          200: '#edd8b6',
          300: '#deb983',
          400: '#ce9c56',
          500: '#B89455', // Core Brass
          600: '#9a753d',
          700: '#7a5a2e',
        },
        forest: {
          50: '#eef6f3',
          100: '#d6ebe3',
          200: '#b0d9cc',
          500: '#367765', // Core Success / Forest
          600: '#2a5e4f',
          700: '#21493e',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'soft-1': '0 2px 8px -2px rgba(20, 43, 74, 0.06), 0 1px 4px -1px rgba(20, 43, 74, 0.04)',
        'soft-2': '0 6px 20px -4px rgba(20, 43, 74, 0.08), 0 4px 8px -2px rgba(20, 43, 74, 0.05)',
        'soft-3': '0 12px 32px -4px rgba(20, 43, 74, 0.12), 0 6px 12px -3px rgba(20, 43, 74, 0.07)',
      },
      transitionDuration: {
        'fast': '150ms',
        'ui': '220ms',
        'modal': '280ms',
        'reveal': '500ms',
      }
    },
  },
  plugins: [],
}
