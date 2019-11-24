const mongoose = require('mongoose');

const dbURL = process.env.dbURL || 'mongodb+srv://ruoxijia:oben@cluster0-pahm8.mongodb.net/test?retryWrites=true&w=majority';

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set('useFindAndModify', false);

mongoose.connect(dbURL, options);

// Log Mongoose connection status changes:
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection is open on\n\t${dbURL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection had an error:\n${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected due to app termination processs.');
        process.exit(0);
    });
});


const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// const devEnv = require('./development.config');

const conn = mongoose.connection;
// init gfs
let gfs;
mongoose.connection.once('open', () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
});



const URL = 'mongodb+srv://ruoxijia:oben@cluster0-pahm8.mongodb.net/test?retryWrites=true&w=majority';
// console.log(process.env.dbURL);
// Create storage engine
const storage = new GridFsStorage({

    url: URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

const getFile = (req, res) => {
    const filename = req.body.filename;
    const file = gfs.find({filename : filename});
    file.count(function(err, count) {
        if (count < 1) {
            // console.log ("success");
            return res.status(500).json({
                message: "Cannot find " + filename + " on server."
            });
        }
    });
    var readstream = gfs.createReadStream({ filename: filename });
    readstream.pipe(res);
};

module.exports = {
    upload,
    conn,
    getFile
};

