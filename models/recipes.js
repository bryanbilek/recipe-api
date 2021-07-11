const mongoose = require('mongoose');

const Recipes = mongoose.model('recipes', {
    title: String,
    ingredient_list: String,
    instructions: String,
    estimated_time: String
});

module.exports = Recipes;