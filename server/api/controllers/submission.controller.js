const { Submission, Invoice, User } = require('../models');
const { nextId, increment } = require('./counter.controller');
const moment = require('moment');
const sendErr = require('../utils/sendErr');

const submit = async (req, res) => {
  try {
    const submission = req.body;
    submission.submitter = req.userId;
    console.log(req.userId);
    console.log(submission.submitter);
    const user = await User.findById(submission.submitter);
    if (!user) {
      return res.status(500).json({
        'message': 'Failed to find user'
      });
    } else {
      submission.submitter_name = user.first_name + " " + user.last_name;
    }
    if (req.body.type === 'time' || req.body.type === 'expense'){
      // check submit time or expense
      const dateAmountMap = new Map();
      for (let i = 0; i < submission.input.length; i++) {
        if (submission.input[i].project_name.length <= 0) {
          return res.status(500).json({
            'message': 'Project name cannot be empty'
          });
        }
        const input = submission.input[i];
        const dateAmount = input.dateAmount;
        console.log(dateAmount);
        for (let j = 0; j < dateAmount.length; j++) {
          const amount_num = Number(dateAmount[j].amount);
          if (dateAmountMap.has(dateAmount[j].date)) {
            const amount = dateAmountMap.get(dateAmount[j].date) + amount_num;
            if (req.body.type === 'time' && amount > 24) {
              return res.status(500).json({
                message: dateAmount[j].date + " amount is larger than 24"
              });
            }
            dateAmountMap.set(dateAmount[j].date, amount);
          } else{
            if (req.body.type === 'time' && amount_num > 24) {
              return res.status(500).json({
                message: dateAmount[j].date + " amount is larger than 24"
              });
            }
            dateAmountMap.set(dateAmount[j].date, amount_num);
          }
        }
      }


      let totalAmountArrayObject = [];
      for (let [key, value] of dateAmountMap){
        const dateAmountObject = {'date': key, 'amount': value};
        totalAmountArrayObject.push(dateAmountObject);
      }

      submission.total_amount = totalAmountArrayObject;


      if (submission.type === 'time'){
        const id = await nextId({'counter_category': 'time_ticket_id'});
        submission.ticket_no = id.count;
        const sub = await Submission.create(submission);
        await increment({'counter_category': 'time_ticket_id'});
        return res.status(200).json({
          'message': 'Time Sheet submission created!',
          sub
        });
      } else if (submission.type === 'expense') {
        const id = await nextId({'counter_category': 'expense_ticket_id'});
        submission.ticket_no = id.count;
        const sub = await Submission.create(submission);
        await increment({'counter_category': 'expense_ticket_id'});
        return res.status(200).json({
          'message': 'Expense submission created!',
          sub
        });
      } else {
        return res.status(500).json({
          message: "Can only submit time or expense. Please check submission type"
        });
      }
    } else if (req.body.type === 'invoice'){
      const id = await nextId({'counter_category': 'invoice_ticket_id'});
      submission.invoice_number = id.count;
      const sub = await Invoice.create(submission);
      await increment({'counter_category': 'invoice_ticket_id'});
      return res.status(200).json({
        'message': 'Invoice submission created!',
        sub
      });
    }
  } catch (err) {
    console.log(`\n️ Error:\n ${err}`);
    return res.status(500).json({
      message: "Something is wrong",
      err
    });
  }
};

const approve = async (req, res) => {
  try {
    try {
      const submission = await Submission.findById(req.body._id);
      if (submission.status != 'pending') {
        console.log("Cannot approve submissions that are not pending.");
        return res.status(500).json();
      } else {
        const update = await Submission.findOneAndUpdate({_id: req.body._id},
            {$set: {status: "accepted"}});
        if (!update){
          sendErr(res, '', "Cannot approve submission");
        }
        return res.status(200).json({
          message: `Submission approved.`,
          update
        });
      }
    } catch (err){
      console.log("Cannot find submission with id: " + req.body._id);
      return sendErr(res, err);
    }

  } catch (err) {
    console.log(`\n️ Error:\n ${err}`);
    return res.status(500).json({
      message: "Something is wrong",
      err
    });
  }
};

const reject = async (req, res) => {
  try {
    try {
      const submission = await Submission.findById(req.body._id);
      if (submission.status != 'pending') {
        console.log("Cannot reject submissions that are not pending.");
        return res.status(500).json();
      } else {
        const update = await Submission.findOneAndUpdate({_id: req.body._id},
            {$set: {status: "returned",
                    note: req.body.note}});
        if (!update){
          sendErr(res, '', "Cannot reject submission");
        }
        return res.status(200).json({
          message: `Submission rejected.`,
          update
        });
      }
    } catch (err){
      console.log("Cannot find submission with id: " + req.body._id);
      return sendErr(res, err);
    }

  } catch (err) {
    console.log(`\n️ Error:\n ${err}`);
    return res.status(500).json({
      message: "Something is wrong",
      err
    });
  }
};


const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    // find if the search limits user and time range
    const user = req.body.userId;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    if (user && startDate && endDate) {
      const selectedSubmissions = await Submission.find(
          {submitter : user, input : {dateAmount: {date: {$gte: startDate, $lte: endDate}}}});
      return res.status(200).json({
        message: "Submissions found. " + user + " " + startDate + " " + endDate,
        selectedSubmissions
      });
    } else {
      return res.status(200).json({
        message: "Submissions found.",
        submissions
      });
    }
  } catch (err){
    return sendErr(res, err);
  }
};

const update = async (req, res) => {
  try{
    // TODO: Upload W4 file and generate filename
    const user = req.body.user;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const type = req.body.type;


    for (let i = 0; i < req.body.input.length; i++) {
      const project_name = req.body.input[i].project_name;
      const date = req.body.input[i].date;
      const amount = req.body.input[i].amount;
      const update = await Submission.findOneAndUpdate(
          { submitter : user,
            type : type,
          },
          { $set : { "input.$[outer].dateAmount.$[inner].amount" : amount}},
          {
            arrayFilters: [{ "outer.project_name" : project_name}, { "inner.date" : date}]
          }
      );
      const ticket_no = update.ticket_no;
      console.log(ticket_no);

      // recalculate totalamount;
      const dateAmountMap = new Map();
      for (let k = 0; k < update.input.length; k++) {
        const input = update.input[k];
        const dateAmount = input.dateAmount;
        for (let j = 0; j < dateAmount.length; j++) {
          const amount_num = Number(dateAmount[j].amount);
          if (dateAmountMap.has(dateAmount[j].date)) {
            const amount = dateAmountMap.get(dateAmount[j].date) + amount_num;
            if (update.type === 'time' && amount > 24) {
              return res.status(500).json({
                message: dateAmount[j].date + " amount is larger than 24"
              });
            }
            dateAmountMap.set(dateAmount[j].date, amount);
          } else{
            if (update.type === 'time' && amount_num > 24) {
              return res.status(500).json({
                message: dateAmount[j].date + " amount is larger than 24"
              });
            }
            dateAmountMap.set(dateAmount[j].date, amount_num);
          }
        }
      }

      let totalAmountArrayObject = [];
      for (let [key, value] of dateAmountMap){
        const dateAmountObject = {'date': key, 'amount': value};
        totalAmountArrayObject.push(dateAmountObject);
      }
      const update_totalamount = await Submission.findOneAndUpdate(
          { ticket_no : ticket_no},
          { total_amount: totalAmountArrayObject}
      );

      if (!update || !update_totalamount){
        sendErr(res, '', "Some error occurred trying to override submission");
      }
    }

    return res.status(200).json({
      message: `Submission overrode!`
    });
  } catch (err){
    return sendErr(res, err);
  }
};

module.exports = {
  submit,
  approve,
  reject,
  getSubmissions,
  update
};
