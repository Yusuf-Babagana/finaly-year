const pool = require("../database/cm_database.js");
const getUserBookmarks = require("../utils/getData.js").getUserBookmarks;
module.exports = async (req, res) => {
  const userId = req.params.userId;
  if (req.session.userId == userId) {
    //display name, email, role, bookmarks
    try {
      const [userDetails] = await pool.query(
        `SELECT u.username, u.email, r.name FROM users u, roles r
        WHERE u.role_id = r.role_id
        AND u.id = ?`,
        [userId]
      );
      if (userDetails.length === 0) return res.sendStatus(404);
      const bookmarks = await getUserBookmarks(userId);
      // const users = ...userDetails;
      res.render('profile', { users: userDetails[0], bookmarks: bookmarks });
    } catch (error) {
      res.json({status: "failure", messsage: error.messsage})
    }

  } else {
    //display only name and role
    try {
      const [userDetails] = await pool.query(`
      SELECT u.username, r.name AS role FROM users u, roles r
      WHERE u.role_id = r.role_id
      AND u.id = ?`,
        [userId]);
      res.json(userDetails);
    } catch (error) {
      res.json({ status: "failure", messsage: error.messsage });
    }
  }
}