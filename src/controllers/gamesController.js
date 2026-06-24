const db = require('../db');

const getAllGames = async (req, res) => {
  try {
    const { genre, platform, limit = 50 } = req.query;

    let query = 'SELECT * FROM games WHERE 1=1';
    const params = [];

    if (genre) {
      query += ' AND genre = ?';
      params.push(genre);
    }

    if (platform) {
      query += ' AND platform = ?';
      params.push(platform);
    }

    query += ' ORDER BY global_sales DESC LIMIT ?';
    params.push(parseInt(limit));

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT * FROM games WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllGames, getGameById };