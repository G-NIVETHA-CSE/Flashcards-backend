
const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.get('/', deckController.getDecks);

router.get('/:id', deckController.getDeckById);

router.post('/', deckController.createDeck);

router.put('/:id', deckController.updateDeck);

router.post('/:id/cards', deckController.addCardsToDeck);

router.delete('/:id', deckController.deleteDeck);

router.delete('/:id/cards/:cardId', deckController.removeCardFromDeck);

module.exports = router;