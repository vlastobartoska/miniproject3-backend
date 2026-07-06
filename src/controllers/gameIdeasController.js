"use strict";

const Models = require("../model");

const createIdea = async (req, res) => {
  try {
    const { idea_name, genre, platform, target_audience, budget, description } = req.body;
    const user_id = req.user.id;

    const existing = await Models.GameIdea.findOne({
      where: { idea_name, user_id },
    });

    if (existing) {
      return res.status(400).json({ message: "The Idea already exists" });
    }

    const gameIdea = await Models.GameIdea.create({
      user_id,
      idea_name,
      genre,
      platform,
      target_audience,
      budget,
      description
    });
    console.log(req.body.idea_name);
    res.status(201).json({ message: 'Game idea saved', id: gameIdea.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

const getIdeas = async (req, res) => {
  try {
    const rows = await Models.GameIdea.findAll({})
    res.status(200).json({result: 200, rows: rows})
  } catch (err) {
    console.log(err);
    res.send({result: 500, error: err.message })
    
  }
}

module.exports = { createIdea, getIdeas };

// const db = require('../db');

// const getIdeas = async (req, res) => {
//   try {
//     const user_id = req.user.id;

//     const [rows] = await db.query(
//       'SELECT * FROM game_ideas WHERE user_id = ? ORDER BY created_at DESC',
//       [user_id]
//     );

//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// module.exports = { createIdea, getIdeas };