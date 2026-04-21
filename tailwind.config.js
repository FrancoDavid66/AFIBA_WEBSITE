module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Ubuntu',
      secondary: 'Open Sans',
    },
    container: {
      padding: {
        DEFAULT: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1038px',
    },
    extend: {
      colors: {
        primary: {
          100: '#114232', //verde
          200: '#EEF7FF',
          300: '#0f4571', //azul
          400:'#f70808', //rojo
          500:'#3D3B40'//negro
        },
        neutral: {
          100: '#ffffff',
          200: '#0E1B15',
          300: '#54A17D',
          400:'#7C7A7D' ,//gris
          500: '#131316',
        },
        page: '#fcfcff',
      },
      backgroundImage: {
        heroBg: "url(./src/imgs/hero/banner.jpg)",
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        custom: '95%',
      },
    },
  },
  plugins: [],
};
