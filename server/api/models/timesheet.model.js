const mongoose = require('mongoose');

const { Schema } = mongoose;

const HoursSchema = new Schema({
    ticket: {
        type: Number,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    hours: {
        type: Number,
        required: true
    }
});

const DailyHoursSchema = new Schema({
    hours: [HoursSchema],
    total_hours: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const TimesheetSchema = new Schema({
    daily_hours: [DailyHoursSchema],
    submitter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'accepted', 'returned']
    },
});

const SubmitTimesheet = mongoose.model('Timesheet', TimesheetSchema);

module.exports = SubmitTimesheet;