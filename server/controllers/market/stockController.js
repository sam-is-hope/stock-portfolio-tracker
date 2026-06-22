const { fetchRealTimeStockQuote, runSymbolSearch } = require('../../services/market/stockService');

exports.getStockDetails = async (req, res, next) => {
  try {
    const data = await fetchRealTimeStockQuote(req.params.symbol);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.searchMarket = async (req, res, next) => {
  try {
    const data = await runSymbolSearch(req.query.keywords);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
