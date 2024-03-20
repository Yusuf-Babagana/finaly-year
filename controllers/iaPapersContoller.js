const pool = require("../database/cm_database.js");

const get = async (req, res) => {
  const code = req.params.code;
  try {
    let [deptId] = await pool.query(
      `SELECT id from departments where code = ?`,
      [code]
    );
    if (deptId.length > 0) {
      deptId = deptId[0].id
    } else {
      throw new Error(`Department with code ${code} does not exist.`)
    }
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s, department_subjects ds
        WHERE s.id = ds.subject_id
        AND ds.dept_id = ?`,
      [deptId]
    );
    return res.render("addIa", { subjects, deptId});
  } catch (error) {
    res.json({ message: error.message });
  }
};

const post = async (req, res) => {
  let { link: qpLink, subject: subjectId, testNo, year, deptId } = req.body;
  // To Do: validate inputs, especially subject_id, year and scheme
  subjectId = Number(subjectId);
  year = Number(year);
  deptId = Number(deptId);
  qpLink = qpLink.split('?')[0];
  try {
    const [result] = await pool.query(
      `INSERT INTO test_papers
        VALUES (?, ?, ?, ?, ?)`,
      [subjectId, deptId, testNo, year, qpLink]
    );
    return res.redirect("/manage/ia-papers");
  } catch (err) {
    res.json({ message: err.message });
    //reload page or something after giving user some message (using err.code)
  }
};

const del = async (req, res) => {
  // /ia-papers/delete/year=_&subject=_&dept=_&number=_,
  let { year, subject, dept, number } = req.query;
  if (!year || !subject || !dept || !number) return res.sendStatus(400);
  try {
    const [result] = await pool.query(`DELETE FROM test_papers 
    WHERE dept_id = ? AND subject_id = ? AND year = ? AND test_number = ?`, [dept, subject, year, number]);
  } catch (error) {
    return res.json({ "status": "error", "message": error.message });
  }
  res.redirect("/manage/ia-papers");
};

module.exports = { get, post, del };
