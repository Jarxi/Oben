const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true
  },
  project_manager: {
    type: String,
    required: true
  },
  start_date:{
    year: Number,
    month: Number,
    day: Number
  },
  project_file: {
    type: String
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
