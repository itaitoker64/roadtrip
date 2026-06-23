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
        // Neutral coastal base
        sand: {
          50: "#faf7f1",
          100: "#f4ede0",
          200: "#e8dac2",
          300: "#d9c39c",
          400: "#c7a674",
          500: "#b88e57",
          600: "#a3784a",
          700: "#875f3e",
          800: "#6f4e37",
          900: "#5c4130",
        },
        ink: {
          DEFAULT: "#1f2421",
          soft: "#3c423d",
          muted: "#6b726c",
        },
        // Sardinia accent — turquoise + sand
        sardinia: {
          50: "#e8fbfb",
          100: "#c5f3f4",
          200: "#8fe7ea",
          300: "#4fd3da",
          400: "#22b6c2",
          500: "#0f97a6",
          600: "#0c7986",
          700: "#0f606b",
          800: "#134e57",
          900: "#14424a",
        },
        // Corsica accent — deep green / mountain + stone
        corsica: {
          50: "#eef3ee",
          100: "#d6e2d6",
          200: "#aec7af",
          300: "#7fa583",
          400: "#558060",
          500: "#3a6347",
          600: "#2c4e38",
          700: "#243f2e",
          800: "#1f3327",
          900: "#1a2b21",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(31, 36, 33, 0.12)",
        lift: "0 18px 50px -16px rgba(31, 36, 33, 0.28)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
