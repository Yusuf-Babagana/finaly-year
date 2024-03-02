const addData = require('../utils/addData.js');
const getData = require('../utils/getData.js');

const getController = async (req, res) => {
  let departments = [], syllabuses = [];
  try {
    departments = await getData.getAllDepartments();
    syllabuses = await getData.getAllSyllabuses();
    //send depts and sbs to FE
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.json({ departments, syllabuses });
}

const postController = async (req, res) => {
  // /add?type=_
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
  const { code, name } = data;
  let result;
  try {
    return await addData.addDepartment({ code, name });
  } catch (err) {
    return JSON.stringify({ status: "failure", message: err.message });
  }
}

async function handleSubject(data) {
  let { code, name, depts, syllabus, semester } = data;
  let syllabusID = Number(syllabus);
  semester = Number(semester);
  offeringDeptIDs = depts.map(id => Number(id));
  try {
    return await addData.addSubject({ code, name, semester, syllabusID, offeringDeptIDs });
  } catch (err) {
   return JSON.stringify({ status: "failure", message: err.message });
  }
}

async function handleSyllabus(data) {
  let { dept, semester, scheme, link: pdfLink } = data;
  let deptID = Number(dept);
  semester = Number(semester);
  scheme = Number(scheme);
  try {
    return await addData.addSyllabus({ deptID, semester, scheme, pdfLink });
  } catch (err) {
    return JSON.stringify({ status: "failure", message: err.message });
  }
}

module.exports = { getController, postController };