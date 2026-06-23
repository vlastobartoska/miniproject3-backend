const db = require('../db');

const createIdea = async (req, res) => {
  try {
    const { idea_name, genre, platform, target_audience, budget, description } = req.body;
    const user_id = req.user.id;

    if (!idea_name) {
      return res.status(400).json({ message: 'Idea name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO game_ideas (user_id, idea_name, genre, platform, target_audience, budget, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, idea_name, genre, platform, target_audience, budget, description]
    );

    res.status(201).json({ message: 'Game idea saved', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getIdeas = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      'SELECT * FROM game_ideas WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createIdea, getIdeas };