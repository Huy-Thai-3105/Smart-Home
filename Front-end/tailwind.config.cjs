/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(min-height: 640px)' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
