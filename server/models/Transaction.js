const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  transactionType: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0.0001, 'Quantity must be positive']
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, 'Execution price must be above zero']
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  brokerageFees: {
    type: Number,
    default: 0.0
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
