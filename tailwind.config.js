/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        klein: "#002FA7",
        ink: "#101010",
        card: "#212121",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
