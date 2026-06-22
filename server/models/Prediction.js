const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    index: true
  },
  modelType: {
    type: String,
    enum: ['LSTM', 'PROPHET', 'HYBRID'],
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  forecastedPrice7Days: {
    type: Number,
    required: true
  },
  forecastedPrice30Days: {
    type: Number,
    required: true
  },
  predictedTrend: {
    type: String,
    enum: ['BULLISH', 'BEARISH', 'NEUTRAL'],
    required: true
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  historicalAccuracyScore: {
    type: Number,
    default: 0.0
  },
  forecastTimeline: [{
    date: { type: Date, required: true },
    value: { type: Number, required: true }
  }],
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
