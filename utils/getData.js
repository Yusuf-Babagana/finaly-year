const pool = require("../database/cm_database.js");

const getAllDepartments = async () => {
  try {
    const [departments] = await pool.query(
      `SELECT id, code, name FROM departments`
    );
    return departments;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllSyllabuses = async () => {
  try {
    const [syllabuses] = await pool.query(
      `SELECT s.id, d.code, s.semester, s.scheme FROM syllabuses s, departments d
        WHERE s.dept_id = d.id`);
    return syllabuses;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsernames = async () => {
  try {
    const [usernames] = await pool.query(
      `SELECT username FROM users`
    );
    return usernames;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getUserBookmarks = async (userId) => {
  try {
    const [bookmarks] = await pool.query(
      `SELECT n.* FROM notes n, bookmarks b
        WHERE b.note_id = n.id
          AND b.user_id = ?
    `,
    [userId]);
    return bookmarks;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllSubjects = async (deptId = null) => {
  if (!deptId) {
    try {
      const [subjects] = await pool.query(
        `SELECT name, code, id FROM subjects`,
      );
      return subjects;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    try {
      const [subjects] = await pool.query(
        `SELECT s.name, s.code, s.id FROM subjects s, department_subjects ds
          WHERE s.id = ds.subject_id AND ds.dept_id = ?`, [deptId]
      );
      return subjects;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = { getAllDepartments, getAllSyllabuses, getAllSubjects, getUserBookmarks, getAllUsernames, };