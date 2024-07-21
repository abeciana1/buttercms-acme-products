/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        utilityGreen: '#9abeaa',
        yellow: '#F4DA40',
        skyBlue: '#A3C7D2',
        altOrange: '#ED8B00',
        altRed: '#E03C31',
        brown: '#603D20',
        black: '#101820',
        white: '#fff',
        ...colors
      },
      fontFamily: {
        'optiscript': ["OptiScript", "Times New Roman"],
        'futuraPT': ["FuturaPT"],
        'futuraPT-bold': ["FuturaPT Bold"]
      }
    },
  },
  plugins: [],
}

