import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: "var(--green)",
        greenOpacity: "var(--greenOpacity)",
        darkGray: "var(--darkGray)",
        lightGray: "var(--lightGray)",
        mediumGray: "var(--mediumGray)",
        black: "var(--black)",
      },
    },
  },
  plugins: [],
} satisfies Config;
