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
router.post('/', /* authenticate, */ courseController.addNewCourse);

// Update Course Details
router.put('/:courseId', /* authenticate, */ courseController.updateCourseDetails);

// Get Course Details
router.get('/:courseId', /* authenticate, */ courseController.getCourseDetails);

// Delete Course
router.delete('/:courseId', /* authenticate, */ courseController.deleteCourse);

module.exports = router;
