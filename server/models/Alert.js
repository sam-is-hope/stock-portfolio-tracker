const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  alertType: {
    type: String,
    enum: ['ABOVE', 'BELOW', 'PCT_CHANGE_DAILY'],
    required: true
  },
  targetValue: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isTriggered: {
    type: Boolean,
    default: false
  },
  triggeredAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
