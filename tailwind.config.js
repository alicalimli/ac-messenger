module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        primary: {
          main: "#6741d9",
          shaded: "#5d3bc3",
          tinted: "#7654dd",
        },
        muted: {
          light:'#212529bf',
          dark: "#aaa",
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
