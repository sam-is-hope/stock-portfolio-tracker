const Transaction = require('../../models/Transaction');
const { processTransactionLogic } = require('../../services/portfolio/transactionService');

exports.executeTransaction = async (req, res, next) => {
  try {
    const { symbol, transactionType, quantity, price, brokerageFees } = req.body;
    
    const transaction = await processTransactionLogic(
      req.user.id,
      symbol,
      transactionType,
      parseFloat(quantity),
      parseFloat(price),
      parseFloat(brokerageFees || 0)
    );

    return res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ transactionDate: -1 });
    return res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    next(err);
  }
};
