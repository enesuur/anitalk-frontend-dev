const config = {
  API_PREFIX: process.env.API_PREFIX || 'v1',
  PORT: process.env.PORT || '3000',
  MODE: process.env.MODE || 'dev',
  BASE_URL: process.env.BASE_URL || 'localhost',
  REMOTE_HOST: process.env.REMOTE_HOST || 'xxx.xx',
  REMOTE_PORT: process.env.REMOTE_PORT || 5176,
  REMOTE_API_PREFIX: process.env.REMOTE_API_PREFIX || 'v1',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  REDIS_KEY: process.env.REDIS_KEY || 'redis',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'password',
};

Object.freeze(config);

export default config;
