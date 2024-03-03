const pool = require("../database/cm_database.js");

const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  } else next();
};

const authenticate = async (req, res, next) => {
  try {
    const [user] = await pool.query(`SELECT * FROM users WHERE id = ?`, [req.session.userId]);
    if (user.length === 0) {
      return res.redirect("/login");
    } else {
      return next();
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const authoriseTeacher = async (req, res, next) => {
  try {
    const [user] = await pool.query(`SELECT r.name AS role FROM users u, roles r WHERE u.role_id = r.role_id AND u.id = ?`, [
      req.session.userId,
    ]);
    if (user[0].role === 'teacher' || user[0].role === 'admin') {
      return next();
    } else {
      return res.json({message: "Not a teacher"});
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const authoriseAdmin = async (req, res, next) => {
  try {
    const [user] = await pool.query(
      `SELECT r.name AS role FROM users u, roles r WHERE u.role_id = r.role_id AND u.id = ?`,
      [req.session.userId]
    );
    if (user[0].role === "admin") {
      return next();
    } else {
      return res.json({ message: "Not an admin" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { redirectIfAuthenticated, authenticate, authoriseTeacher, authoriseAdmin };