/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: '#fff3e0', // Light orange for background
          800: '#ef6c00', // Darker orange for text
        },
      },
    },
  },
  plugins: [],
}
