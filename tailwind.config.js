/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        light: {
          primary: "#4a90e2",
          secondary: "#ff5a5f",
          accent: "#50e3c2",
          neutral: "#f3f4f6",
          "base-100": "#ffffff",
        },
        dark: {
          primary: "#1e3a8a",
          secondary: "#9333ea",
          accent: "#14b8a6",
          neutral: "#1f2937",
          "base-100": "#111827",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
