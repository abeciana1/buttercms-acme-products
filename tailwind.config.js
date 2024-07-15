/** @type {import('tailwindcss').Config} */
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
        orange: '#ED8B00',
        red: '#E03C31',
        brown: '#603D20',
        black: '#101820',
        white: '#fff'
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

