const Holding = require('../../models/Holding');
const Portfolio = require('../../models/Portfolio');

exports.recalculatePortfolioValue = async (portfolioId) => {
  const holdings = await Holding.find({ portfolio: portfolioId });
  
  let calculatedTotalValue = 0;
  let calculatedTotalCost = 0;
  
  holdings.forEach(h => {
    calculatedTotalValue += h.marketValue;
    calculatedTotalCost += h.totalCost;
  });

  const totalPnL = calculatedTotalValue - calculatedTotalCost;
  const pnlPercentage = calculatedTotalCost > 0 ? (totalPnL / calculatedTotalCost) * 100 : 0;

  return await Portfolio.findByIdAndUpdate(portfolioId, {
    totalValue: calculatedTotalValue,
    totalInvested: calculatedTotalCost,
    totalPnL,
    pnlPercentage,
    lastUpdated: new Date()
  }, { new: true });
};
