const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthSchema = new Schema({
  token: {
    type: String,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  last_login: {
    type: Date,
    default: moment().format()
  },
  isLoggedIn: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: moment().format()
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed']
  }
});

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;
