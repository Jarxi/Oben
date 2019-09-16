const devEnv = require('../development.config');
const express = require('express');
const morgan = require('morgan');

if (process.env.Node_ENV !== 'production'){
    devEnv.init();
}

const app = express();

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

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

