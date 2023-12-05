const Test = require('../models/tests');
const Course = require('../models/courses');
const User = require('../models/user');
const Assignment = require('../models/assignment');

async function calculateTotalGradeForCourse(courseId) {
    // Fetch all assignments and tests for the course
    const assignments = await Assignment.find({ course: courseId });
    const tests = await Test.find({ course: courseId });

    // Aggregate grades
    let totalGrade = 0;
    assignments.forEach(assignment => {
        totalGrade += assignment.grade || 0;
    });
    tests.forEach(test => {
        totalGrade += test.grade || 0;
    });

    return totalGrade;
}

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

// Assign Grade to Test
const assignGrade = async (req, res) => {
    try {
        const testId = req.params.testId;
        const grade = req.body.grade;
        const test = await Test.findById(testId).populate('course');

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Check if the course belongs to the logged-in user
        if (!test.course.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to assign grade to this test' });
        }

        // Update test grade
        test.grade = grade;
        await test.save();

        // Calculate total grade for the course
        const totalGrade = await calculateTotalGradeForCourse(test.course._id);

        // Update user's grades array
        const user = await User.findById(req.user._id);
        const gradeIndex = user.grades.findIndex(g => g.course.toString() === test.course._id.toString());

        if (gradeIndex >= 0) {
            user.grades[gradeIndex].grade = totalGrade;
        } else {
            user.grades.push({ course: test.course._id, grade: totalGrade });
        }
        await user.save();

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

// List Tests by Status
const listTestsByStatus = async (req, res) => {
    try {
        const tests = await Test.find({ status: req.params.status }).populate('course');
        const userTests = tests.filter(test => test.course && test.course.user.equals(req.user._id));
        
        res.json(userTests);
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
