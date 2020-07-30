const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
    income: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'income'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    icon: {
        type: String,
        require: true,
        default: 'defaultDeposit'
    },
    amount: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        require: true,
        default: 'USD'
    },
    exchangeRate: {
        type: Number,
        require: true,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Deposit = mongoose.model('deposit', DepositSchema)