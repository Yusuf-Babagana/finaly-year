const pool = require("../database/cm_database.js");

getSemesterSubjects = async (req, res) => {
  const semester = 5;
  try {
    const [subjects] = await pool.query(
      "SELECT * FROM subjects WHERE semester = ?",
      [semester]
    );
    res.send(
      `<ul><li>${subjects[0].name}</li><li>${subjects[1].name}</li></ul>`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = getSemesterSubjects;