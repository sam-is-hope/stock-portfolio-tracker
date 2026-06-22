const Holding = require('../../models/Holding');

exports.getRealizedPnLSummary = async (userId) => {
  const activeHoldings = await Holding.find({ user: userId });
  return activeHoldings.map(h => ({
    symbol: h.symbol,
    unrealizedPnL: h.unrealizedPnL,
    percentage: h.unrealizedPnLPercentage
  }));
};
