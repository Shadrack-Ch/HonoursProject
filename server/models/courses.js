//course.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    term: {
        type: String,
        enum: ['winter', 'summer', 'fall'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    tests: [{
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }],
    totalGrades: {
        type: Number,
        default: 0
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Virtual fields
    numberOfAssignments: { // this should be caluclated by the server and updated 
        type: Number,
        default: 0,
        required: true,
        get: function() {
            return this.assignments.length;
        }
    },
    numberOfTests: { // this should be caluclated by the server and updated 
        type: Number,
        default: 0,
        required: true,
        get: function() {
            return this.tests.length;
        }
    },
    numberOfTasks: { // this should be caluclated by the server and updated 
        type: Number,
        default: 0,
        required: true,
        get: function() {
            return this.tasks.length;
        }
    }
});

// Enable virtuals
courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
