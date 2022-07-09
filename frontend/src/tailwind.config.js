
// tailwind.config.js
// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
