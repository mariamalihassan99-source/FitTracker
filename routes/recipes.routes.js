const router = require('express').Router();
const isSignedIn = require('../middleware/is-signed-in.js');
const Recipe = require('../models/recipes.js'); 


router.get('/', isSignedIn, async (req, res) => {
  const recipes = await Recipe.find();
  res.render('recipes/recipe.index', { recipes });
});

module.exports = router;