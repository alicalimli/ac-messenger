module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          main: "#6741d9",
          shaded: "#5f3dc4",
          tinted: "#7048e8"
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
