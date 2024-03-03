const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  // /users/:userId, DELETE
  let userId = req.params.userId;
  if (!userId) res.sendStatus(400);
  if (userId != req.session.userId) {
    console.log("Danger: User trying to delete another user");
    return res.redirect("/");
  }
  try {
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );
    //To Do: delete any open sessions
    req.session.destroy(() => {
      res.redirect("/");
    });
    
  } catch (error) {
    res.json({ "status": "error", "message": err.message });
  }
};
