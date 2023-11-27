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
const authenticate = require('../middleware/authMiddleware'); // Ensure this is the correct path

router.post('/', authenticate, courseController.addNewCourse);
router.put('/:courseId', authenticate, courseController.updateCourseDetails);
router.get('/:courseId', authenticate, courseController.getCourseDetails);
router.delete('/:courseId', authenticate, courseController.deleteCourse);

module.exports = router;
