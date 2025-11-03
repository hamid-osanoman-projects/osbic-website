/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        tab: "912px", // ✅ Surface Pro breakpoint
        lg: "1024px", // ✅ iPad Pro breakpoint
        xl: "1280px",
      },
      keyframes: {
        moveX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(40px)' },
        },
        moveY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(30px)' },
        },
      },
      animation: {  
        'move-x': 'moveX 6s ease-in-out infinite',
        'move-y': 'moveY 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
