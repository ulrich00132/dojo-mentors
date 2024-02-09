/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: '#FC75FF',
        roseLight: "#FD99FF",
        pastelRose: "#FFEBFF",
        green: '#22a094',
        greenLight:"#DEF8F5",
        softPurple: '#91A8ED',
        purple: '#2C59DD',
        blue: '#44E2F8',
        yellow: '#F8D044',
        white: '#FFFFFF',
        softGrey: '#f9f5f2',
        grey: '#A4A4A4',
        lightGrey: '#F3F4F6',
        lightBlack: '#282825',
        black: '#000000',
      }
    },
  },
  plugins: [],
}
