const express = require('express');
const router = express.Router();
const { getRiskMetrics, getPerformanceMetrics } = require('../services/analytics/riskService');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/metrics/risk', async (req, res, next) => {
  try {
    const riskData = await getRiskMetrics(req.user.id);
    return res.status(200).json({ success: true, data: riskData });
  } catch (error) {
    next(error);
  }
});

router.get('/metrics/performance', async (req, res, next) => {
  try {
    const perfData = await getPerformanceMetrics(req.user.id);
    return res.status(200).json({ success: true, data: perfData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
