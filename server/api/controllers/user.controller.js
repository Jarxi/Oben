const moment = require('moment');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { encryptPassword, decryptPassword } = require('../utils/password');
const sendErr = require('../utils/sendErr');

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
    try{
        const user_data = req.body;
        const email = req.body.email;
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

        // Generate jsonwebtoken
        const payload = {
            subject: user._id
        };
        const token = await jwt.sign(payload, process.env.JWT_KEY);

        return res.status(200).json({
            message: `User signed in!`,
            token,
            user
        });
    } catch (err){
        return sendErr(res, err);
    }
}

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

        const update = await User.findOneAndUpdate({
                email: email
            }, {
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
}


// if you add functions above, add it here too
module.exports = {
    signUp,
    signIn,
    resetPassword
};
