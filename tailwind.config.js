module.exports = {
    purge: [],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      extend: {
        translate: {
          default: '1rem',
          '0': '0',
          '100': '-100%',
        },
        zIndex: {
          '1-': '-1',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }