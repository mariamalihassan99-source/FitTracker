const mongoose = require('mongoose'); 

const dailyProgressSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    workoutType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    steps: {
        type: Number,
        required: true
    },
    waterAmount: {
        type: Number,
        required: true
    },
    sleepHours: {
        type: Number,
        required: true
    },


});

module.exports = mongoose.model('DailyProgress', dailyProgressSchema);  