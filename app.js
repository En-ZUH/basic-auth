'use strict';
require('dotenv').config();
// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');



// Prepare the express app
const app = express();



const MONGODB_URI = process.env.MONGODB_URI;


// Process JSON input and put the data on req.body
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Create a mongoose model
// const usersSchema = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model('user', usersSchema);

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

//app.use(routes);
app.use('/', signin);
app.use('/', signup);

app.use('*', notFoundHandler);
app.use(errorHandler);


let startServer = (port) => {

  mongoose.
    connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then(() => {
      app.listen(3000, () => console.log('server up'));
    })
    .catch(e => console.error('Could not start server', e.message));
};
module.exports = { app, startServer };









