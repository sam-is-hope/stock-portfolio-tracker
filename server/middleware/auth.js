const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../configs/jwt');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User context matching this token not found' });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Not authorized, access validation token invalid' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authorization header infrastructure missing' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role [${req.user.role}] cannot access this scope resource`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
