const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  const code = req.params.code;
  try {
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s, department_subjects ds, departments d
        WHERE s.id = ds.subject_id
        AND ds.dept_id = d.id AND d.code = ?`,
      [code]
    );
    //To Do: send subjects to FE
  } catch (error) {
    console.log(error.message);
  }
}

const postController = async (req, res) => {
  // res.json(req.body);
  const { link:qpLink, subject:subjectId, year, scheme } = req.body;
  // To Do: validate inputs, especially subject_id
  try {
    const [result] = await pool.query(
      `INSERT INTO question_papers
        VALUES (?, ?, ?, ?)`,
      [year, subjectId, scheme, qpLink]
    );
    res.json({ result });
  } catch (err) {
    res.json({ message: err.message });
    //reload page or something after giving user some message (using err.code)
  }
}

module.exports = { getController, postController };