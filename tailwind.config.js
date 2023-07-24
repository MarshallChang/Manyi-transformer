module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      backgroundImage: {
        'default-bg':
          'linear-gradient(200.96deg, #fedc2a -29.09%, #dd5789 51.77%, #7a2c9e 129.35%)',
        'default-dark-bg':
          'linear-gradient(200.96deg, #655710 -29.09%, #6b2942 51.77%, #351344 129.35%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
