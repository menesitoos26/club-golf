/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',    // Móvil extra pequeño
      'sm': '510px',    // Móvil pequeño
      'md': '767px',    // Tablet/Móvil grande
      'lg': '990px',    // Pantalla pequeña
      'xl': '1920px',   // Full HD
    },
    extend: {},
  },
  plugins: [],
}