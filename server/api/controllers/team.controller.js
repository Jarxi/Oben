const moment = require('moment');
const { Team } = require('../models');
const sendErr = require('../utils/sendErr');

const createTeam = async (req, res) => {
  try {
    const newteam = req.body.team_name;
    const exist = await Team.findOne({ team_name: newteam });
    if (exist) {
      return res.status(500).json({
        message: 'Team already exists!'
      });
    }
    const teamcreated = await Team.create({ team_name: newteam });
    return res.status(200).json({
      message: 'Team created!',
      teamcreated
    });
  } catch (err) {
    console.log(err);
    return sendErr(res, err);
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    return res.status(200).json({
      message: 'Teams Found!',
      teams
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamdelete = req.body.team_name;
    const exist = await Team.findOne({ team_name: teamdelete });
    if (!exist) {
      return res.status(500).json({
        message: 'Team does not exist'
      });
    }
    await Team.findOneAndDelete({ team_name: teamdelete });
    return res.status(200).json({
      message: 'Successfully deleted ' + teamdelete
    });
  } catch (err) {
    console.log(err.message);
    return sendErr(res, err);
  }
};

// if you add functions above, add it here too
module.exports = {
  createTeam,
  getTeams,
  deleteTeam
};
