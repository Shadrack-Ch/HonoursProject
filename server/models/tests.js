const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
        trim: true
    },
    testDate: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    testType: {
        type: String,
        enum: ['final', 'midterm', 'quiz'],
        required: true
    }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
