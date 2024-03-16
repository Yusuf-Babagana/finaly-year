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

const getAllNotes = async () => {
  try {
    const [notes] = await pool.query(
      `SELECT n.id, n.title, s.code, n.module_no, n.link FROM notes n, subjects s
          WHERE n.subject_id = s.id`
    );
    return notes;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllQPs = async () => {
  try {
    const [qps] = await pool.query(
      `SELECT qp.*, s.code FROM question_papers qp, subjects s
          WHERE qp.subject_id = s.id`
    );
    return qps;
  } catch (error) {
    throw new Error(error.message);
  }
};

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

const getReqdDeptDetails = (type, depts) => {
  switch (type) {
    case "display":
      depts.forEach((dept, i, depts) => {
        depts[i]["editLink"] = `/edit?type=department&id=${dept.id}`
        depts[i]["deleteLink"] = `/departments/delete/${dept.code.toLowerCase()}`;
      });
      return depts;
      break;
    case "search":
      depts.forEach((dept, i, depts) => {
        depts[i]["searchNote"] = `/departments/${dept.code.toLowerCase()}/notes/search`
        depts[i]["searchQP"] = `/departments/${dept.code.toLowerCase()}/question-papers/search`
      });
      return depts;
      break;
    case "addNote":
      depts.forEach((dept, i, depts) => {
        depts[i]["addNote"] = `/departments/${dept.code.toLowerCase()}/notes/add`
      });
      return depts;
      break;
    case "addQP":
      depts.forEach((dept, i, depts) => {
        depts[i]["addQP"] = `/departments/${dept.code.toLowerCase()}/question-papers/add`
      });
      return depts;
      break;
    default:
      return depts;
  }
}

module.exports = {
  getAllDepartments, getAllSyllabuses, getAllSubjects, getUserBookmarks,
  getAllUsernames, getReqdDeptDetails, getAllNotes, getAllQPs, getAllUsers
};