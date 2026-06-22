const Prediction = require('../../models/Prediction');
const Holding = require('../../models/Holding');

exports.getAIRecommendations = async (req, res, next) => {
  try {
    const holdings = await Holding.find({ user: req.user.id });
    const userSymbols = holdings.map(h => h.symbol);
    
    const bullishPredictions = await Prediction.find({
      symbol: { $in: userSymbols },
      predictedTrend: 'BULLISH',
      confidenceScore: { $gte: 75 }
    });

    return res.status(200).json({
      success: true,
      strategy: "Automated Allocation Adjustment Recommendations",
      data: bullishPredictions
    });
  } catch (err) {
    next(err);
  }
};
