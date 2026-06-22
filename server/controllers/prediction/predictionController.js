const Prediction = require('../../models/Prediction');

exports.getStockPrediction = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const prediction = await Prediction.findOne({ symbol: symbol.toUpperCase() }).sort({ generatedAt: -1 });
    
    if (!prediction) {
      return res.status(404).json({ success: false, error: `Predictive models for ticker ${symbol} have not been built.` });
    }
    return res.status(200).json({ success: true, data: prediction });
  } catch (err) {
    next(err);
  }
};

exports.getBulkPredictions = async (req, res, next) => {
  try {
    const predictions = await Prediction.find({}).limit(20);
    return res.status(200).json({ success: true, data: predictions });
  } catch (err) {
    next(err);
  }
};
