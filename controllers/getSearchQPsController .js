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
    //test UI, REQUIRES test_search_qps.html to be present in the controllers directory
    //To Do: pass subjects, schemes to the frontend
    return res.sendFile(__dirname + "/test_search_qps.html");
  }
  const { subject } = req.query;
  //TODO: validate query params
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
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
