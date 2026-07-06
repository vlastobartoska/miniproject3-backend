require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const Models = require("./model");

const games = [];

fs.createReadStream("./src/apiSource/vgsales.csv")
  .pipe(csv())
  .on("data", (row) => {
    const year = Number(row.Year);

    games.push({
      rank: Number(row.Rank),
      name: row.Name,
      platform: row.Platform,
      year: isNaN(year) ? null : year,
      genre: row.Genre,
      publisher: row.Publisher,
      na_sales: Number(row.NA_Sales),
      eu_sales: Number(row.EU_Sales),
      jp_sales: Number(row.JP_Sales),
      other_sales: Number(row.Other_Sales),
      global_sales: Number(row.Global_Sales),
    });
  })
  .on("end", async () => {
    try {
      console.log("Games found:", games.length);
      console.log(games[0]);

      await Models.Game.sync();
      await Models.Game.bulkCreate(games);

      console.log(`${games.length} games imported successfully!`);
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
