
const router = require('express').Router();
const DailyProgress = require('../models/DailyProgress.js');
const isSignedIn = require('../middleware/is-signed-in.js');
const bodyMeasurements = require('../models/BodyMeasurements.js');

router.get('/', isSignedIn, async (req, res) => {

    // Get latest daily progress
    const latestProgress = await DailyProgress.findOne({
        userId: req.session.user._id
    }).sort({ date: -1 });

    // Get latest body measurement
    const latestMeasurements = await BodyMeasurements.findOne({
        userId: req.session.user._id
    }).sort({ date: -1 });

    // Calculate BMR and TDEE
    let calorieResults = null;

    if (
        latestMeasurements &&
        latestMeasurements.age &&
        latestMeasurements.gender &&
        latestMeasurements.activityLevel
    ) {

        const weight = latestMeasurements.weight;
        const height = latestMeasurements.height;
        const age = latestMeasurements.age;

        let bmr;

        if (latestMeasurements.gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const tdee = bmr * latestMeasurements.activityLevel;

        calorieResults = {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee)
        };
    }

    // Render homepage
    res.render('homepage', {
        latestProgress,
        latestMeasurements,
        calorieResults
    });

});

module.exports = router;
