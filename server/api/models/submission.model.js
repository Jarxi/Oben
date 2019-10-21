const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  ticket_no: {
    type: Number,
    required: true
  },
  input:[{
    project_name: String,
    dateAmount: [{
      date: Date,
      amount: Number,
    }]
  }],
  type: {
    type: String,
    required: true,
    enum: ['time', 'expense']
  },
  total_amount: [{
    dateAmount: {
      date: Date,
      amount: Number,
    }
  }],
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'accepted', 'returned']
  },
  note: {
    type: String,
  },
  attached_filename: {
    type: String
  },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
