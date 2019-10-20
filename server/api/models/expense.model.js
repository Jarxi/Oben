const mongoose = require('mongoose');

const { Schema } = mongoose;

const AmountSchema = new Schema({
    ticket: {
        type: Number,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    amount: {
        type: Number,
        required: true
    }
});

const DailyExpenseSchema = new Schema({
    amounts: [AmountSchema],
    total_amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const ExpenseSchema = new Schema({
    daily_amounts: [DailyExpenseSchema],
    invoice_filenames: [String],
    submitter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'accepted', 'returned']
    },
});

const SubmitExpense = mongoose.model('Expense', ExpenseSchema);

module.exports = SubmitExpense;