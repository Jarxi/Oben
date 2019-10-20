const mongoose = require('mongoose');

const { Schema } = mongoose;

const CounterSchema = new Schema({
  counter_category: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
