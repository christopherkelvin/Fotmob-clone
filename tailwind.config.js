/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        darkGray: "#1a1a1a",
      },
      fontFamily: {
        rubik: ['"Rubik"', "system", "Arial", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
        walsheim: ["GTWalsheim-Md", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      gridTemplateColumns: {
        standings: "25px 30px 157px 30px 30px 30px",
        nation: "25px 200px",
        chris: "30% 5% 24% 5% 30%",
        stading: "25px 50px 500px 50px 50px 50px 50px 50px 50px 50px",
        custom: "1fr 50px 1fr ",
        home: " 350px  700px 380px",
      },
      margin: {
        19: "72px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};