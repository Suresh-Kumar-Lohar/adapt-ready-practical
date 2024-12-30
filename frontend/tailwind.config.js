/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1000': '1000ms',
      },
      colors: {
        primary: "#4A3AFF",
      },
    },
  },
  plugins: [],
}

