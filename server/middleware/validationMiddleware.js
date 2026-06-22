const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Missing name, email, or password criteria' });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, error: 'Password string must span 8 array sequences minimum' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Incomplete authentication credentials' });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
};
