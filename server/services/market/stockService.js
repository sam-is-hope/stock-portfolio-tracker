const { getStockQuote, searchStockSymbol } = require('../../configs/alphaVantage');
const { redisClient } = require('../../configs/redis');

exports.fetchRealTimeStockQuote = async (symbol) => {
  const cacheKey = `quote:${symbol.toUpperCase()}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const freshData = await getStockQuote(symbol);
  await redisClient.setEx(cacheKey, 300, JSON.stringify(freshData));
  return freshData;
};

exports.runSymbolSearch = async (keywords) => {
  return await searchStockSymbol(keywords);
};
