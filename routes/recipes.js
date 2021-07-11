const router = require('express').Router();
const Recipes = require('../models/recipes');

//GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.find().exec();
        res.status(200).json(recipes);
    } catch(err) {
        res.status(500).json({ message: 'Problem getting all recipes' });
    }
});

//GET one recipe by id
router.get('/:id', (req, res) => {
    Recipes.findById(req.params.id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem getting the recipe' });
    });
});

//POST a recipe
router.post('/', async (req, res) => {
    try {
        const addRecipe = await Recipes.create(req.body);
        res.status(201).json(addRecipe);
    } catch(err) {
        res.status(500).json({ message: 'Problem creating new recipe' });
    }
});

//PUT a recipe
router.put('/:id', (req, res) => {
    Recipes.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedRecipe => {
        res.status(201).json(updatedRecipe);
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem updating the recipe' });
    });
});

//DELETE a recipe
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
        res.status(201).json(deletedRecipe);
    } catch(err) {
        res.status(500).json({ message: 'Problem deleting the recipe' });
    }
});

module.exports = router;