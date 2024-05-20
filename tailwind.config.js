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
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        // primary: "#00AE9B",
        tintPrimary: "#C4F3E5",
        secondary: "#E8F3F2",
        disabled: "#AFAFAF",
        tintYellow: "#FBF5E8",
        danger: "#E3270E",
        grey: "#EEE",
        whiteButtonHover: "rgba(210, 226, 213, 0.30)",
        // This project
        secondaryRed: "#B85042",
        primary: "#80A48B",
        secondaryGreen: "#A7BEAE",
        errorRed: "#DD5A6B",
      },
      boxShadow: {
        card: "0px 18px 54px 0px rgba(58, 112, 86, 0.28)",
        socialLogin:
          "0px 8px 5.1px -6px rgba(0, 0, 0, 0.10), 0px 1px 1.7px 1px rgba(255, 255, 255, 0.07) inset, 0px -4px 2px 0px rgba(17, 17, 17, 0.05) inset",
        button:
          "0px 13px 22.6px 0px rgba(255, 255, 255, 0.10) inset, 0px 0px 0px 2px rgba(255, 255, 255, 0.18) inset",
        disabledButton:
          "0px 13px 22.6px 0px rgba(255, 255, 255, 0.10) inset, 0px 0px 0px 2px rgba(255, 255, 255, 0.18) inset;",
      },
    },
  },
  plugins: [],
};
