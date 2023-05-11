/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      visibility: ["group-hover"],
      colors: {
        notWhite: "#FFFEF6",
        notBlack: "#212227",
        terracota: "#BB7E5D",
        green: "#52693A",
        blue: "#C7CEDB",
        Khaki: "#505344",
        Blue: "#2C5887",
        Pink: "#E4ABB3",
        Teal: "#A0B2A6",
        Mustard: "#E5D352",
        White: "#FFFFFF",
        Black: "#000000",
        "Blue-grey": "#616C79",
        "Jungle-green": "#37595D",
        Raspberry: "#8D2A31",
        "Bright-red": "#F64618",
        Beige: "#B6A294",
      },
      fontFamily: {
        title: ["Cormorant Garamond"],
        text: ["Lato"],
        logo: ["Bodoni Moda"],
      },
      fontSize: {
        body: "16px",
        bodyh: "25.9px",
        sub: "41.9px",
        headline: "67.8px",
        xlheadline: "109.7px",
        "xs-sub": "22.4px",
        "xs-headline": "31.4px",
        "xs-xlheadline": "43.9px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
