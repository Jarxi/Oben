const mongoose = require('mongoose');
const moment = require('moment');
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
    year: Date,
  },
  project_file: {
    type: String
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
