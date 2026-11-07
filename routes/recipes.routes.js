const router = require('express').Router();
const isSignedIn = require('../middleware/is-signed-in.js');
const recipes = require('../models/recipes.js');
const Recipe = require('../models/recipes.js');

router.get('/', isSignedIn, async (req, res) => {
    const recipes = await Recipe.find();

    res.render('recipes/allrecipes', { recipes });
});

// Recipe Details Route
router.get("/details/:id", (req, res) => {

  const recipes = [
    {
      id: 1,
      name: "Peanut Butter Banana Toast",
      category: "Pre-workout",
      calories: 330,
      protein: 10,
      image: "https://cdn.corenexis.com/f/UwenNref.webp",
      description: "A quick and energy-rich snack, perfect before your workout.",
      ingredients: [
        "2 slices whole wheat bread",
        "1 tablespoon peanut butter",
        "1 banana",
        "1 teaspoon honey"
      ],
      instructions: [
        "Toast the bread slices until golden.",
        "Spread peanut butter evenly over the toast.",
        "Slice the banana and place it on top.",
        "Drizzle with honey and serve."
      ]
    },
    {
      id: 2,
      name: "Grilled Chicken Rice Bowl",
      category: "Post-workout",
      calories: 450,
      protein: 38,
      image: "https://cdn.corenexis.com/f/2RVmNjXM.webp",
      description: "A balanced post-workout meal rich in protein and carbohydrates.",
      ingredients: [
        "150g chicken breast",
        "1 cup cooked rice",
        "1/2 cup broccoli",
        "1/2 cup carrots"
      ],
      instructions: [
        "Season the chicken.",
        "Grill until cooked.",
        "Steam vegetables.",
        "Serve with rice."
      ]
    },
     {
            id: 3,
            name: "Greek Yogurt Berry Bowl",
            category: "Breakfast",
            calories: 280,
            protein: 20,
            image: "https://cdn.corenexis.com/f/GKN1Dtlv.png",
            description: "A refreshing breakfast packed with protein and antioxidants.",
            ingredients: [
                "1 cup Greek yogurt",
                "1/2 cup strawberries",
                "1/4 cup blueberries",
                "1 tablespoon chia seeds",
                "1 teaspoon honey"
            ],
            instructions: [
                "Add Greek yogurt to a bowl.",
                "Wash and slice the strawberries.",
                "Add strawberries and blueberries.",
                "Sprinkle chia seeds on top.",
                "Drizzle with honey and enjoy."
            ]
        },
        {
            id: 4,
            name: "Chicken Quinoa Salad",
            category: "Lunch",
            calories: 420,
            protein: 40,
            image: "https://cdn.corenexis.com/f/KbH8jxwn.webp",
            description: "A nutritious salad with lean chicken and quinoa.",
            ingredients: [
                "150g grilled chicken breast",
                "1/2 cup cooked quinoa",
                "1 cup lettuce",
                "1/2 cucumber",
                "Cherry tomatoes",
                "1 tablespoon olive oil",
                "Lemon juice"
            ],
            instructions: [
                "Cook the quinoa according to the package instructions.",
                "Season and grill the chicken breast.",
                "Chop the lettuce, cucumber and tomatoes.",
                "Add all ingredients to a bowl.",
                "Drizzle with olive oil and lemon juice."
            ]
        },
        {
            id: 5,
            name: "Baked Salmon with Vegetables",
            category: "Dinner",
            calories: 430,
            protein: 35,
            image: "https://cdn.corenexis.com/f/KZV5GeNy.avif",
            description: "A healthy dinner with salmon and roasted vegetables.",
            ingredients: [
                "150g salmon fillet",
                "1 cup broccoli",
                "1/2 zucchini",
                "1 tablespoon olive oil",
                "1 garlic clove",
                "Lemon juice",
                "Salt and pepper"
            ],
            instructions: [
                "Preheat the oven to 200°C.",
                "Place the salmon in a baking dish.",
                "Season with garlic, lemon juice, salt and pepper.",
                "Arrange the vegetables around the salmon.",
                "Bake for 15-20 minutes until the salmon is cooked."
            ]
        },
        {
            id: 6,
            name: "Garlic Butter Chicken with Broccoli",
            category: "Low-carb",
            calories: 295,
            protein: 25,
            image: "https://cdn.corenexis.com/f/F4Ey1sXf.webp",
            description: "A delicious low-carb meal with chicken and fresh broccoli.",
            ingredients: [
                "150g chicken breast",
                "1 cup broccoli",
                "1 tablespoon butter",
                "2 garlic cloves",
                "Salt and black pepper"
            ],
            instructions: [
                "Cut the chicken into small pieces.",
                "Melt butter in a pan.",
                "Add garlic and cook until fragrant.",
                "Add chicken and cook until fully done.",
                "Steam the broccoli and serve with the chicken."
            ]
        },
        {
            id: 7,
            name: "Lemon Herb Turkey Meatball Bowl",
            category: "High-protein",
            calories: 346,
            protein: 44,
            image: "https://cdn.corenexis.com/f/Kt6TZ5xg.webp",
            description: "High-protein turkey meatballs with fresh lemon and herbs.",
            ingredients: [
                "150g lean ground turkey",
                "1 garlic clove",
                "1 tablespoon chopped parsley",
                "1 tablespoon lemon juice",
                "1/2 cup cooked rice",
                "Salt and black pepper"
            ],
            instructions: [
                "Mix the ground turkey with garlic and parsley.",
                "Add salt, pepper and lemon juice.",
                "Shape the mixture into small meatballs.",
                "Cook the meatballs in a pan until fully cooked.",
                "Serve with cooked rice."
            ]
        },
        {
            id: 8,
            name: "Greek Yogurt with Mixed Berries",
            category: "Snack",
            calories: 238,
            protein: 43,
            image: "https://cdn.corenexis.com/f/wdpOda0d.webp",
            description: "A simple and refreshing high-protein snack.",
            ingredients: [
                "1 cup high-protein Greek yogurt",
                "1/2 cup mixed berries",
                "1 tablespoon chia seeds",
                "1 teaspoon honey"
            ],
            instructions: [
                "Add Greek yogurt to a serving bowl.",
                "Wash the mixed berries.",
                "Add the berries over the yogurt.",
                "Sprinkle chia seeds on top.",
                "Add honey and serve."
            ]
        }
    
  ];

  const recipeId = Number(req.params.id);

  const recipe = recipes.find(
    (item) => item.id === recipeId
  );

  res.render("recipes/details", {
    recipe
  });

});

module.exports = router;