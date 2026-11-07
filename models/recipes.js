const mongoose = require("mongoose");


const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: true,
    trim: true
  },
     category: {
        type: String,
        enum: ["Breakfast", "Pre-workout", "Post-workout", "Lunch", "Dinner", "Snack" , "Low-carb" ,"High-protein"],
        required: true
    },

 calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },

  ingredients: {
    type: [String],
    required: true
  },

  instructions: {
    type: [String]

  },

 

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);    