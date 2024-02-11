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

async function getSubjectId(subject){
  try{
    const [subject_id] = await connection.query('SELECT id FROM subjects WHERE code= ? ;',
      [subject]);
    return subject_id;
  }catch (error) {
    console.log(error);
  }
}

async function getQuestionPapers(subject_id){
  try{
    const [papers] = await connection.query('SELECT * FROM question_papers WHERE subject_id = ?',
      [subject_id]);
    return papers;
  }catch (error) {
    console.log(error);
  }
}

async function getNotes(subject_id){
  try{
    const [results] = await connection.query('SELECT * FROM notes WHERE subject_id = ?',
      [subject_id]);
    return results;
  }catch (error) {
    console.log(error);
  }
}

module.exports = { getSemesterSubjects, getQuestionPapers, getNotes, getSubjectId };