const config = {
  API_PREFIX: process.env.API_PREFIX || 'v1',
  PORT: process.env.PORT || '3000',
  MODE: process.env.MODE || 'dev',
  BASE_URL:process.env.BASE_URL || 'localhost',
  REMOTE_HOST:process.env.REMOTE_HOST || 'xxx.xx',
  REMOTE_PORT: process.env.BASE_PORT || 5176,
  REMOTE_API_PREFIX:process.env.REMOTE_API_PREFIX || 'v1'
};

Object.freeze(config);

export default config;
