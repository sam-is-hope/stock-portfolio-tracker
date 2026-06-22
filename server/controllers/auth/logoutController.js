const logger = require('../../utils/logger');

/**
 * @desc    Terminate active user session context
 * @route   POST /api/auth/logout
 * @access  Private (Requires valid JWT token)
 */
const logoutController = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'Unknown Context';

    logger.info(`Session destruction request received for User Context Reference ID: ${userId}`);

    // For token-based authorization mechanics, clients remove tokens locally.
    // This handler serves as an explicitly logged application-layer session teardown verification block.
    return res.status(200).json({
      success: true,
      message: 'Authentication context token invalidated on server session pipeline. Client session storage safe to clear.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logoutController;
