// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    //extend: {},
    screens: {
      'desktop': '1220px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      //primary
      cyan: 'hsl(180, 66%, 49%)',
      violet: {
        darkest: 'hsl(260, 8%, 14%)',
        dark: 'hsl(257, 27%, 26%)',
        neutral: 'hsl(257, 7%, 63%)',
      },
      red: 'hsl(0, 87%, 67%)',
      //neutral
      grey: 'hsl(0, 0%, 75%)',
      blue: {
        darkest: 'hsl(255, 11%, 22%)',
      }
    },
    height: {
      '50px': '50px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
