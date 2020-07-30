const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'defaultExpense'
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String
        }
    },
    income: {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    exchangeRate: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

module.exports = Expense = mongoose.model('expense', ExpenseSchema)