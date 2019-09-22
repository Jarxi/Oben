const express = require("express");
const devEnv = require('./development.config');
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const path = require("path");
const db = require('./db');
const cors = require('cors');
const { userRoutes } = require("./api/routes");

// Load 'development' configs for dev environment
if (process.env.NODE_ENV !== 'production') {
    devEnv.init();
}


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors middleware for orign and Headers
app.use(cors());

// Set Bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

//Passport middleware
app.use(passport.initialize());

//Use Routes
app.use("/api/user", userRoutes);

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

//server statuc assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
