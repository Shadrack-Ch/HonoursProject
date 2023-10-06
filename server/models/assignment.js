const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    assignmentName: {
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
    reminder: { // add server function to send user reminder to user that it is due
        type: Date,
        default: null
    },
    isComplete: {
        type: Boolean,
        default: false 
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
