require("dotenv").config();
const mysql = require("mysql2");

// sql database connection
const connection = mysql.createPool({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}).promise();

// test query
async function getSemesterSubjects(semester) {
  try {
    const [results] = await connection.query('SELECT * FROM subjects WHERE semester = ?',
      [semester]);
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getSemesterSubjects };