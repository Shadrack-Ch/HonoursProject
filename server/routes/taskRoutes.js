const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authMiddleware');

// Route to create a new task
router.post('/', authenticate, taskController.createNewTask);

// Route to update an existing task
router.put('/:taskId', authenticate, taskController.updateTaskDetails);

// Route to delete a task
router.delete('/:taskId', authenticate, taskController.deleteTask);

// Route to list all tasks for the authenticated user
router.get('/', authenticate, taskController.listAllUserTasks);

// Route to list tasks by course
router.get('/course/:courseId', authenticate, taskController.listTasksByCourse);

// Route to list tasks by status
router.get('/status/:status', authenticate, taskController.listTasksByStatus);

// Route to mark a task as complete
router.put('/complete/:taskId', authenticate, taskController.markTaskComplete);

// Route to set or update a task reminder
router.put('/reminder/:taskId', authenticate, taskController.setTaskReminder);

module.exports = router;
