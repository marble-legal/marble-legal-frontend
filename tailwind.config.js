/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tall2: { raw: "(min-height: 700px)" },
        md: { min: "800px" },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#00AE9B",
        tintPrimary: "#C4F3E5",
        secondary: "#E8F3F2",
        disabled: "#AFAFAF",
        tintYellow: "#FBF5E8",
        danger: "#E3270E",
        grey: "#EEE",
        whiteButtonHover: "rgba(210, 226, 213, 0.30)",
      },
      boxShadow: {
        card: "0px 18px 54px 0px rgba(58, 112, 86, 0.28)",
      },
    },
  },
  plugins: [],
};
