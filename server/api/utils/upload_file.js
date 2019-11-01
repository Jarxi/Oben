const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const devEnv = require('../../development.config');
const db = require('../../db.js');

const conn = mongoose.connection;
// init gfs
let gfs;
conn.once('open', () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
});
devEnv.init();
console.log(process.env.dbURL);
// Create storage engine
const storage = new GridFsStorage({

    url: process.env.dbURL,
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
//
// // @route POST /upload
// // @desc  Uploads file to DB
// app.post('/upload', upload.single('file'), (req, res) => {
//     // res.json({ file: req.file });
//     res.redirect('/afterupload');
// });
//
// // @route GET /
// // @desc Loads form
// app.get('/afterupload', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//         // Check if files
//         if (!files || files.length === 0) {
//             res.render('index', { files: false });
//         } else {
//             files.map(file => {
//                 if (
//                     file.contentType === 'image/jpeg' ||
//                     file.contentType === 'image/png'
//                 ) {
//                     file.isImage = true;
//                 } else {
//                     file.isImage = false;
//                 }
//             });
//             res.render('index', { files: files });
//         }
//     });
// });
//
//
// // @route GET /files
// // @desc  Display all files in JSON
// app.get('/files', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//         // Check if files
//         if (!files || files.length === 0) {
//             return res.status(404).json({
//                 err: 'No files exist'
//             });
//         }
//
//         // Files exist
//         return res.json(files);
//     });
// });
//
// // @route GET /files/:filename
// // @desc  Display single file object
// app.get('/files/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         // Check if file
//         if (!file || file.length === 0) {
//             return res.status(404).json({
//                 err: 'No file exists'
//             });
//         }
//         // File exists
//         return res.json(file);
//     });
// });
//
// // @route DELETE /files/:id
// // @desc  Delete file
// app.delete('/files/:id', (req, res) => {
//     gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
//         if (err) {
//             return res.status(404).json({ err: err });
//         }
//
//         res.redirect('/');
//     });
// });

module.exports = {
    storage,
    upload
};

