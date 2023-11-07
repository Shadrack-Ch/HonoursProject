const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    urlLink: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    reminder: {
        type: Date,
        default: null
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    grade: {
        type: Number,
        min: 0, // Assuming grade cannot be negative
        max: 100, // Assuming the maximum grade is 100
        default: null // Grade can be null if not yet graded
    },
    // Assuming each assignment belongs to a course
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
