import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#fffaf3",
        linen: "#f8efe4",
        blush: "#f5cfd6",
        rosewood: "#9f5967",
        lavender: "#cab8f0",
        plum: "#4f355d",
        gold: "#c99f45",
        honey: "#f3d48b",
        sage: "#90a991"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(79, 53, 93, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
