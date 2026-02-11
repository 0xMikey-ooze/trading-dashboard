/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#0a0a0a",
          card: "#111111",
          border: "#1a1a1a",
          green: "#00ff88",
          blue: "#0088ff",
          red: "#ff4444",
          yellow: "#ffaa00",
          muted: "#666666",
          text: "#e0e0e0",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["DM Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
