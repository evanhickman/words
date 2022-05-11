module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto Flex', 'sans-serif'],
    },
    fontWeight: {
      light: 200,
      black: 900,
    },
    extend: {
      backgroundImage: {
        blur: "url('/public/images/gradient.jpeg')",
      },
    },
  },
  plugins: [],
};
