const config = {
  API_PREFIX: process.env.API_PREFIX || 'v1',
  PORT: process.env.PORT || '3000',
  MODE: process.env.MODE || 'dev',
  BASE_URL:process.env.BASE_URL || 'localhost'
};

Object.freeze(config);

export default config;
