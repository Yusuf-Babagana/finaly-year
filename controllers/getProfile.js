const pool = require("../database/cm_database.js");
const getUserBookmarks = require("../utils/getData.js").getUserBookmarks;
module.exports = async (req, res) => {
  const userId = req.params.userId;
  let bookmarks = [], userDetails = {};
  if (req.session.userId == userId) {
    //display name, email, role, bookmarks
    try {
      [userDetails] = await pool.query(
        `SELECT u.id, u.username, u.email, r.name as role FROM users u, roles r
        WHERE u.role_id = r.role_id
        AND u.id = ?`,
        [userId]
      );
      if (userDetails.length === 0) return res.sendStatus(404);
      bookmarks = await getUserBookmarks(userId);
      
    } catch (error) {
      return res.json({ status: "failure", message: error.messsage });
    }
    res.render("profile", { user: userDetails[0], bookmarks });

  } else {
    //display only name and role
    try {
      const [userDetails] = await pool.query(`
      SELECT u.username, r.name AS role FROM users u, roles r
      WHERE u.role_id = r.role_id
      AND u.id = ?`,
        [userId]);
      res.render("profile", { user: userDetails[0]});
    } catch (error) {
      res.json({ status: "failure", message: error.messsage });
    }
  }
}