const { Counter} = require('../models');
const sendErr = require('../utils/sendErr');

const createCategory = async (req, res) => {
  try {
    const exist = await Counter.find({counter_category: req.body.counter_category});

    if (exist.length === 0){
      req.body.count = 0;
      const createdCounter = await Counter.create(req.body);
      return res.status(200).json({
        message: "Counter category created!",
        createdCounter
      });
    } else {
      return res.status(500).json({
        message: "Counter category already exists! Cannot override count.",
        num: exist.length
      });
    }
  } catch (err) {
    sendErr(err, req, res);
  }
};

const nextId = async (req, res) => {
  try {
    const counter_category = req.body.counter_category;
    const counter = await Counter.findOne({counter_category: counter_category});

    if (counter.length === 0){
      return res.status(500).json({
        message: "Counter category does not exist. Please check counter_category of request body."
      });
    } else {
      return res.status(200).json({
        message: "Succeed",
        count: counter.count + 1
      });
    }

  } catch (err) {
    sendErr(err, req, res);
  }
};

const increment = async (req, res) => {
  try {
    const counter_category = req.body.counter_category;
    const counter = await Counter.findOne({counter_category: counter_category});

    if (counter.length === 0){
      return res.status(500).json({
        message: "Counter category does not exist. Cannot increment. Please check counter_category of request body."
      });
    } else {
      await Counter.update(
          {counter_category: counter_category},
          { $inc: {count : 1 }},
          { new: true }
      );

      return res.status(200).json({
        message: "Counter incremented",
        count: counter.count + 1
      });
    }

  } catch (err) {
    sendErr(err, req, res);
  }
};

module.exports = {
  createCategory,
  nextId,
  increment,
};
