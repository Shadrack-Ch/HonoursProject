const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    term: {
        type: String,
        enum: ['winter', 'summer', 'fall'],
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
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],

    // Virtual fields
    numberOfAssignments: {
        type: Number,
        default: 0,
        required: true,
        get: function() {
            return this.assignments.length;
        }
    },
    numberOfTests: {
        type: Number,
        default: 0,
        required: true,
        get: function() {
            return this.tests.length;
        }
    },
    numberOfTasks: {
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
