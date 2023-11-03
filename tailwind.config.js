/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./config/*.json",
    "./layout/*.liquid",
    "./assets/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/customers/*.liquid",
    "./templates/*.liquid",
    "./templates/*.json",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8baca5",
        "shof-yellow": "#eabb63",
        "shof-green": "#8baca5",
        "shof-brown": "#998a5f",
        "shof-blue": "#123751",
        "shof-violet": "#decae5",
        "shof-pink": "#e5c7bf",
        "shof-orange": "#ec764a",
        "shof-gray": "#C6B3A5",
        background: "white",
        "background-hover": "#f5f5f5",
        "font-dark": "black",
        hover: "#8baca5",
        border: "#cccccc",
        black: "black",
        white: "white",
        accent: "#8baca5",
        textColor: "#1d1d1d",
      },
      container: {
        center: true,
        padding: "20px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontFamily: {
        jost: ['"Jost"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
