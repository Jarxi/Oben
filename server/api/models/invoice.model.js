const mongoose = require('mongoose');

const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    invoice_number: {
        type: Number,
        required: true
    },
    total_days: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    attached_filename: [{
        type: String,
        required: true
    }],
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

const SubmitInvoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = SubmitInvoice;