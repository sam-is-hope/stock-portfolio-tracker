const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const { generateToken } = require('../../configs/jwt');

exports.registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.statusCode = 400;
      throw new Error('User entity tracking signature already logged');
    }

    const user = await User.create({ name, email, password });
    
    await Portfolio.create({
      user: user._id,
      totalValue: 0,
      totalInvested: 0,
      totalPnL: 0,
      pnlPercentage: 0
    });

    return res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.matchPassword(password))) {
      res.statusCode = 401;
      throw new Error('Invalid email or password identity layout parameters');
    }

    return res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutController = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, message: 'Session payload invalidated successfully' });
  } catch (error) {
    next(error);
  }
};
