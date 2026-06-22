const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Watchlist',
    trim: true
  },
  symbols: [{
    type: String,
    uppercase: true,
    trim: true
  }]
}, { timestamps: true });

watchlistSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
