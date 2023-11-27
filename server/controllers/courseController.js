const Course = require('../models/courses');

const addNewCourse = async (req, res) => {
    try {
        // add check to see if user already has this course, aboid duplicates
        const newCourse = new Course({
            ...req.body,
            user: req.user._id, // Linking course to the logged-in user
        });

        await newCourse.save();
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