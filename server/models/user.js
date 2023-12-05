//user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create a list to store reward objects + 
// create a reward model - a model can have - date achived, type of award, 
// shoudl we a dd a list of total grades from each course ?
// create a resourse model 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    grades: [{
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        grade: {
            type: Number,
            required: true
        }
    }],
    resources: [{
        // Assuming resources are just URLs; adjust if they are more complex
        type: String,
        trim: true,
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
