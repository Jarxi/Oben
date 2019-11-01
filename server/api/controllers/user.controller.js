const moment = require('moment');
const mongoose = require('mongoose');

const { User } = require('../models');
const sendErr = require('../utils/sendErr');



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
                employee_id: req.body.employee_id
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

const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        return res.status(200).json({
           message: 'All users',
           users
        });
    }catch(err){
        console.log(err);
        sendErr(res, err)
    }
};
// if you add functions above, add it here too
module.exports = {
    updateUserInfo,
    getUsers,
};
