module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,svg}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#3B82F6",
          shaded: "#4f8ff7",
          tinted: "#3575dd",
        },
        muted: {
          light: "#212529bf",
          dark: "#aaa",
        },
        bgmain: {
          dark: "#0F172A",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
