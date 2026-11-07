const router = require('express').Router();
const isSignedIn = require('../middleware/is-signed-in.js');
const recipes = require('../models/recipes.js');
const Recipe = require('../models/recipes.js');

router.get('/', isSignedIn, async (req, res) => {
    const recipes = await Recipe.find();

    res.render('recipes/allrecipes', { recipes });
});

router.get('/details/:id', isSignedIn, async (req, res) => {

    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/details', { recipe });
});

module.exports = router;