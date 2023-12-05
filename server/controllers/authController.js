// controllers/authenticationController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const tokenService = require('../services/tokenService');

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const hashedPassword = req.body.password;
        

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        

        // Save the user
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error });
        console.log(error)
    }
};

// Function to authenticate a user
const authenticateUser = async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = tokenService.generateToken(user._id);
        user.tokens = user.tokens.concat({ token }); // Save the token
        await user.save();
        res.send({ user: { username: user.username, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error in authentication', error: error });
    }
};


const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).send({ error: 'Please authenticate.' });
        }

        const newToken = tokenService.generateToken(user._id);
        res.send({ token: newToken });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    refreshToken
};
