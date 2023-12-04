const Task = require('../models/task');
const Course = require('../models/courses');
const Assignment = require('../models/assignment');

const createNewTask = async (req, res) => {
    try {
        // Extract course and assignment IDs from the request body
        const { courseId, assignmentId } = req.body;

        // Validate Course Existence and User's Permission
        if (courseId) {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            if (!course.user.equals(req.user._id)) {
                return res.status(403).json({ message: 'Not authorized to add tasks to this course' });
            }
        }

        // Validate Assignment Existence and User's Permission
        if (assignmentId) {
            const assignment = await Assignment.findById(assignmentId).populate('course');
            if (!assignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }
            if (!assignment.course.user.equals(req.user._id)) {
                return res.status(403).json({ message: 'Not authorized to add tasks to this assignment' });
            }
        }

        // Create the new task with links to course and/or assignment
        const newTask = new Task({ ...req.body, user: req.user._id, course: courseId, assignment: assignmentId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating new task', error: error.message });
    }
};



const updateTaskDetails = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

const listAllUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
};

const listTasksByCourse = async (req, res) => {
    try {
        const tasks = await Task.find({ course: req.params.courseId, user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
};

const listTasksByStatus = async (req, res) => {
    try {
        const tasks = await Task.find({ status: req.params.status, user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
};

const markTaskComplete = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = 'completed';
        task.completedDate = new Date();
        await task.save();
        res.json({ message: 'Task marked as complete', task });
    } catch (error) {
        res.status(400).json({ message: 'Error marking task as complete', error: error.message });
    }
};

const setTaskReminder = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.reminder = req.body.reminder;
        await task.save();
        res.json({ message: 'Reminder set for task', task });
    } catch (error) {
        res.status(400).json({ message: 'Error setting reminder', error: error.message });
    }
};

module.exports = {
    createNewTask,
    updateTaskDetails,
    deleteTask,
    listAllUserTasks,
    listTasksByCourse,
    listTasksByStatus,
    markTaskComplete,
    setTaskReminder
};
