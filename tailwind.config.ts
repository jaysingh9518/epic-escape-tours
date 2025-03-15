import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#df6853",
        white: "#ffffff",
        black: "#000000",
        gray: "#f5f5f5",
        primaryLight: "#f9f9f9",
        primaryDark: "#c43a31",
        primaryShadow: "#363636",
        secondary: "#f5f5f5",
        secondaryLight: "#ffffff",
      },
      spacing: {
        "60%": "60%",
        "70%": "70%",
      },
      letterSpacing: {
        widest: '0.515em',
      },
      borderRadius: {
        "Newsletter": "30px 400px 30px 30px"
      },
    },
  },
  plugins: [],
};
export default config;