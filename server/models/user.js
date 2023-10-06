const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // removes any whitespace
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // consider a more substantial length for added security
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
