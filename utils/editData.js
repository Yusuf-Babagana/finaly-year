const pool = require("../database/cm_database.js");

const editDepartment = async ({ deptId, addSubjects, removeSubjects, ...details }) => {
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
    if (updateString.length > 0) {
      const [result] = await pool.query(
        `UPDATE departments
          SET
          ${updateString}
          WHERE id = ?`,
        [deptId]
      );
    }
    status = "success";
  } catch (err) {
    return JSON.stringify({ "status": "error", "message": err.message });
  }
  try {
    for (var i = 0; i < addSubjects.length; i++) {
      const [result] = await pool.query(
        `INSERT IGNORE INTO department_subjects
          VALUES (?, ?)`,
        [deptId, addSubjects[i]]
      );
    }
    for (var i = 0; i < removeSubjects.length; i++) {
      const [result] = await pool.query(
        `DELETE FROM department_subjects
          WHERE dept_id = ? AND subject_id = ?`,
        [deptId, removeSubjects[i]]
      );
    }
    return JSON.stringify({ "status": "success" });
  } catch (err) {
    JSON.stringify({ "status": "error", "message": err.message });
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
    if (updateString.length > 0) {
      const [result] = await pool.query(
        `UPDATE subjects
          SET
            ${updateString}
            WHERE id = ?`,
        [subjectId]
      );
    }
    return JSON.stringify({ "status": "success" });
  } catch (err) {
    return JSON.stringify({ "status": "error", "message": err.message });
  }
};

const editSyllabus = async ({ syllabusId, ...details }) => {
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(details).filter(([_, v]) => v)
  );
  if (fieldsToUpdate.pdf_link) fieldsToUpdate.pdf_link = `'${fieldsToUpdate.pdf_link.split('?')[0]}'`;
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    if (updateString.length > 0) {
      const [result] = await pool.query(
        `UPDATE syllabuses
          SET ${updateString}
            WHERE id = ?`,
        [syllabusId]
      );
    }
    return JSON.stringify({ "status": "success" });
  } catch (err) {
    return JSON.stringify({ "status": "error", "message": err.message });
  }
};

module.exports = { editDepartment, editSubject, editSyllabus };