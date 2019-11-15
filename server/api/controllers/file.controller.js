const moment = require('moment');
const sendErr = require('../utils/sendErr');
const mongoose = require('mongoose');
const { conn } = require('../../db');


const getFile = (req, res) => {
    let gfs;
    // conn.once('open', () => {
        // init stream
        gfs = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'uploads'
        });
    // });


        // console.log('id', req.params.id)
        const file = gfs.find({
            // filename: req.params.filename
            id: "5dbbaeed5fe53a2368ea5553"

        }).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no file found"
                })
            }
            gfs.openDownloadStreamByName(req.params.filename)
                .pipe(res);
        });
    // console.log(gfs);
    // const stream = gfs.openDownloadStream("5dbbaff85fe53a2368ea5555");
    // console.log(stream.toString());
    // gfs.files.findOne({ filename: req.params.filename, bucketName: 'uploads' }, (err, file) => {
    //     // // Check if file
    //     // if (!file || file.length === 0) {
    //     //     console.log("null file");
    //     //     return res.status(333).json({
    //     //         err: 'No file exists'
    //     //     });
    //     // }
    //     // // File exists
    //     // // return res.json(file);
    //     // console.log("find file");
    //     // // res.set('Content-Type', file.contentType);
    //     // // res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    //     //
    //     // var readstream = gfs.createReadStream({
    //     //     filename: req.params.filename
    //     //     // root: 'uploads'
    //     // });
    //     //
    //     // readstream.on("error", function(err) {
    //     //     res.end();
    //     // });
    //     // readstream.pipe(res);
    // });
};

// if you add functions above, add it here too
module.exports = {
    getFile
};