import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        graphite: "#191919",
        graphite2: "#232323",
        gold: "#D6A73B",
        "gold-bright": "#F4CC64",
        silver: "#C5C8CE",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        shell: "84rem",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(100deg, #8A6A1E 0%, #D6A73B 32%, #F7DE9B 52%, #D6A73B 70%, #8A6A1E 100%)",
      },
      boxShadow: {
        lift: "0 24px 60px -24px rgba(0,0,0,0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
