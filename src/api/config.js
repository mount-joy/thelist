const dev = {
  BASE_URL: 'http://localhost:3000',
};

const prod = {
  BASE_URL: 'https://api.thelist.app',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
