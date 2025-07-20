const Portfolio = require('../models/Portfolio');

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPortfolio };
