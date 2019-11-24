const moment = require('moment');
const mongoose = require('mongoose');

const { User } = require('../models');
const sendErr = require('../utils/sendErr');

const updateUserInfo = async (req, res) => {
  try {
    // TODO: Upload W4 file and generate filename
    req.body.w4_filename = '';
    const id = req.body.employee_id;
    let user = await User.findOne({
      employee_id: id
    });
    if (!user) {
      return sendErr(
        res,
        'Internal Error: Cannot find employee with id: ' + id
      );
    }
    if (req.body.w4_filename === null) {
      req.body.w4_filename = '';
    }
    console.log(req.body);
    user = await User.findOneAndUpdate(
      {
        employee_id: req.body.employee_id
      },
      {
        $set: req.body
      }
    );

    if (!user) {
      sendErr(res, '', 'Some error occurred trying to update user info');
    }

    return res.status(200).json({
      message: `User info updated!`,
      user
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: 'All users',
      users
    });
  } catch (err) {
    console.log(err);
    sendErr(res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.find({ _id: req.userId });
    return res.status(200).json({
      message: 'User is found',
      user
    });
  } catch (err) {
    console.log(err);
    sendErr(res, err);
  }
};
// if you add functions above, add it here too
module.exports = {
  updateUserInfo,
  getUsers,
  getUserById
};
