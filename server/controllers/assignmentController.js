const Assignment = require('../models/assignment');
const Course = require('../models/courses');
const User = require('../models/user');

const createNewAssignment = async (req, res) => {
    try {
        const userId = req.user._id;
        const course = await Course.findById(req.body.courseId);

        if (!course || !course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to add assignments to this course' });
        }

        const newAssignment = new Assignment({
            ...req.body,
            course: req.body.courseId,
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating new assignment', error: error.message });
    }
};


const updateAssignment = async (req, res) => {
    try {
        const userId = req.user._id;
        const assignment = await Assignment.findById(req.params.assignmentId).populate('course');

        if (!assignment || !assignment.course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to update this assignment' });
        }

        Object.assign(assignment, req.body);
        await assignment.save();
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating assignment', error: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const userId = req.user._id;
        const assignmentId = req.params.assignmentId;

        const assignment = await Assignment.findById(assignmentId).populate('course');
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (!assignment.course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to delete this assignment' });
        }

        await assignment.remove();
        res.json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assignment', error: error.message });
    }
};


const listAllUserAssignments = async (req, res) => {
    try {
        const userId = req.user._id;
        const assignments = await Assignment.find({ 'course.user': userId }).populate('course');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assignments', error: error.message });
    }
};


const getAssignmentDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const assignmentId = req.params.assignmentId;

        const assignment = await Assignment.findById(assignmentId).populate('course');
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (!assignment.course.user.equals(userId)) {
            return res.status(403).json({ message: 'Not authorized to view this assignment' });
        }

        res.json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assignment details', error: error.message });
    }
};

// Mark Assignment as Complete
const markAssignmentComplete = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.assignmentId, course: req.body.courseId });
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.isComplete = true;
        await assignment.save();
        res.json({ message: 'Assignment marked as complete', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating assignment', error: error.message });
    }
};

// Assign Grade to Assignment
const assignGrade = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.assignmentId, course: req.body.courseId });
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.grade = req.body.grade;
        await assignment.save();
        res.json({ message: 'Grade assigned to assignment', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning grade', error: error.message });
    }
};

// List Assignments by Course
const listAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment.find({ course: req.params.courseId });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assignments', error: error.message });
    }
};

// List Assignments by Status
const listAssignmentsByStatus = async (req, res) => {
    try {
        const assignments = await Assignment.find({ status: req.params.status });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assignments', error: error.message });
    }
};

// Set or Update Assignment Reminder
//  update reminder logic for assignments
const setAssignmentReminder = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.assignmentId, course: req.body.courseId });
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.reminder = req.body.reminder;
        await assignment.save();
        res.json({ message: 'Reminder set for assignment', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error setting reminder', error: error.message });
    }
};


module.exports = {
    createNewAssignment,
    updateAssignment,
    deleteAssignment,
    listAllUserAssignments,
    getAssignmentDetails,
    markAssignmentComplete,
    assignGrade,
    listAssignmentsByCourse,
    listAssignmentsByStatus,
    setAssignmentReminder
};