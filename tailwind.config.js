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
        'menu-bg':
          'radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% );',
        'menu-dark-bg':
          'radial-gradient( circle 311px at 8.6% 27.9%,  rgba(27,63,108,0.57) 12.9%, rgba(73,55,58,0.44) 91.2% );',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
