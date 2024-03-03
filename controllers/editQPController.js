const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  // /departments/:code/question-papers/edit?year=_&subject=_&scheme=_
  const code = req.params.code;
  try {
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s, department_subjects ds, departments d
        WHERE s.id = ds.subject_id
        AND ds.dept_id = d.id AND d.code = ?`,
      [code]
    );
    const qp = { ...req.query };
    res.render("editQp", {subjects, code, qp});
  } catch (error) {
    console.log(error.message);
  }
}

const putController = async (req, res) => {
  // /departments/:code/question-papers/edit?year=_&subject=_&scheme=_
  // res.json(req.body);
  // To Do: validate inputs, especially subject_id
  // ensure the form fields correctly match the table attributes
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(req.body).filter(([_, v]) => v)
  );
  let { year, subject, scheme } = req.query;
  year = Number(year);
  subject = Number(subject);
  scheme = Number(scheme);
  if (!year || !subject || !scheme) return res.sendStatus(400);
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    const [result] = await pool.query(
      `UPDATE question_papers
        SET
          ${updateString}
          WHERE year = ? AND subject_id = ? AND scheme = ?`,
      [year, subject, scheme]
    );
    return res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
}

module.exports = { getController, putController };