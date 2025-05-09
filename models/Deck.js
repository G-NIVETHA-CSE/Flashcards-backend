const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  wrongAnswers: {  
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    default: 'general'
  },
  cards: [CardSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
});

module.exports = mongoose.model('Deck', DeckSchema);