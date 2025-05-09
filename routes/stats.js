
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { protect } = require('../middleware/auth');


router.use(protect);

router.get('/all', statsController.getAllStats);

router.get('/user', statsController.getUserStats);

router.get('/deck/:deckName', statsController.getDeckStats);

router.post('/', statsController.recordStats);

router.delete('/reset', statsController.resetStats);

module.exports = router;