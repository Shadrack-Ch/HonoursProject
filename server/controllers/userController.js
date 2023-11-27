//userController.js

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Course = require('../models/courses');



// Function to update a user's profile
const updateUserProfile = async (req, res) => {
    try {
        const updateData = {
            username: req.body.username,
            email: req.body.email
            // Add other fields that can be updated
        };

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error });
    }
};


// Function to delete a user account
const deleteUserAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error });
    }
};

// add a course to the list of courses a user has

const listAllUsersCourses = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('courses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user courses', error: error.message });
    }
};


const listUsersCoursesForTerm = async (req, res) => {
    try {
        const { userId, term } = req.params;
        const user = await User.findById(userId).populate({
            path: 'courses',
            match: { term: term }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user courses for term', error: error.message });
    }
};


const listUsersCoursesByYear = async (req, res) => {
    try {
        const userId = req.user._id;
        const year = parseInt(req.params.year);  // Make sure to parse the year to a number

        if (isNaN(year)) {
            return res.status(400).json({ message: 'Invalid year provided' });
        }

        // Find the user and populate only the courses for the specified year
        const user = await User.findById(userId).populate({
            path: 'courses',
            match: { year: year },  // Filter courses by the specified year
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user courses for the year', error: error.message });
    }
};



module.exports = {
    
    updateUserProfile,
    deleteUserAccount,
    listAllUsersCourses,
    listUsersCoursesForTerm,
    listUsersCoursesByYear
};