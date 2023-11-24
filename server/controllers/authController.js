// controllers/authenticationController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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

        res.status(201).json({ message: 'User registered successfully', user: newUser });
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

        // User authenticated successfully
        res.json({ message: 'User authenticated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error in authentication', error: error });
    }
};

module.exports = {
    registerUser,
    authenticateUser
};
