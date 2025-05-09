const Deck = require('../models/Deck');
exports.getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({});
    res.json(decks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.json(deck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createDeck = async (req, res) => {
  try {
    const { name, category, cards, difficulty } = req.body;
    const existingDeck = await Deck.findOne({ name: name.toLowerCase() });
    if (existingDeck) {
      return res.status(400).json({ message: 'A deck with this name already exists' });
    }
    const processedCards = (cards || []).map(card => {
      let wrongAnswers = [];
      if (card.wrongAnswers && Array.isArray(card.wrongAnswers)) {
        wrongAnswers = card.wrongAnswers.filter(
          answer => answer && typeof answer === 'string' && answer.trim() !== ''
        );
      }
      
      return {
        front: card.front,
        back: card.back,
        wrongAnswers: wrongAnswers
      };
    });
    
    const deck = new Deck({
      name: name,
      category: category || 'general',
      difficulty: difficulty || 'medium',
      cards: processedCards
    });
    
    const newDeck = await deck.save();
    res.status(201).json(newDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.addCardsToDeck = async (req, res) => {
  try {
    const { cards } = req.body;
    const deck = await Deck.findById(req.params.id);
    
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    const processedCards = (cards || []).map(card => {
      let wrongAnswers = [];
      if (card.wrongAnswers && Array.isArray(card.wrongAnswers)) {
        wrongAnswers = card.wrongAnswers.filter(
          answer => answer && typeof answer === 'string' && answer.trim() !== ''
        );
      }
      
      return {
        front: card.front,
        back: card.back,
        wrongAnswers: wrongAnswers
      };
    });
    
    deck.cards.push(...processedCards);
    deck.updatedAt = Date.now();
    
    const updatedDeck = await deck.save();
    res.json(updatedDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateDeck = async (req, res) => {
  try {
    const { name, category, difficulty } = req.body;
    const deck = await Deck.findById(req.params.id);
    
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    
    if (name) deck.name = name;
    if (category) deck.category = category;
    if (difficulty) deck.difficulty = difficulty;
    deck.updatedAt = Date.now();
    
    const updatedDeck = await deck.save();
    res.json(updatedDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    
    await deck.remove();
    res.json({ message: 'Deck deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.removeCardFromDeck = async (req, res) => {
  try {
    const { cardId } = req.params;
    const deck = await Deck.findById(req.params.id);
    
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    
    deck.cards = deck.cards.filter(card => card._id.toString() !== cardId);
    deck.updatedAt = Date.now();
    
    const updatedDeck = await deck.save();
    res.json(updatedDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};