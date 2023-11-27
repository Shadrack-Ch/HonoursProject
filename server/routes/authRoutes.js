// routes/authenticationRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.registerUser); // Route for user registration
router.post('/login', authController.authenticateUser); // Route for user authentication
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
