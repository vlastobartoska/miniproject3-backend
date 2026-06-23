const db = require('../db');

const topGenres = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT genre, 
             COUNT(*) as game_count, 
             ROUND(AVG(global_sales), 2) as avg_sales,
             ROUND(SUM(global_sales), 2) as total_sales
      FROM games
      WHERE genre IS NOT NULL
      GROUP BY genre
      ORDER BY total_sales DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const topPlatforms = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT platform,
             COUNT(*) as game_count,
             ROUND(SUM(global_sales), 2) as total_sales
      FROM games
      WHERE platform IS NOT NULL
      GROUP BY platform
      ORDER BY total_sales DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const salesByYear = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT year,
             COUNT(*) as game_count,
             ROUND(SUM(global_sales), 2) as total_sales
      FROM games
      WHERE year IS NOT NULL AND year > 0
      GROUP BY year
      ORDER BY year ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { topGenres, topPlatforms, salesByYear };