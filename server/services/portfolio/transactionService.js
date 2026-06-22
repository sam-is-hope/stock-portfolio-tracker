const Transaction = require('../../models/Transaction');
const Holding = require('../../models/Holding');
const Portfolio = require('../../models/Portfolio');
const { recalculatePortfolioValue } = require('./valuationService');

exports.processTransactionLogic = async (userId, symbol, type, quantity, price, fees) => {
  const portfolio = await Portfolio.findOne({ user: userId });
  
  const transaction = await Transaction.create({
    user: userId,
    portfolio: portfolio._id,
    symbol: symbol.toUpperCase(),
    transactionType: type,
    quantity,
    price,
    brokerageFees: fees
  });

  let holding = await Holding.findOne({ portfolio: portfolio._id, symbol: symbol.toUpperCase() });

  if (type === 'BUY') {
    if (!holding) {
      holding = new Holding({
        portfolio: portfolio._id,
        user: userId,
        symbol: symbol.toUpperCase(),
        companyName: symbol.toUpperCase(),
        quantity: 0,
        avgBuyPrice: 0,
        totalCost: 0
      });
    }
    const newQuantity = holding.quantity + quantity;
    const newTotalCost = holding.totalCost + (quantity * price) + fees;
    holding.avgBuyPrice = newTotalCost / newQuantity;
    holding.quantity = newQuantity;
    holding.totalCost = newTotalCost;
  } else if (type === 'SELL') {
    if (!holding || holding.quantity < quantity) {
      throw new Error('Insufficient asset allocation units to satisfy sell order.');
    }
    holding.quantity -= quantity;
    holding.totalCost = holding.quantity * holding.avgBuyPrice;
  }

  holding.currentPrice = price;
  holding.marketValue = holding.quantity * price;
  holding.unrealizedPnL = holding.marketValue - holding.totalCost;
  holding.unrealizedPnLPercentage = holding.totalCost > 0 ? (holding.unrealizedPnL / holding.totalCost) * 100 : 0;

  if (holding.quantity === 0) {
    await holding.deleteOne();
  } else {
    await holding.save();
  }

  await recalculatePortfolioValue(portfolio._id);
  return transaction;
};
