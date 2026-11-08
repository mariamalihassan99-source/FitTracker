
const router = require('express').Router();
const BodyMeasurements = require('../models/BodyMeasurements.js');
const isSignedIn = require('../middleware/is-signed-in.js');

// Calculate BMR and TDEE
function calculateCalories(measurement) {
    const weight = Number(measurement.weight);
    const height = Number(measurement.height);
    const age = Number(measurement.age);
    const activityLevel = Number(measurement.activityLevel);

    let bmr;

    if (measurement.gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = bmr * activityLevel;

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
    };
}

// Display all body measurements
router.get('/', isSignedIn, async (req, res) => {

    const measurements = await BodyMeasurements
        .find({ userId: req.session.user._id })
        .sort({ date: -1 });

    for (let i = 0; i < measurements.length; i++) {
        if (!measurements[i - 1]) continue;

        measurements[i].weightChange =
            measurements[i].weight - measurements[i - 1].weight;
    }

    // Get latest measurement
    const latestMeasurement = measurements[0];

    let calorieResults = null;

    if (
        latestMeasurement &&
        latestMeasurement.age &&
        latestMeasurement.gender &&
        latestMeasurement.activityLevel
    ) {
        calorieResults = calculateCalories(latestMeasurement);
    }

    res.render('body/index', {
        measurements,
        latestMeasurement,
        calorieResults
    });
});

// Create a new body measurement
router.post('/', isSignedIn, async (req, res) => {

    const {
        weight,
        height,
        chest,
        waist,
        hips,
        goal,
        age,
        gender,
        activityLevel
    } = req.body;

    await BodyMeasurements.create({
        userId: req.session.user._id,
        weight,
        height,
        chest,
        waist,
        hips,
        goal,
        age,
        gender,
        activityLevel
    });

    res.redirect('/measurements');
});

// Edit a specific body measurement
router.get('/edit/:id', isSignedIn, async (req, res) => {

    const measurement = await BodyMeasurements.findOne({
        _id: req.params.id,
        userId: req.session.user._id
    });

    if (!measurement) {
        return res.redirect('/measurements');
    }

    res.render('body/edit.ejs', { measurement });
});

// Update a specific body measurement
router.put('/:id', isSignedIn, async (req, res) => {

    const {
        weight,
        height,
        chest,
        waist,
        hips,
        goal,
        age,
        gender,
        activityLevel
    } = req.body;

    await BodyMeasurements.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.session.user._id
        },
        {
            weight,
            height,
            chest,
            waist,
            hips,
            goal,
            age,
            gender,
            activityLevel
        },
        { runValidators: true }
    );

    res.redirect('/measurements');
});

// Delete a specific body measurement
router.delete('/:id', isSignedIn, async (req, res) => {

    await BodyMeasurements.findOneAndDelete({
        _id: req.params.id,
        userId: req.session.user._id
    });

    res.redirect('/measurements');
});

module.exports = router;

