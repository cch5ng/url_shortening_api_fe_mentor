// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'desktop': '1220px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      //primary
      cyan: {
        'DEFAULT': 'hsl(180, 66%, 49%)',
        light: '#94e7e7',
      },
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
      },
      white: '#fff',
    },
    height: {
      '50px': '50px',
      '300px': '300px',
    },
    extend: {
      backgroundImage: theme => ({
        'boost-background-mobile': "url('./images/bg-boost-mobile.svg')",
        'boost-background-desktop': "url('./images/bg-boost-desktop.svg')",
        'shorten-background-mobile': "url('./images/bg-shorten-mobile.svg')",
        'shorten-background-desktop': "url('./images/bg-shorten-desktop.svg')",
       })  
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
