const redis = require('redis');
const logger = require('../utils/logger');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6375',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error('Redis reconnection attempts exhausted. Proceeding without cache.');
        return new Error('Redis connection failed');
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err}`));
redisClient.on('connect', () => logger.info('Redis Server Connection Initiated'));
redisClient.on('ready', () => logger.info('Redis Client Ready and Cache Synchronized'));

const initRedis = async () => {
  if (process.env.NODE_ENV !== 'test') {
    await redisClient.connect();
  }
};

module.exports = {
  redisClient,
  initRedis,
};
