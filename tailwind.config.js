/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      transitionProperty: {
        'opacity': 'opacity',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #4EE8F2 0%, #0F4C75 49%)',
      },
    },
  },
  plugins: [],
}