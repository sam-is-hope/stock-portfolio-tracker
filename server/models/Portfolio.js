const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: String,
  date: String,
  value: Number
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
