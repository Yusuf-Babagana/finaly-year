const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  // /syllabuses/delete/:id
  let id = Number(req.params.id);
  if (!id) res.sendStatus(400);
  let result
  try {
    [result] = await pool.query(
      `DELETE FROM syllabuses WHERE id = ?`, [id]
    );
    res.redirect("/manage/syllabuses");
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};