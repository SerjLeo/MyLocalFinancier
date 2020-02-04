const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    incomes: [
      {
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
        },
        deposits : [
          {
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
              type: mongoose.Schema.Types.Decimal128,
              require: true,
              default: 1
            },
            date: {
              type: Date,
              default: Date.now
            }
          }
        ]
      }
    ],
    categories: [
      {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        description: {
            type: String
        },
        color: {
          type: String,
          default: '#2b1da8'
        }
      }
    ],
    expenses: [
        {
          title: {
              type: String,
              required: true
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
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = Finance = mongoose.model('finance', FinanceSchema)