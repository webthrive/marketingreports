module.exports = {
  content: [
    "./layouts/**/*.{html,js}",
    "./content/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        obviously: ['Obviously', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      content: {
        'list-icon': 'url("images/logos/list-icon.svg")',
      },
      backgroundImage: {
        'dashboard-card-gradient': 'linear-gradient(to bottom, #00000033 20%, #060913B2 20% 100%)',
      },
      colors: {
        ThemeWhite: '#F2F6FA',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1320px',
      },
    }
  },
  plugins: [],
}
