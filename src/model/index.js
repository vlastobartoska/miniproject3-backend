"use strict";
const Game = require("./game");
const GameIdea = require("./gameIdea");
const User = require("./user"); //require the model

GameIdea.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(GameIdea, {
  foreignKey: "user_id",
});

async function init() {
  await User.sync(); // sync the model
  await Game.sync();// also sync any extra models here
  await GameIdea.sync();
}

init();

module.exports = {
  User, Game, GameIdea
};
