const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
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
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = Category = mongoose.model('category', CategorySchema)