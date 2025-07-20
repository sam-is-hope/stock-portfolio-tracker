const axios = require('axios');

const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
  );
  return res.data;
};

module.exports = fetchMarketData;
