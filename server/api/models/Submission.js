const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require("moment");

// Create Schema for single Post
const SubmissionSchema = new Schema({
    linkedUserId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    departmentId:{
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type_:{
        type: String,
        required: true
    },
    description: {
        type: String,
        default: false
    },
    dateTime: {
        type: Date,
        default: new Date()
    },
    date: {
        type:String

    },
    dispense:{
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    file_url:{
        type: String,
        default: ""
    },
    status:{
        type: String,
        default: "Pending"
    }
});

module.exports = Submission = mongoose.model("submission", SubmissionSchema);
