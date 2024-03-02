const pool = require("../database/cm_database.js");

const editDepartment = async ({ deptId, subjects, ...details }) => {
  let status = "undefined";
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(details).filter(([_, v]) => v)
  );
  let updateString = '';
  try {
    for (var field in fieldsToUpdate) { 
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
      const [result] = await pool.query(
        `UPDATE departments
          SET
          ${updateString}
          WHERE id = ?`,
        [deptId]
      );
      status = "success";
  } catch (err) {
    return JSON.stringify({ status: "error", message: err.message });
  }
  try {
    for (var i = 0; i <= subjects.length; i++) {
      const [result] = await pool.query(
        `INSERT INTO department_subjects
          VALUES (?, ?)`,
        [deptId, subjects[i]]
      );
    }
    return JSON.stringify({ status: "success" });
  } catch (err) {
    JSON.stringify({ status: "error", message: err.message });
  }

};

const editSubject = async ({ subjectId, ...details }) => {
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(details).filter(([_, v]) => v)
  );
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    const [result] = await pool.query(
      `UPDATE subjects
        SET
          ${updateString}
          WHERE id = ?`,
      [subjectId]
    );
    return JSON.stringify({ status: "success" });
  } catch (err) {
    return JSON.stringify({ status: "error", message: err.message });
  }
};

const editSyllabus = async ({ syllabusId, ...details }) => {
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(details).filter(([_, v]) => v)
  );
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    const [result] = await pool.query(
      `UPDATE syllabuses
        SET
          ${updateString}
          WHERE id = ?`,
      [syllabusId]
    );
    return JSON.stringify({ status: "success" });
  } catch (err) {
    return JSON.stringify({ status: "error", message: err.message });
  }
};

module.exports = { editDepartment, editSubject, editSyllabus };