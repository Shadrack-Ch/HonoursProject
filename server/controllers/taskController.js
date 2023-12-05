const Task = require('../models/task');
const Course = require('../models/courses');
const Assignment = require('../models/assignment');

const createNewTask = async (req, res) => {
    try {
        const { courseId, assignmentId } = req.body;
        let associatedCourse, associatedAssignment;

        // Validate and link the task with a course if courseId is provided
        if (courseId) {
            associatedCourse = await Course.findById(courseId);
            if (!associatedCourse || !associatedCourse.user.equals(req.user._id)) {
                return res.status(403).json({ message: 'Not authorized or course not found' });
            }
        }

        // Validate and link the task with an assignment if assignmentId is provided
        if (assignmentId) {
            associatedAssignment = await Assignment.findById(assignmentId).populate('course');
            if (!associatedAssignment || !associatedAssignment.course.user.equals(req.user._id)) {
                return res.status(403).json({ message: 'Not authorized or assignment not found' });
            }
        }

        const newTask = new Task({ ...req.body, user: req.user._id, course: courseId, assignment: assignmentId });
        await newTask.save();

        // Update the tasks array in Course or Assignment if linked
        if (associatedCourse) {
            associatedCourse.tasks.push(newTask._id);
            await associatedCourse.save();
        }
        if (associatedAssignment) {
            associatedAssignment.tasks.push(newTask._id);
            await associatedAssignment.save();
        }

        // Update user's tasks array
        await User.findByIdAndUpdate(req.user._id, { $push: { tasks: newTask._id } });

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
        const userId = req.user._id;
        const taskId = req.params.taskId;

        // Find the task along with its related course and assignment
        const task = await Task.findById(taskId).populate('course').populate('assignment');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the user is authorized to delete the task
        if (task.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Remove the task from the course's tasks array if it's associated with a course
        if (task.course) {
            await Course.findByIdAndUpdate(task.course._id, { $pull: { tasks: taskId } });
        }

        // Remove the task from the assignment's tasks array if it's associated with an assignment
        if (task.assignment) {
            await Assignment.findByIdAndUpdate(task.assignment._id, { $pull: { tasks: taskId } });
        }

        // Remove the task from the user's tasks array
        await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

        // Finally, delete the task
        await task.remove();

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
