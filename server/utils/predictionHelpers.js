exports.evaluateTrendDirection = (currentPrice, targetPrice) => {
  const differential = targetPrice - currentPrice;
  if (differential > (currentPrice * 0.02)) return 'BULLISH';
  if (differential < -(currentPrice * 0.02)) return 'BEARISH';
  return 'NEUTRAL';
};
