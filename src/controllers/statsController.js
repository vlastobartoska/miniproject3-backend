const Models = require("../model");
const { Op, fn, col } = require("sequelize");

const topGenres = async (req, res) => {
  try {

    const rows = await Models.Game.findAll({
      attributes: [
        "genre",
        [fn("COUNT", col("*")), "game_count"],
        [fn("ROUND", fn("AVG", col("global_sales")), 2), "avg_sales"],
        [fn("ROUND", fn("SUM", col("global_sales")), 2), "total_sales"],
      ],
      where: {
        genre: {
          [Op.ne]: null,
        },
      },
      group: ["genre"],
      order: [[fn("SUM", col("global_sales")), "DESC"]],
      limit: 10,
      raw: true,
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
    res.status(500).json({ message: "Server error", error: err.message });
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { topGenres, topPlatforms, salesByYear };

const analyzeIdea = async (req, res) => {
  try {
    const { genre, platform } = req.query;

    if (!genre || !platform) {
      return res
        .status(400)
        .json({ message: "Genre and platform are required" });
    }

    const [rows] = await db.query(
      `
      SELECT 
        COUNT(*) as game_count,
        ROUND(AVG(global_sales), 2) as avg_sales,
        ROUND(SUM(global_sales), 2) as total_sales,
        ROUND(AVG(rating), 2) as avg_rating
      FROM games
      WHERE genre = ? AND platform = ?
    `,
      [genre, platform],
    );

    const data = rows[0];

    if (!data.game_count || data.game_count === 0) {
      return res.json({
        genre,
        platform,
        message: "Not enough data to analyze this combination.",
        score: 0,
        recommendation: "Insufficient data",
      });
    }

    const salesScore = Math.min((data.avg_sales / 2) * 10, 10);
    const ratingScore = data.avg_rating ? (data.avg_rating / 10) * 10 : 5;
    const popularityScore = Math.min((data.game_count / 50) * 10, 10);

    const finalScore = Math.round(
      salesScore * 0.5 + ratingScore * 0.3 + popularityScore * 0.2,
    );

    let recommendation;
    if (finalScore >= 7) {
      recommendation = "Strong market potential";
    } else if (finalScore >= 4) {
      recommendation = "Moderate market potential";
    } else {
      recommendation = "Low market potential";
    }

    res.json({
      genre,
      platform,
      game_count: data.game_count,
      avg_sales: data.avg_sales,
      avg_rating: data.avg_rating,
      score: finalScore,
      recommendation,
      message: `${genre} games on ${platform} have ${recommendation.toLowerCase()} based on available market data.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { topGenres, topPlatforms, salesByYear, analyzeIdea };
