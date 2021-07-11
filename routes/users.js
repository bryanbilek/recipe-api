const router = require('express').Router();
const Users = require('../models/users');

//POST user for register
router.post('/register', (req, res) => {
    Users.create(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem registering user' });
    });
});

//POST  user for login
router.post('/login', async (req, res) => {
    try {
        const loginUser = await Users.findById(req.params.id);
        res.status(201).json(loginUser);
    } catch(err) {
        res.status(500).json({ message: 'Problem logging in user' });
    }
});

//PUT to update user
router.put('/edit-user/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedUser => {
        res.status(201).json(updatedUser);
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem updating user' });
    });
});

//DELETE to delete user
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        res.status(201).json(deletedUser);
    } catch(err) {
        res.status(500).json({ message: 'Problem deleting user' });
    }
});