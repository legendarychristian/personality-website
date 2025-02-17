import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      c1: "#F5F5F5",
      c2: "#EAE2FF",
      c3: "#BCB0DB", 
      c4: "#F2F2F2",
      c5: "#CECECE",
      c6: "#E9A547"
    },
  },
  plugins: [require('tailwindcss-motion')], 
} satisfies Config;
