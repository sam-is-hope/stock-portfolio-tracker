const express = require('express');
const router = express.Router();
const { getStockDetails, searchMarket } = require('../controllers/market/stockController');
const { getMarketNews } = require('../controllers/market/newsController');
const { protect } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

router.use(protect);
router.use(rateLimiter);

router.get('/stock/:symbol', getStockDetails);
router.get('/search', searchMarket);
router.get('/news', getMarketNews);

module.exports = router;
