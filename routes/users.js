const router = require('express').Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//GET users for my own testing & checking purposes through Postman
router.get('/users', (req, res) => {
    Users.find().exec()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ msg: 'problem getting users' });
    });
});

//POST user for register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.create(user)
    .then(user => {
        res.status(201).json({ message: 'User registered successfully', user });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem registering user' });
    });
});

//POST  user for login
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const loginUser = await Users.findOne({email});

        if (loginUser && bcrypt.compareSync(password, loginUser.password)) {
            const token = generateToken(loginUser);
            res.status(201).json({ message: `Welcome ${loginUser.email}`, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Problem logging in user' });
    }
});

//PUT to update user
router.put('/edit-user/:id', (req, res) => {
    let updatedUser = req.body;
    updatedUser.id = req.params.id;
    const hash = bcrypt.hashSync(updatedUser.password, 10);
    updatedUser.password = hash;

    Users.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedUser => {
        updatedUser ? res.status(201).json(updatedUser) : res.status(404).json({ message: 'Could not find user to update' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem updating user' });
    });
});

//DELETE to delete user
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        deletedUser ? res.status(201).json(deletedUser) : res.status(404).json({ message: 'Could not find user to delete' });
    } catch(err) {
        res.status(500).json({ message: 'Problem deleting user' });
    }
});

//token logic
function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '2h' //token expires in 2 hours
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = router;