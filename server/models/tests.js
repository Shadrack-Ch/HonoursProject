const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    type: {
        type: String,
        enum: ['final', 'midterm', 'quiz'],
        required: true
    },
    grade: {
        type: Number,
        required: false, // This may be false if the grade isn't initially known
        min: 0, // Assuming grades can't be negative
        max: 100 // Assuming 100 is the highest possible score
    }
});

// Indexes
// Virtuals or methods to compute properties
// Assuming you need a method to compute pass/fail based on grade
testSchema.method('isPassed', function(passingGrade = 50) {
    return this.grade >= passingGrade;
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
