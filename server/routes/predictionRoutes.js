const express = require('express');
const router = express.Router();
const { getStockPrediction, getBulkPredictions } = require('../controllers/prediction/predictionController');
const { getAIRecommendations } = require('../controllers/prediction/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/stock/:symbol', getStockPrediction);
router.get('/bulk', getBulkPredictions);
router.get('/recommendations', getAIRecommendations);

module.exports = router;
