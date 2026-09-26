import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020408",
        navy: "#071a3d",
        midnight: "#031027",
        panel: "#081833",
        line: "rgba(255,255,255,0.14)",
        paper: "#f8f7f3",
        bone: "#e8e3da",
        mist: "#aeb9cd",
        mint: "#ffffff",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 0, 0, 0.4)",
        outline: "0 0 0 1px rgba(255, 255, 255, 0.14)",
      },
      fontFamily: {
        brand: ['"Didot"', '"Bodoni 72"', '"Bodoni MT"', '"Times New Roman"', "serif"],
        sans: ['"Inter"', '"Segoe UI"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
