const Course = require('../models/courses');
const User = require('../models/user');
const Assignment = require('../models/assignment');

const addNewCourse = async (req, res) => {
    try {
        const existingCourse = await Course.findOne({ name: req.body.name, user: req.user._id });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course already exists' });
        }

        console.log(req.user._id)

        const newCourse = new Course({
            ...req.body,
            user: req.user._id, // Linking course to the logged-in user
        });

        await newCourse.save();

        // Update user's courses array
        await User.findByIdAndUpdate(req.user._id, { $push: { courses: newCourse._id } });

        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: 'Error adding new course', error: error.message });
    }
};

// define what is details about the course we are handling
// here the whole course object is sent and updated 
const updateCourseDetails = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.courseId, user: req.user._id });

        if (!course) {
            return res.status(404).json({ message: 'Course not found or not authorized' });
        }

        Object.assign(course, req.body);
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: 'Error updating course', error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.params.courseId, user: req.user._id });

        if (!course) {
            return res.status(404).json({ message: 'Course not found or not authorized' });
        }

        // Update user's courses array
        await User.findByIdAndUpdate(req.user._id, { $pull: { courses: req.params.courseId } });

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};


const getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course details', error: error.message });
    }
};

const listAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error: error.message });
    }
};


module.exports = {
    addNewCourse,
    updateCourseDetails,
    deleteCourse,
    getCourseDetails

};