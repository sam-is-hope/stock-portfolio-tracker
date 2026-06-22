const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const { generateToken } = require('../../configs/jwt');
const logger = require('../../utils/logger');

/**
 * @desc    Register a new platform user and initialize profile architecture
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Verify account uniqueness criteria
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.statusCode = 400;
      throw new Error('An account registration matching this email address already exists.');
    }

    // Instantiation of User model instance
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
      brokerConnected: false
    });

    if (!user) {
      res.statusCode = 400;
      throw new Error('Invalid registration data received. Entity creation rejected.');
    }

    // Auto-generation of tracking portfolio allocation shell
    const defaultPortfolio = await Portfolio.create({
      user: user._id,
      totalValue: 0.0,
      totalInvested: 0.0,
      totalPnL: 0.0,
      pnlPercentage: 0.0,
      dailyChange: 0.0,
      dailyChangePercentage: 0.0
    });

    logger.info(`User registered and portfolio matrix initialized for ID: ${user._id}`);

    // Generate response authentication payload token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'User identity and portfolio engine compiled successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      portfolioId: defaultPortfolio._id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerController;
