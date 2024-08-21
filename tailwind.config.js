/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
    },
  },
  plugins: [],
};
