const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const path = require("path");
const { userRoutes } = require("./api/routes");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
// // DB Config
// const db = require("./config/keys").mongoURI;
//
// //connect to MongoDB
// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(error => console.log(error));

//Passport middleware
app.use(passport.initialize());

//Passport Config
// require("./config/passport")(passport);

//Use Routes
app.use("/api/user", userRoutes);

//server statuc assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
