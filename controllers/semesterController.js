const pool = require("../database/cm_database.js");

getSemesterSubjects = async (req, res) => {
  const { code, semester } = req.params;
  try {
    const [subjects] = await pool.query(
      `SELECT * FROM subjects WHERE id in (
        SELECT subject_id FROM department_subjects WHERE dept_id = (
          SELECT id FROM departments WHERE code = ?
          )
        ) AND semester = ?`,
      [code, semester]
    );
    res.render("semesterSubjects", { subjects, deptCode: code, semester});
  } catch (error) {
    console.log(error);
  }
};

module.exports = getSemesterSubjects;