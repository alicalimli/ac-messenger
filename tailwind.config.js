module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          main: "#6741d9",
          shaded: "#5d3bc3",
          tinted: "#7654dd"
        },
        muted: '#212529bf',
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
