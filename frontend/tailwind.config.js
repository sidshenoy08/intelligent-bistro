/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bistro: {
          dark: "#111827",
          gold: "#FBBF24",
          cream: "#FFF7ED",
          muted: "#6B7280",
        },
      },
    },
  },
  plugins: [],
};