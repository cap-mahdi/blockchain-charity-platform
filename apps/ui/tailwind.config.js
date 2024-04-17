const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      sans: 'poppins',
      secondary: 'inter',
    },

    extend: {
      colors: {
        'dark-blue': '#022539',
        orange: '#fb991c',
        white: '#fbf3f1',
        blue: '#1c7690',
        'gray-dark': '#273444',
        gray: '#b5b5b5',
        'gray-light': '#d3dce6',
      },
      height: {
        screen: '1000dvh',
      },
    },
  },
  plugins: [],
};
