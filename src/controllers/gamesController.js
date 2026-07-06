const Models = require("../model");

const getAllGames = async (req, res) => {
  try {
    const { genre, platform, limit = 50 } = req.query;

    const where = {};

    if (genre) {
      where.genre = genre;
    }

    if (platform) {
      where.platform = platform;
    }

    const games = await Models.Game.findAll({
      where,
      limit: Number(limit),
      order: [["global_sales", "DESC"]],
    });

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM games WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllGames, getGameById };
