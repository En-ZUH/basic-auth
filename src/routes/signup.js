'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const signup = express.Router();

const Users = require('../models/Users');
const auth = require('../middleware/auth');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo


signup.post('/signup', async (req, res) => {

    try {
        // req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log('THE record IIIIIS:', req.body);

        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new Users({ username, password: hash });

        // console.log('THE USER IIIIIS:', user);
        const record = await user.save();


        res.status(201).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
});


module.exports = signup;
