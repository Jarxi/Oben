const moment = require('moment');
const mongoose = require('mongoose');

const { User } = require('../models');
const sendErr = require('../utils/sendErr');

const updateUserInfo = async (req, res) => {
  try {
    // TODO: Upload W4 file and generate filename
    req.body.w4_filename = '';
    const id = req.userId;
    let user = await User.findOne({
      _id: req.userId
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
    user = await User.findOneAndUpdate(
      {
        _id: req.userId
      },
      {
        $set: req.body
      },
      {
        new: true
      }
    );

    if (!user) {
      sendErr(res, '', 'Some error occurred trying to update user info');
    }
    console.log(user);
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

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({email: req.body.email});
    return res.status(200).json({msg:'user is deleted'});
  }catch (err){
    console.log(err);
    return res.status(500).json('Server error');
  }
}
// if you add functions above, add it here too
module.exports = {
  updateUserInfo,
  getUsers,
  getUserById,
  deleteUser,
};
