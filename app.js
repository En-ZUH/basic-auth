'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');


// Prepare the express app
const app = express();


const MONGODB_URI = 'mongodb+srv://enasbataineh:123456@789@cluster0.c5nnh.mongodb.net/auth?retryWrites=true&w=majority';


// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('user', usersSchema);

const notFoundHandler = require('./src/error-handlers/404.js');
const errorHandler = require('./src/error-handlers/500.js');

const signin = require('./src/routes/signin');
const signup = require('./src/routes/signup');

app.get('/', (request, response) => {
  response.send('Welcome to home page 6');
});

app.get('/foo', (request, response) => {
  throw new Error('Error');
});

app.use('/signin', signin);
app.use('/signup', signup);

app.use('*', notFoundHandler);
app.use(errorHandler);

// let startServer = (port) => {
//     app.listen(3000, () => console.log('server up'));
// };


mongoose.
  connect('mongodb+srv://enasbataineh:123456@789@cluster0.c5nnh.mongodb.net/auth?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  .then(() => {
    app.listen(3000, () => console.log('server up'));
  })
  .catch(e => console.error('Could not start server', e.message));









