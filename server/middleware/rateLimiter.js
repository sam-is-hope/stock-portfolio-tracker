const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      error: 'Exceeded allocation of real-time API calls. Limit resetting momentarily.'
    });
  }
});

module.exports = apiRateLimiter;
