const Course = require('../models/courses');

const addNewCourse = async (req, res) => {
    try {
        //add check if course exists
        const newCourse = new Course({
            name: req.body.name,
            term: req.body.term,
            year: req.body.year,
            // Initialize other fields if necessary
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
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.courseId,
            req.body,
            { new: true }  // Return the updated object
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: 'Error updating course', error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
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