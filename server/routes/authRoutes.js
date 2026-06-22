const express = require('express');
const router = express.Router();
const { loginController, registerController, logoutController } = require('../controllers/auth/loginController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

router.post('/register', validateRegistration, registerController);
router.post('/login', validateLogin, loginController);
router.post('/logout', protect, logoutController);

module.exports = router;
