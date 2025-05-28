/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "375px", // 모바일
      md: "744px", // 태블릿
      lg: "1024px", // 데스크탑
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        violet: {
          600: "#7C3AED",
          100: "#EDE9FE",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
      fontFamily: {
        sans: ['"NanumSquare"', "sans-serif"],
      },
      fontSize: {
        base: "16px",
        md: "18px",
        lg: "20px",
      },
    },
  },
  plugins: [],
};
