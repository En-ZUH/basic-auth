'use strict';
const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});


const user = mongoose.model('users', usersSchema);

module.exports = user;



