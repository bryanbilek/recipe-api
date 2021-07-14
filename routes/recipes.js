const router = require('express').Router();
const Recipes = require('../models/recipes');

//GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.find().exec();
        recipes ? res.status(200).json(recipes) : res.status(400).json({ message: 'Something went wrong trying to get recipes' });
    } catch(err) {
        res.status(500).json({ message: 'Problem getting all recipes', err });
    }
});

//GET one recipe by id
router.get('/:id', (req, res) => {
    Recipes.findById(req.params.id)
    .then(recipe => {
        recipe ? res.status(200).json(recipe) : res.status(404).json({ message: 'Could not find recipe' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem getting the recipe' });
    });
});

//POST a recipe
router.post('/', async (req, res) => {
    try {
        const addRecipe = await Recipes.create(req.body);
        addRecipe ? res.status(201).json(addRecipe) : res.status(400).json({ message: 'Something went wrong creating a recipe' });
    } catch(err) {
        res.status(500).json({ message: 'Problem creating new recipe' });
    }
});

//PUT a recipe
router.put('/:id', (req, res) => {
    Recipes.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedRecipe => {
        updatedRecipe ? res.status(201).json(updatedRecipe) : res.status(404).json({ message: 'Could not find recipe to update' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem updating the recipe' });
    });
});

//DELETE a recipe
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
        deletedRecipe ? res.status(201).json(deletedRecipe) : res.status(404).json({ message: 'Could not find the recipe to delete' });
    } catch(err) {
        res.status(500).json({ message: 'Problem deleting the recipe' });
    }
});

module.exports = router;