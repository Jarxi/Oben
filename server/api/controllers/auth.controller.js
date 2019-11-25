const { User, Auth } = require('../models');
const jwt = require('jsonwebtoken');
const { encryptPassword, decryptPassword } = require('../utils/password');
const sendErr = require('../utils/sendErr');
const { nextId, increment } = require('./counter.controller');
const { send } = require('../utils/sendMail/sendMail');

const signUp = async (req, res) => {
  try {
    const user_data = req.body;
    const email = req.body.email;
    req.body.tempPassword = user_data.password;
    const exist = await User.findOne({
      email
    });
    // let loading = false;

    if (exist) {
      return res.status(401).json({
        message: 'Email already exists!'
      });
    }

    const password = await encryptPassword(user_data.password);
    user_data.password = password.password;
    const employee_id = await nextId({ counter_category: 'employee_id' });
    user_data.employee_id = employee_id.count;
    const user = await User.create(user_data);
    await increment({ counter_category: 'employee_id' });
    send(req);
    return res.status(200).json({
      message: 'user created!',
      user
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const signIn = async (req, res) => {
  try {
    const user_data = req.body;
    const email = req.body.email;
    const user = await User.findOne({
      email
    });

    if (!user) {
      return sendErr(res, 'Email does not exist');
    }

    const decrypted = await decryptPassword(user_data.password, user.password);
    if (!decrypted.password) {
      return sendErr(res, '', 'Email and Password do not match');
    }

    // Generate jsonwebtoken
    const payload = {
      subject: user._id
    };
    const token = await jwt.sign(payload, process.env.JWT_KEY);

    const newAuth = {
      user: user,
      token
    };

    const auth = await Auth.findOneAndUpdate({ user: user }, { $set: newAuth });
    if (auth === null) {
      auth = await Auth.create(newAuth);
    }

    return res.status(200).json({
      message: `User signed in!`,
      token,
      user
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const signOut = async (req, res) => {
  try {
    await Auth.findOneAndUpdate(
      {
        user: req.userId,
        token: req.headers.authorization.split(' ')[1]
      },
      {
        $set: {
          token: null,
          isLoggedIn: false
        }
      }
    );

    return res.status(200).json({
      message: 'User logged out!'
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user_data = req.body;
    const email = req.body.email;
    const new_password = req.body.new_password;
    const encrypted_password = await encryptPassword(new_password);
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({ message: 'Email does not exist' });
    }

    const decrypted = await decryptPassword(user_data.password, user.password);
    if (!decrypted.password) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ message: 'password and email do not match' });
=======
      return sendErr(res, "Email and Password don't match", 'Email and Password do not match');
>>>>>>> 223c7113477f63f125a06e133363ab620610dad7
    }

    const update = await User.findOneAndUpdate(
      {
        email: email
      },
      {
        $set: {
          password: encrypted_password.password
        }
      }
    );

    if (!update) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ message: 'Some error occurred tryint to update password' });
=======
      sendErr(res, '', 'Failed to connect to data server');
>>>>>>> 223c7113477f63f125a06e133363ab620610dad7
    }
    const auth = await Auth.findOneAndUpdate(
      { user: user._id },
      {
        $set: {
          status: 'confirmed'
        }
      },
      { new: true }
    );

    return res.status(200).json({
      message: `Password reset!`,
      user
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const confirmSignUp = async (req, res) => {
  try {
    const auth = await Auth.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: 'confirmed'
        }
      }
    );
    return res.status(200).json({
      message: 'Account is confirmed'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  signUp,
  signIn,
  resetPassword,
  signOut,
  confirmSignUp
};
