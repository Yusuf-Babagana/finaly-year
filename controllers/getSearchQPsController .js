const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    const [subjects] = await pool.query(
      `SELECT name, code FROM subjects WHERE id in (
        SELECT subject_id FROM department_subjects WHERE dept_id = (
        SELECT id FROM departments WHERE code = ?
        )
      )`,
      [req.params.code]
    );
    const [schemes] = await pool.query(
      `SELECT DISTINCT scheme FROM question_papers`
    );
    return res.render("searchQp", { subjects, code: req.params.code, schemes });
  }
  const { subject } = req.query;
  //TODO: validate query params
  if (!subject) {
    return res.sendStatus(400);
  }
  const scheme = req.query.scheme ? ((num = Number(req.query.scheme)) ? [num] : []) : [];
  const searchQuery = `SELECT year, link, s.name as subject, scheme 
  FROM question_papers qp, subjects s
  WHERE qp.subject_id = s.id 
    AND s.code = ? 
    ${scheme.length ? "AND qp.scheme = ?" : ""}`;

  try {
    const [results] = await pool.query(searchQuery, [
      subject,
      ...scheme,
    ]);
    res.render("searchQpResults", {results});
  } catch (error) {
    console.log(error);
  }
};
