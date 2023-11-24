// const express = require('express');
// const router = express.Router();
// const courseController = require("../controllers/courseController")

// router.post('/add', courseController.addNewCourse);
// router.put('/update/:id',courseController.updateCourseDetails);
// router.get('/:id',courseController.getCourseDetails);
// router.delete("/delete/:id",courseController.deleteCourse);

// module.exports = router;

const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");

// Middleware placeholder for future authentication (to be implemented)
// const authenticate = require('../middleware/authenticate');

// Add New Course
// Use authentication middleware to ensure only authenticated users can add a course
router.post('/', /* authenticate, */ courseController.addNewCourse);

// Update Course Details
// Use authentication middleware to ensure only the owner of the course can update it
router.put('/:courseId', /* authenticate, */ courseController.updateCourseDetails);

// Get Course Details
// Use authentication middleware to ensure only users with access can view course details
router.get('/:courseId', /* authenticate, */ courseController.getCourseDetails);

// Delete Course
// Use authentication middleware to ensure only the owner of the course can delete it
router.delete('/:courseId', /* authenticate, */ courseController.deleteCourse);

module.exports = router;
