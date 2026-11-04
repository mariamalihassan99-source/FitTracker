const router = require('express').Router();
const DailyProgress = require('../models/DailyProgress.js');
const isSignedIn = require('../middleware/is-signed-in.js');



router.get('/', isSignedIn, async (req, res) => {
  const progresses = await DailyProgress.find({
    userId: req.session.user._id
  }).sort({ date: -1 });

  console.log(req.session.user._id);

  const latestProgress = progresses[0];
  console.log(latestProgress);

  res.render('body/daily', {
    progresses,
    latestProgress
  });
});
// Create a new daily progress entry
router.post('/', isSignedIn, async (req, res) => {
  const { date, weight, caloriesBurned, workoutType , duration,  sleepHours , waterAmount , steps} = req.body;
  await DailyProgress.create({
    userId: req.session.user._id,
    date,
    workoutType ,
    duration,
    caloriesBurned,
    weight,
    waterAmount,
    sleepHours,
    steps,

  });
  res.redirect('/daily');
  
});


router.get('/history', isSignedIn, async (req, res) => {
  const progresses = await DailyProgress.find({
    userId: req.session.user._id
  }).sort({ date: -1 });

  res.render('body/daily-history', {
    progresses
  });
});


















module.exports = router;
