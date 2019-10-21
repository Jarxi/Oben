const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
    team_name: {
        type: String,
        required: true
    },
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;