const { getStockDailyTimeSeries } = require('../../configs/alphaVantage');

exports.getHistoricalMetrics = async (symbol) => {
  return await getStockDailyTimeSeries(symbol, 'full');
};
