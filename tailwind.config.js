/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      width: {
        20: "5rem", // 80px
        30: "7.5rem", // 120px
      },
      spacing: {
        20: "5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
