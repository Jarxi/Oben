const user = require('./user.controller');
const expense = require('./expense.controller');
const project = require('./project.controller');
const counter = require('./counter.controller');
const submission = require('./submission.controller');
const auth = require('./auth.controller');
const team = require('./team.controller');
const file = require('./file.controller');
module.exports = {
    user,
    expense,
    project,
    counter,
    submission,
    auth,
    team,
    file
};
