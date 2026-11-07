const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Orange Apparel brand palette (from the logo)
        forest: {
          DEFAULT: '#0E3428',
          deep: '#0B2A20',
          hover: '#1F5A45',
          line: '#234B3D'
        },
        stone: '#ECE8E1',
        sand: '#F4F1EC',
        cream: '#F7F3EC',
        ink: '#1A1A1A',
        muted: '#5E5A53',
        line: '#E6E1D8',
        citrus: {
          DEFAULT: '#A8480E', // text-safe orange on light backgrounds
          light: '#E9A267' // orange for dark backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif']
      },
      letterSpacing: {
        label: '0.14em',
        eyebrow: '0.22em'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        blink: 'blink 1.4s both infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ]
};
