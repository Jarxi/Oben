const { Submission } = require('../models');
const { nextId, increment } = require('./counter.controller');
const moment = require('moment');

const submit = async (req, res) => {
  try {
    // check submit time or expense
    const submission = req.body;
    const total_amount = 0;

    for (let i = 0; i < submission.input.length; i++){


    }


    if (submission.type === 'time'){
      const id = await nextId().count;
      submission.ticket_no = id;
    } else if (submission.type === 'expense') {

    } else {
      return res.status(500).json({
        message: "Can only submit time or expense. Please check submission type"
      });
    }


  } catch (err) {
    sendErr(err, req, res);
  }
};

module.exports = {
  submit
};
