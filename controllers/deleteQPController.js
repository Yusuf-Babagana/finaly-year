const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  // /question-papers/delete/year=_&subject=_&scheme=_, DELETE
  let { year, subject, scheme } = req.query;
    if (!year || !subject || !scheme) res.sendStatus(400);
  try {
    const [result] = await pool.query(`DELETE FROM question_papers WHERE year = ? AND subject_id = ? AND scheme = ?`,
      [ year, subject, scheme ]);
    res.redirect("/manage/question-papers");
  } catch (error) {
    res.json({ "status": "error", "message": error.message });
  }
};
