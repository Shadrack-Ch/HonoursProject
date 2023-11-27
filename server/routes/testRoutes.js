const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const authenticate = require('../middleware/authMiddleware');

// Route to create a new test
router.post('/', authenticate, testController.createNewTest);

// Route to update an existing test
router.put('/:testId', authenticate, testController.updateTestDetails);

// Route to delete a test
router.delete('/:testId', authenticate, testController.deleteTest);

// Route to assign a grade to a test
router.put('/grade/:testId', authenticate, testController.assignGrade);

// Route to list all tests for a specific course
router.get('/course/:courseId', authenticate, testController.listTestsByCourse);

// Route to list tests by their status
router.get('/status/:status', authenticate, testController.listTestsByStatus);

// Route to set or update a test reminder
router.put('/reminder/:testId', authenticate, testController.setTestReminder);

module.exports = router;
