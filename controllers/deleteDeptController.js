const pool = require("../database/cm_database.js");

module.exports = async (req, res) => { 
  // /departments/:code, DELETE
  let code = req.params.code;
  if (!code) res.sendStatus(400);
  try {
    const [result] = await pool.query(
      `DELETE FROM departments WHERE code = ?`,
      [code]
    )
    res.redirect('/departments');
  } catch (error) {
    res.json({ "status": "error", "message": err.message });
  }
}