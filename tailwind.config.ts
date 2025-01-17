import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#ffffff",
        "text-primary": "#1D252C",
        "section-titles": "#0B254B"
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Poppins', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
