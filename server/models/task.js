const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true,
        default: ''
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    tags: {
        type: [String],
        default: []
    },
    reminder: {
        type: Date,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    completedDate: {
        type: Date,
        default: null
    },
    // Optional reference to an Assignment
    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        required: false
    },
    // Optional reference to a Course
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    // Direct relationship to the User
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
