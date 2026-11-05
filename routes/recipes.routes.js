const router = require('express').Router();
const isSignedIn = require('../middleware/is-signed-in.js');
const Recipe = require('../models/recipes.js'); 


router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;