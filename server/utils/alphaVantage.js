const axios = require('axios');

const alphaVantageClient = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  timeout: parseInt(process.env.API_TIMEOUT) || 15000,
});

const getStockQuote = async (symbol) => {
  const response = await alphaVantageClient.get('', {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  });
  return response.data;
};

const getStockDailyTimeSeries = async (symbol, outputsize = 'compact') => {
  const response = await alphaVantageClient.get('', {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      outputsize: outputsize,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  });
  return response.data;
};

const searchStockSymbol = async (keywords) => {
  const response = await alphaVantageClient.get('', {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: keywords,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  });
  return response.data;
};

module.exports = {
  alphaVantageClient,
  getStockQuote,
  getStockDailyTimeSeries,
  searchStockSymbol,
};
