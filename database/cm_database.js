require("dotenv").config();
const mysql = require("mysql2");

// sql database connection
pool = mysql.createPool({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}).promise();

module.exports = pool;