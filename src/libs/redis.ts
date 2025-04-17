import Redis from 'ioredis';
import config from '@/config';

const client = new Redis({
  host: config.REDIS_HOST || 'localhost',
  port: Number(config.REDIS_PORT) || 6379,
  password: config.REDIS_PASSWORD || 'yourmom',
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis connected');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
    process.exit(1);
  }
};

const setValue = async (key: string, value: string) => {
  await client.set(key, value);
};

const getValue = async (key: string) => {
  return await client.get(key);
};

export { connectRedis, client, setValue, getValue };
