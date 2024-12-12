/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonColor: "#E54065",
        backgroundColor: "#F4F5F9"
      }
    },
  },
  plugins: [],
}
