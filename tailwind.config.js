/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        a: '#797eff',
        light: {
          background: { body: '#F7F7F9', hover: '#eaeaed', active: '#787eff' },
          primary: { main: '#666CFF', dark: '#666CFF', light: '#787EFF' },
          text: {
            primary: 'rgba(76, 78, 100, 0.87)',
            secondary: 'rgba(76, 78, 100, 0.68)',
          },
          error: '#ff0e00',
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      flexGrow: {
        2: 2,
      },
    },
  },
};
