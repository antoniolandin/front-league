/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        violet: {
          DEFAULT: "#53389C",
        },
        gray: {
          DEFAULT: "#F1F3F5",
          lighter: "#F9FAFC",
          darker: "#E9ECEF",
        },
        greenCard: {
          DEFAULT: "#31C48D",
        },
      },
    },
  },
  plugins: [],
};
