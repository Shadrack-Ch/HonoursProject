// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');


// // Update User Profile
// router.put('/update/:userId', userController.updateUserProfile);

// // Delete User Account
// router.delete('/delete/:userId', userController.deleteUserAccount);

// // Add Course to User
// router.post('/addCourse/:userId', userController.addCourseToUser);
// router.put('/unenroll/:userId/:courseId', userController.unenrollUserFromCourse);
// router.get('/courses/:userId/:term', userController.listUsersCoursesForTerm);
// router.get('/:userId/courses', userController.listAllUsersCourses);
// router.get('/:userId/courses/year/:year', userController.listUsersCoursesByYear);


// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Update User Profile
router.put('/update', authenticate, userController.updateUserProfile);

// Delete User Account
router.delete('/delete', authenticate, userController.deleteUserAccount);

// List User's Courses for a Specific Term
router.get('/courses/term/:term', authenticate, userController.listUsersCoursesForTerm);

// List All User's Courses
router.get('/courses', authenticate, userController.listAllUsersCourses);

// List User's Courses by Specific Year
router.get('/courses/year/:year', authenticate, userController.listUsersCoursesByYear);

module.exports = router;
