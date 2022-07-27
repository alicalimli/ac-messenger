module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        primary: {
          main: "#686be6",
          shaded: "#5e60cf",
          tinted: "#777ae9",
        },
        muted: {
          light:'#212529bf',
          dark: "#aaa",
        },
        bgmain: {
          dark: "#0F172A"
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

