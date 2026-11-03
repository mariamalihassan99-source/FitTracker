const router = require('express').Router();
const BodyMeasurements = require('../models/BodyMeasurements.js');
const isSignedIn = require('../middleware/is-signed-in.js');

// Routes for body measurements
router.get('/', isSignedIn, async (req, res) => {
  const measurements = await BodyMeasurements.find({
    userId: req.session.user._id
  });

  res.render('body/index', { measurements });
});

router.post('/', isSignedIn, async (req, res) => {
  const { weight, height, chest, waist, hips, goal } = req.body;

  await BodyMeasurements.create({
    userId: req.session.user._id,
    weight,
    height,
    chest,
    waist,
    hips,
    goal,
  });

  res.redirect('/measurements');
});

router.delete('/:id', isSignedIn, async (req, res) => {
  await BodyMeasurements.findByIdAndDelete(req.params.id);
  res.redirect('/measurements');
});

router.put('/:id', isSignedIn, async (req, res) => {
  const { weight, height, chest, waist, hips, goal } = req.body;
  await BodyMeasurements.findByIdAndUpdate(req.params.id, {
    weight,
    height,
    chest,
    waist,
    hips,
    goal,
  });
  res.redirect('/measurements');
});

router.get('/edit/:id', isSignedIn, async (req, res) => {
  const measurement = await BodyMeasurements.findById(req.params.id);
  res.render('edit.body', { measurement });
});




module.exports = router;
