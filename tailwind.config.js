/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#134550", // Add your custom color here
        white_bg: "#D9D9D9", // Add your custom color here
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
