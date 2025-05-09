
const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deck: {
    type: String,
    required: true
  },
  totalCards: {
    type: Number,
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stats', StatsSchema);