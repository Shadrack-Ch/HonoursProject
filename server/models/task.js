const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskDescription: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true,
        default: null
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: { // create a remider based on duedate or custome set 
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    tags: {
        type: [String], // Array of strings to allow multiple tags
        default: []
    },
    reminder: { // add server function to send user reminder to user that it is due
        type: Date,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    completedDate: { // add server function to calculate the date that it was completed
        type: Date,
        default: null
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
