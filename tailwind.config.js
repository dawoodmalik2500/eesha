/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#ece9e2',
          200: '#d8d2c5',
          300: '#bdb4a0',
          400: '#9c8f74',
          500: '#7d6f57',
          600: '#635744',
          700: '#4d4436',
          800: '#322d24',
          900: '#1c1915',
        },
        gold: {
          50: '#fbf7ee',
          100: '#f5ecd5',
          200: '#ead7a8',
          300: '#ddbd76',
          400: '#d2a652',
          500: '#c08d3a',
          600: '#a4712e',
          700: '#835626',
          800: '#6b4423',
          900: '#5a3920',
        },
        rose: {
          50: '#fdf5f5',
          100: '#fbe6e6',
          200: '#f6cccc',
          300: '#eea6a6',
          400: '#e27676',
          500: '#d04f4f',
          600: '#b93838',
          700: '#9a2c2c',
          800: '#7e2727',
          900: '#6a2424',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e4ece4',
          200: '#c9d8ca',
          300: '#a3bba5',
          400: '#7a9a7d',
          500: '#5c7d5f',
          600: '#476349',
          700: '#3a4f3c',
          800: '#304032',
          900: '#283529',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
