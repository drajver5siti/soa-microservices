/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": '#393646',
        "accent-1-color": '#4F4557',
        "accent-2-color": '#6D5D6E',
        "light-color": '#F4EEE0',
        "dark-color": "#25232e"
      }
    },
  },
  plugins: [],
}

