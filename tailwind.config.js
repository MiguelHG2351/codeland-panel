module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        translate: {
          default: '1rem',
          '0': '0',
          '100': '-100%',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }