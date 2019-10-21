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

const updateUserInfo = async (req, res) => {
    try{
        // TODO: Upload W4 file and generate filename
        const w4_filename = '';
        const id = req.body.employee_id;
        const user = await User.findOne({
            employee_id: id
        });
        if (!user){
            return sendErr(res, 'Internal Error: Cannot find employee with id: ' + id);
        }


        const update = await User.findOneAndUpdate(
            {
                employee_id: req.body.id
            },
            {
                $set: {
                    team: req.body.team,
                    start_date: req.body.start_date,
                    birthday: req.body.birthday,
                    status: req.body.status,
                    past_status: req.body.past_status,
                    email: req.body.email,
                    phone: req.body.phone,
                    legal_status: req.body.legal_status,
                    visa_expiration: req.body.visa_expiration,
                    insurance: req.body.insurance,
                    dental: req.body.dental,
                    vision: req.body.vision,
                    leader: req.body.leader,
                    team_led: req.body.team_led,
                    approve_timesheet: req.body.approve_timesheet,
                    approve_invoice: req.body.approve_invoice,
                    w4: w4_filename,
                }
            }
        );

        if (!update){
            sendErr(res, '', "Some error occurred trying to update user info");
        }

        return res.status(200).json({
            message: `User info updated!`,
            user
        });
    } catch (err){
        return sendErr(res, err);
    }
};

// if you add functions above, add it here too
module.exports = {
    signUp,
    signIn,
    resetPassword,
    updateUserInfo
};
