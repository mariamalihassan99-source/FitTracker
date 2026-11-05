 
const mongoose = require('mongoose')  

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Pre-workout', 'Post-workout', 'Lunch', 'Dinner', 'Snack']
  },

  image: {
    type: String,
    required: true
  },
  calories:{
    type: Number,
    required: true
  },

  protein: {
        type: Number
    },

    carbs: {
        type: Number
    },

    fats: {
        type: Number
    },
    //many to many relationship with ingredients and instructions
    ingredients: [{
        name: String,
        quantity: String
    }],

    instructions: [{
        type: String
    }],


})

module.exports = mongoose.model('Recipe', recipeSchema);