const Test = require('../models/tests');
const Course = require('../models/courses');

const createNewTest = async (req, res) => {
    try {
        const userId = req.user._id;
        const course = await Course.findById(req.body.courseId);

        if (!course || !course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to add tests to this course' });
        }

        const newTest = new Test({ ...req.body });
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(400).json({ message: 'Error creating new test', error: error.message });
    }
};

const updateTestDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const test = await Test.findOne({ _id: req.params.testId, course: req.body.courseId }).populate('course');

        if (!test || !test.course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to update this test' });
        }

        Object.assign(test, req.body);
        await test.save();
        res.json(test);
    } catch (error) {
        res.status(400).json({ message: 'Error updating test', error: error.message });
    }
};

const deleteTest = async (req, res) => {
    try {
        const userId = req.user._id;
        const test = await Test.findOne({ _id: req.params.testId }).populate('course');

        if (!test || !test.course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to delete this test' });
        }

        await test.remove();
        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting test', error: error.message });
    }
};

const assignGrade = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId);
        
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        test.grade = req.body.grade;
        await test.save();
        res.json({ message: 'Grade assigned to test', test });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning grade', error: error.message });
    }
};

const listTestsByCourse = async (req, res) => {
    try {
        const tests = await Test.find({ course: req.params.courseId });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tests', error: error.message });
    }
};

const listTestsByStatus = async (req, res) => {
    try {
        const tests = await Test.find({ status: req.params.status });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tests by status', error: error.message });
    }
};

// change reminder logic in the future, placeholder implementation
const setTestReminder = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId);
        
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        test.reminder = req.body.reminder;
        await test.save();
        res.json({ message: 'Reminder set for test', test });
    } catch (error) {
        res.status(500).json({ message: 'Error setting reminder', error: error.message });
    }
};

module.exports = {
    createNewTest,
    updateTestDetails,
    deleteTest,
    assignGrade,
    listTestsByCourse,
    listTestsByStatus,
    setTestReminder
};
