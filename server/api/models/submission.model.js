const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  ticket_no: {
    type: Number,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  input:[{
      date: Date,
      amount: Number
  }],
  type: {
    type: String,
    required: true,
    enum: ['time', 'expense', 'invoice']
  },
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
  file: {
    type: String
  },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
