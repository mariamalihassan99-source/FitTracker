const router = require('express').Router();
const DailyProgress = require('../models/DailyProgress.js');
const isSignedIn = require('../middleware/is-signed-in.js');
const BodyMeasurements = require('../models/BodyMeasurements.js');

router.get('/', isSignedIn, async (req, res) => {

    const latestProgress = await DailyProgress.findOne({
        userId: req.session.user._id
    }).sort({ date: -1 });

    const latestMeasurements = await BodyMeasurements.findOne({
        userId: req.session.user._id
    }).sort({ date: -1 });

    let calorieResults = null;
    if (latestMeasurements) {
        const { age, gender, height, weight, activityLevel } = latestMeasurements;
        const bmr = gender === 'male'
            ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
            : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        const tdee = bmr * activityLevel;
        calorieResults = { bmr: Math.round(bmr), tdee: Math.round(tdee) };
    }

    res.render('homepage', {
        latestProgress,
        latestMeasurements,
        calorieResults
    
    });

});

module.exports = router;




