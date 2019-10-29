const { Submission, Invoice } = require('../models');
const { nextId, increment } = require('./counter.controller');
const moment = require('moment');
const sendErr = require('../utils/sendErr');

const submit = async (req, res) => {
  try {
    const submission = req.body;
    submission.submitter = req.userId;
    if (req.body.type === 'time' || req.body.type === 'expense'){
      // check submit time or expense
      const dateAmountMap = new Map();
      for (let i = 0; i < submission.input.length; i++) {
        const input = submission.input[i];
        const dateAmount = input.dateAmount;
        for (let j = 0; j < dateAmount.length; j++) {
          if (dateAmountMap.has(dateAmount[j].date)) {
            const amount = dateAmountMap.get(dateAmount[j].date) + dateAmount[j].amount;
            dateAmountMap.set(dateAmount[j].date, amount);
          } else{
            dateAmountMap.set(dateAmount[j].date, dateAmount[j].amount);
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
      console.log("invoice");
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

module.exports = {
  submit
};
