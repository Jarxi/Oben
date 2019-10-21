const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  ticket_no: {
    type: Number,
    required: true
  },
  input:[{
    project_name: String,
    date: Date,
    amount: Number,
  }],
  type: {
    type: String,
    required: true,
    enum: ['time', 'expense']
  },
  total_amount: {
    type: Number,
    default: 0
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
  attached_filename: {
    type: String
  },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
