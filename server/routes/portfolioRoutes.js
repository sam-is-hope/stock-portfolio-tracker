const express = require('express');
const router = express.Router();
const { getPortfolioSummary, updatePortfolio } = require('../controllers/portfolio/portfolioController');
const { executeTransaction, getTransactionHistory } = require('../controllers/portfolio/transactionController');
const { getHoldings } = require('../controllers/portfolio/holdingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getPortfolioSummary)
  .put(updatePortfolio);

router.route('/holdings')
  .get(getHoldings);

router.route('/transactions')
  .get(getTransactionHistory)
  .post(executeTransaction);

module.exports = router;
