
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const deckRoutes = require('./routes/decks');
const statsRoutes = require('./routes/stats');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
    'http://localhost:3000',  
    'https://flashcards-ten-kappa.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/decks', deckRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Flashcard API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});