const HEADERS = { 'Content-Type': 'application/json' };

const dev = {
  BASE_URL: 'http://localhost:3000',
  HEADERS,
};

const prod = {
  BASE_URL: 'https://api.thelist.app',
  HEADERS,
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
