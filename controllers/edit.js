const editData = require('../utils/editData.js');
const getData = require('../utils/getData.js');

const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  let data = {}, id, details;
  data["type"] = req.query.type;
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
        details = await pool.query(`SELECT * FROM syllabuses WHERE id = ?`, [id]);
        data["departments"] = depts;
        break;
      default:
        return res.sendStatus(400);
    }
    data["currentDetails"] = details[0][0];
    res.render("editData", {...data});
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
}

const postController = async (req, res) => {
  // /edit?type=_&id=_
  if (!req.query.type) res.sendStatus(400);
  let result;
  switch (req.query.type) {
    case "department":
      result = await handleDepartment(req.body, req.query.id);
      break;
    case "subject":
      result = await handleSubject(req.body, req.query.id);
      break;
    case "syllabus":
      result = await handleSyllabus(req.body, req.query.id);
      break;
    default:
      return res.sendStatus(400);
  }
  if (JSON.parse(result).status === "success") {
    return res.redirect("/#departments");
  } else {
    res.send(result);
  }
}

async function handleDepartment(data, id) {
  const { subjects, ...fields } = data;
  let addSubjects = [], removeSubjects = [];
  try {
    if (!subjects == ['nc']) {
      console.log(subjects);
      let currentSubs = await getData.getAllSubjects(Number(id));
      addSubjects = subjects;
      removeSubjects = currentSubs.filter((sub) => !subjects.includes(sub.id));
    }
    return await editData.editDepartment({ deptId: Number(id), addSubjects, removeSubjects, ...fields });
  } catch (err) {
    return JSON.stringify({ "status": "failure", "message": err.message });
  }
}

async function handleSubject(data, id) {
  let syllabus_id = Number(data.syllabus) || null;
  let semester = Number(data.semester) || null;
  let code = data.code || '';
  let name = data.name || '';
  try {
    return await editData.editSubject({ subjectId: Number(id), syllabus_id, semester, code, name});
  } catch (err) {
   return JSON.stringify({ "status": "failure", "message": err.message });
  }
}

async function handleSyllabus(data, id) {
  let dept_id = Number(data.dept);
  semester = Number(data.semester);
  scheme = Number(data.scheme);
  try {
    return await editData.editSyllabus({ syllabusId: Number(id), semester, scheme, dept_id});
  } catch (err) {
    return JSON.stringify({ "status": "failure", "message": err.message });
  }
}

module.exports = { getController, postController };