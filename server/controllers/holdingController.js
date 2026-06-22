const Holding = require('../../models/Holding');

exports.getHoldings = async (req, res, next) => {
  try {
    const holdings = await Holding.find({ user: req.user.id }).sort({ marketValue: -1 });
    return res.status(200).json({ success: true, count: holdings.length, data: holdings });
  } catch (err) {
    next(err);
  }
};
