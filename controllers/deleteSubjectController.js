const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  // /subjects/delete/:id
  let id = Number(req.params.id);
  if (!id) res.sendStatus(400);
  let result
  try {
    [result] = await pool.query(
      `DELETE FROM department_subjects WHERE subject_id = ?`, [id]
    );
    [result] = await pool.query(
      `DELETE FROM subjects WHERE id = ?`, [id]
    );
    res.redirect("/manage/subjects");
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
