const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: [true, 'Stock symbol identifier required'],
    trim: true,
    uppercase: true
  },
  companyName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  avgBuyPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  currentPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0.0
  },
  marketValue: {
    type: Number,
    required: true,
    default: 0.0
  },
  unrealizedPnL: {
    type: Number,
    required: true,
    default: 0.0
  },
  unrealizedPnLPercentage: {
    type: Number,
    required: true,
    default: 0.0
  },
  sector: {
    type: String,
    default: 'General'
  }
}, { timestamps: true });

holdingSchema.index({ portfolio: 1, symbol: 1 }, { unique: true });

module.exports = mongoose.model('Holding', holdingSchema);
