const Stats = require('../models/Stats');
exports.getAllStats = async (req, res) => {
  try {
    const stats = await Stats.find({});
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getUserStats = async (req, res) => {
  try {
    const stats = await Stats.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.recordStats = async (req, res) => {
  try {
    const { deck, totalCards, correct } = req.body;
    
    if (!deck || !totalCards || correct === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const accuracy = Math.round((correct / totalCards) * 100);
    
    const newStats = new Stats({
      userId: req.user.id, 
      deck,
      totalCards,
      correct,
      accuracy
    });
    
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getDeckStats = async (req, res) => {
  try {
    const { deckName } = req.params;
    
    const stats = await Stats.find({ 
      deck: deckName,
      userId: req.user.id
    }).sort({ date: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetStats = async (req, res) => {
  try {
    await Stats.deleteMany({ userId: req.user.id });
    res.json({ message: 'Statistics reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};