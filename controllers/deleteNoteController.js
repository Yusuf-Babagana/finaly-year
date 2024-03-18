const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  // /notes/delete?id=_, DELETE
  let noteId = req.query.id;
  if (!noteId) res.sendStatus(400);
  try {
    const [result] = await pool.query(
      `DELETE FROM notes WHERE id = ?`,
      [noteId]
    );
    res.redirect("/manage/notes");
  } catch (error) {
    res.json({ "status": "error", "message": err.message });
  }
};
