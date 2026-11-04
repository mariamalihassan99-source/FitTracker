const router = require('express').Router();
const DailyProgress = require('../models/DailyProgress.js');
const isSignedIn = require('../middleware/is-signed-in.js');

router.get('/', isSignedIn, async (req, res) => {

    const latestProgress = await DailyProgress.findOne({
        userId: req.session.user._id
    }).sort({ date: -1 });

    res.render('homepage', {
        latestProgress
    });

});

module.exports = router;




