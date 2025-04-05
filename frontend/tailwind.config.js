/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",  // Scan JS, JSX, TS, TSX files inside the src folder
],
  theme: {
    extend: {},
  },
  plugins: [],
}
