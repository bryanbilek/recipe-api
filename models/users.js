const mongoose = require('mongoose');

const Users = mongoose.model('users', {
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

module.exports = Users;