/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#07101E',
          800: '#0A192F',
          700: '#0F274A',
          600: '#1B3A6B'
        },
        cyan: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1'
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488'
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(14, 165, 233, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 20px 40px -15px rgba(10, 25, 47, 0.07)',
        'glow': '0 0 25px rgba(14, 165, 233, 0.35)',
      }
    },
  },
  plugins: [],
}
