const { User, Auth } = require('../models');
const { encryptPassword, decryptPassword } = require('../utils/password');
const sendErr = require('../utils/sendErr');
const jwt = require('jsonwebtoken')


const signUp = async (req, res) => {
  try {
    const user_data = req.body;
    const password = await encryptPassword(user_data.password);
    user_data.password = password.password;
    const user = await User.create(user_data);
    return res.status(200).json({
      message: "user created!",
      user
    })
  }catch (err){
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
      return sendErr(res, "Email does not exist");
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

    const auth = await Auth.create(newAuth);

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
    await Auth.findOneAndUpdate({
      user: req.userId,
      token: req.headers.authorization.split(' ')[1]
    }, {
      $set: {
        token: null,
        isLoggedIn: false
      }
    }, {
      new: true
    });

    return res.status(200).json({
      message: 'User logged out!'
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const resetPassword = async (req, res) => {
  try{
    const user_data = req.body;
    const email = req.body.email;
    const new_password = req.body.new_password;
    const encrypted_password = await encryptPassword(new_password);
    const user = await User.findOne({
      email
    });

    if (!user){
      return sendErr(res, "Email does not exist");
    }

    const decrypted = await decryptPassword(user_data.password, user.password);
    if (!decrypted.password) {
      return sendErr(res, '', 'Email and Password do not match');
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

    if (!update){
      sendErr(res, '', "Some error occurred tryint to update password");
    }

    return res.status(200).json({
      message: `Password Resetted!`,
      user
    });
  } catch (err){
    return sendErr(res, err);
  }
};

module.exports = {
  signUp,
  signIn,
  resetPassword,
  signOut
}
