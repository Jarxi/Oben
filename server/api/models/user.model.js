const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    // aic, team_leader, contractor, employee
    type: String,
    required: true,
    default: 'employee',
    enum: ['aic', 'team_leader', 'contractor', 'employee']
  },
  employee_id: {
    type: Number
  },
  phone: {
    type: String
  },
  birthday: {
    type: Date
  },
  start_date: {
    year: Number,
    month: Number,
    day: Number
  },
  supervisor: {
    type: String
  },
  work_email: {
    type: String
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  team_name: {
    type: String
  },
  job_title: {
    type: String
  },
  status: {
    // Full-Time (W4) /Part-Time (W4)/Contractor (W9)/Terminated
    type: String,
    default: 'Full-Time (W4)',
    enum: ['Full-Time (W4)', 'Part-Time (W4)', 'Contractor (W9)', 'Terminated']
  },
  past_status: {
    type: String,
    default: 'NA',
    enum: ['NA', 'FT', 'PT', 'C']
  },
  w4: {
    type: String,
    default: ''
  },
  w9: {
    type: String,
    default: ''
  },
  legal_status: {
    type: String,
    default: 'H-1B',
    enum: ['H-1B', 'L-1', 'Permanent Resident', 'US Citizen']
  },
  visa_expiration: {
    year: Number,
    month: Number,
    day: Number
  },
  contract_expiration: {
    year: Number,
    month: Number,
    day: Number
  },
  contract_on_file: {
    type: String
  },
  insurance: {
    type: String,
    default: 'PRO',
    enum: ['PRO', 'Not Required', 'Other']
  },
  dental: {
    type: String,
    default: 'PRO',
    enum: ['PRO', 'Not Required', 'Other']
  },
  vision: {
    type: String,
    default: 'PRO',
    enum: ['PRO', 'Not Required', 'Other']
  },
  additional_insured: {
    type: String
  },
  language: {
    type: String
  },
  highest_degree: {
    type: String
  },
  graduation: {
    type: String
  },
  certification: {
    type: String
  },
  leader: {
    // indicate if the user is a leader of any team
    type: Boolean
  },
  team_led: {
    // the team that the user leads, only set if leader = true
    type: String
  },
  approve_timesheet: {
    type: Boolean
  },
  approve_invoice: {
    type: Boolean
  },
  payment: {
    type: Object,
    method: {
      type: String
    },
    address: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    rate: {
      type: String
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
