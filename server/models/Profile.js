const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    phone: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    options: {
      language: {
        type: String,
        default: 'eng'
      },
      mainCurrency: {
        type: String,
        default: 'USD'
      },
      walletPairs: []
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = Profile = mongoose.model('profile', ProfileSchema)