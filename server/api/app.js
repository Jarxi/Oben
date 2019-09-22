const devEnv = require('../development.config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Correct REST naming
const {

    userRoutes,

} = require('./routes');

const app = express();


// Load 'development' configs for dev environment
if (process.env.NODE_ENV !== 'production') {
    devEnv.init();
}

// Open Mongoose connection to db
require('../db');

// cors middleware for orign and Headers
app.use(cors());

// Set Bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

// Correct REST naming
app.use('/api/', userRoutes);

// Invalid routes handling middleware
app.use((req, res, next) => {
    const error = new Error('404 not found');
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

