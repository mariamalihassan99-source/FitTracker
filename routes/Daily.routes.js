const router = require('express').Router();
const DailyProgress = require('../models/DailyProgress.js');
const isSignedIn = require('../middleware/is-signed-in.js');



router.get('/', isSignedIn, async (req, res) => {
  const dailyProgress = await DailyProgress
    .find({ userId: req.session.user._id })
    .sort({ date: -1 });
  res.render('body/daily', { dailyProgress });
});

// Create a new daily progress entry
router.post('/', isSignedIn, async (req, res) => {
  const { date, weight, calories, exercise } = req.body;
  await DailyProgress.create({
    userId: req.session.user._id,
    date,
    weight,
    calories,
    exercise
  });
  res.redirect('/daily');
});

// Edit a specific daily progress entry
router.get('/edit/:id', isSignedIn, async (req, res) => {
  const entry = await DailyProgress.findById(req.params.id);
  res.render('body/edit', { entry });
});

// Update a specific daily progress entry
router.put('/:id', isSignedIn, async (req, res) => {
  const { date, weight, calories, exercise, water , sleep } = req.body;
  await DailyProgress.findByIdAndUpdate(req.params.id, {
    date,
    weight,
    calories,
    exercise,
    water,
    sleep
  });
  res.redirect('/daily');
});

// Delete a specific daily progress entry
router.delete('/:id', isSignedIn, async (req, res) => {
  await DailyProgress.findByIdAndDelete(req.params.id);
  res.redirect('/daily');
}); 










module.exports = router;
