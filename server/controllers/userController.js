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
            // as an idea: get a whole user object and update 
        };

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, updateData, { new: true });
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error });
    }
};

// Function to delete a user account
const deleteUserAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error });
    }
};

// Function to add a course to a user
const addCourseToUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.courses.push(req.body.courseId); // Assuming the course ID is sent in the request body
        await user.save();

        res.json({ message: 'Course added to user successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course to user', error: error });
    }
};

// add a course to the list of courses a user has
const enrollUserInCourse = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const course = await Course.findById(req.params.courseId);

        if (!user || !course) {
            return res.status(404).json({ message: 'User or Course not found' });
        }

        // Add course to user's courses if not already enrolled
        if (!user.courses.includes(req.params.courseId)) {
            user.courses.push(req.params.courseId);
            await user.save();
        }

        res.json({ message: 'User enrolled in course successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling user in course', error: error.message });
    }
};

const listAllUsersCourses = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('courses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user courses', error: error.message });
    }
};

const unenrollUserFromCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the course from the user's courses array
        user.courses = user.courses.filter(course => course.toString() !== courseId);
        await user.save();

        res.json({ message: 'User unenrolled from course successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error unenrolling user from course', error: error.message });
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
        const userId = req.params.userId;
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
    enrollUserInCourse,
    updateUserProfile,
    deleteUserAccount,
    addCourseToUser,
    listAllUsersCourses,
    listUsersCoursesForTerm,
    unenrollUserFromCourse,
    listUsersCoursesByYear
};