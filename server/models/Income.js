const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Cash'
    },
    icon: {
        type: String,
        default: 'Wallet'
    },
    balance: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    color: {
        type: String,
        default: '#2360c2'
    }
});

module.exports = Income = mongoose.model('income', IncomeSchema)