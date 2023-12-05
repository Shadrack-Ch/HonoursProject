const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authenticate = require('../middleware/authMiddleware'); 

// Create a new assignment
router.post('/', authenticate, assignmentController.createNewAssignment);

// Update an existing assignment
router.put('/:assignmentId', authenticate, assignmentController.updateAssignment);

// Delete an assignment
router.delete('/:assignmentId', authenticate, assignmentController.deleteAssignment);

// List all assignments for the authenticated user
router.get('/', authenticate, assignmentController.listAllUserAssignments);

// Get details of a specific assignment
router.get('/:assignmentId', authenticate, assignmentController.getAssignmentDetails);

// Mark Assignment as Complete //change to ---> change assignemnt status
router.put('/complete/:assignmentId', authenticate, assignmentController.markAssignmentComplete);

// Assign Grade to Assignment
router.put('/grade/:assignmentId', authenticate, assignmentController.assignGrade);

// List Assignments by Course
router.get('/course/:courseId', authenticate, assignmentController.listAssignmentsByCourse);

// List Assignments by Status
router.get('/status/:status', authenticate, assignmentController.listAssignmentsByStatus);

// Set or Update Assignment Reminder
router.put('/reminder/:assignmentId', authenticate, assignmentController.setAssignmentReminder);

module.exports = router;
