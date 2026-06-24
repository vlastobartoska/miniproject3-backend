const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const gameIdeasRoutes = require('./routes/gameIdeas');
const statsRoutes = require('./routes/stats');
const gamesRoutes = require('./routes/games');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Game Studio API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/game-ideas', gameIdeasRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/games', gamesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});