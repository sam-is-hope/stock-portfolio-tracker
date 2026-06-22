const axios = require('axios');

exports.getMarketSentimentNews = async (tickers) => {
  const response = await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'NEWS_SENTIMENT',
      tickers: tickers,
      apikey: process.env.ALPHA_VANTAGE_API_KEY
    }
  });
  return response.data.feed || [];
};
