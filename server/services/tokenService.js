const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ _id: userId.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
module.exports = { generateToken, verifyToken };
