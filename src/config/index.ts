export const config = {
    apiPrefix: process.env.API_PREFIX || '',
    port: process.env.PORT || '3000',
    mode: process.env.MODE || 'dev',
    nextDbUrl: process.env.NEXT_DB_URL || '',
    prodDbUrl: process.env.PROD_DB_URL || '',
    testDbUrl: process.env.TEST_DB_URL || '',
    nextDbHost: process.env.NEXT_DB_HOST || '',
    prodDbHost: process.env.PROD_DB_HOST || '',
    testDbHost: process.env.TEST_DB_HOST || '',
    redisUrl: process.env.REDIS_URL || '',
    redisKey: process.env.REDIS_KEY || '',
    hashKey: process.env.HASH_KEY || '',
  };