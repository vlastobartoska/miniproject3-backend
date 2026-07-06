"use strict";
const { Sequelize } = require("sequelize");
// Sequelize is a package that abstracts out the need to write
// SQL queries, relying instead on their models to do it for you
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
);
const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successful connection to MySQL Database ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
    process.exit(1);
  }
};
connectMysql();
module.exports = {
  Sequelize: sequelize,
};

// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Database connection failed:', err.message);
//     return;
//   }
//   console.log('Connected to MySQL database');
//   connection.release();
// });

// module.exports = pool.promise();
