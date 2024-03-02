const editData = require('../utils/editData.js');
const getData = require('../utils/getData.js');

const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  let data = {}, id, details;
  try {
    switch (req.query.type) {
      case "department":
        let subjects = await getData.getAllSubjects();
        id = req.query.id;
        details = await pool.query(`SELECT * FROM departments WHERE id = ?`, [id]);
        data["subjects"] = subjects;
        break;
      case "subject":
        let syllabuses = await getData.getAllSyllabuses();
        id = req.query.id;
        details = await pool.query(
          `SELECT * FROM subjects WHERE id = ?`,
          [id]
        );
        data["syllabuses"] = syllabuses;
        break;
      case "syllabus":
        let depts = await getData.getAllDepartments();
        id = req.query.id;
        details = await pool.query(`SELECT * FROM departments WHERE id = ?`, [id]);
        data["departments"] = depts;
        break;
      default:
        return res.sendStatus(400);
    }
    data["currentDetails"] = details;
    res.json(data);
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
}

const postController = async (req, res) => {
  // /edit?type=_&id=_
  if (!req.query.type) res.sendStatus(400);
  let result;
  switch (req.query.type) {
    case "department":
      result = await handleDepartment(req.body);
      break;
    case "subject":
      result = await handleSubject(req.body);
      break;
    case "syllabus":
      result = await handleSyllabus(req.body);
      break;
    default:
      return res.sendStatus(400);
  }
  if (JSON.parse(result).status === "success") {
    res.send(`Successful!`);
  } else {
    res.send(`Failed. Please try again.`);
  }
}

async function handleDepartment(data) {
  const { subjects, ...fields } = data;
  let addSubjects = [], removeSubjects = [];
  try {
    let currentSubs = getData.getAllSubjects(Number(data.id));
    addSubjects = subjects;
    removeSubjects = currentSubs.filter(sub => !subjects.includes(sub.id));
    return await editData.editDepartment({ deptId: data.id, addSubjects, removeSubjects, ...fields });
  } catch (err) {
    return JSON.stringify({ status: "failure", message: err.message });
  }
}

async function handleSubject(data) {
  let syllabus_id = Number(fieldsToUpdate.syllabus) || null;
  let semester = Number(fieldsToUpdate.semester) || null;
  let code = fieldsToUpdate.code || '';
  let name = fieldsToUpdate.name || '';
  try {
    return await editData.editSubject({ subjectId: data.id, syllabus_id, semester, code, name});
  } catch (err) {
   return JSON.stringify({ status: "failure", message: err.message });
  }
}

async function handleSyllabus(data) {
  let dept_id = Number(data.dept);
  semester = Number(data.semester);
  scheme = Number(data.scheme);
  try {
    return await editData.editSyllabus({ syllabusId:data.id, semester, scheme});
  } catch (err) {
    return JSON.stringify({ status: "failure", message: err.message });
  }
}

module.exports = { getController, postController };