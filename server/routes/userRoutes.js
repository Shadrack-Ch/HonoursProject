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

// Middleware placeholder for future authentication (to be implemented)
// const authenticate = require('../middleware/authenticate');

// Update User Profile
// Use authentication middleware to ensure only the authenticated user can update their profile
router.put('/:userId', /* authenticate, */ userController.updateUserProfile);

// Delete User Account
// Use authentication middleware to ensure only the authenticated user can delete their account
router.delete('/:userId', /* authenticate, */ userController.deleteUserAccount);

// Add Course to User
// Use authentication middleware to ensure only the authenticated user can add a course
router.post('/:userId/courses', /* authenticate, */ userController.addCourseToUser);

// Unenroll User from Course
// Use authentication middleware to ensure only the authenticated user can unenroll from a course
router.put('/:userId/courses/:courseId/unenroll', /* authenticate, */ userController.unenrollUserFromCourse);

// List User's Courses for a Specific Term
// Use authentication middleware to ensure only the authenticated user can access their courses for a term
router.get('/:userId/courses/term/:term', /* authenticate, */ userController.listUsersCoursesForTerm);

// List All User's Courses
// Use authentication middleware to ensure only the authenticated user can access their courses
router.get('/:userId/courses', /* authenticate, */ userController.listAllUsersCourses);

// List User's Courses by Specific Year
// Use authentication middleware to ensure only the authenticated user can access their courses for a year
router.get('/:userId/courses/year/:year', /* authenticate, */ userController.listUsersCoursesByYear);

module.exports = router;
