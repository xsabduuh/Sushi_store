/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(222, 47%, 11%)",
        foreground: "hsl(40, 33%, 95%)",
        card: "hsl(222, 47%, 9%)",
        primary: "hsl(10, 85%, 65%)",
        "primary-foreground": "hsl(40, 33%, 95%)",
        secondary: "hsl(20, 20%, 20%)",
        "secondary-foreground": "hsl(40, 33%, 95%)",
        muted: "hsl(222, 30%, 20%)",
        "muted-foreground": "hsl(40, 20%, 70%)",
        border: "hsl(222, 30%, 20%)",
        matcha: "hsl(120, 30%, 40%)",
        accent: "hsl(10, 85%, 65%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
