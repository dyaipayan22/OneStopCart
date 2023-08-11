/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Monteserrat: ['Monteserrat', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primeColor: '#262626',
        lightText: '#6D6D6D',
        lightColor: '#F5F5F3',
      },
    },
  },
  plugins: [],
};
