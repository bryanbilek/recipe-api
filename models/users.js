const mongoose = require('mongoose');

const Users = mongoose.model('users', {
    email: String,
    password: String
});

module.exports = Users;