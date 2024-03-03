const getAllDepartments = require('../utils/getData').getAllDepartments;
const getReqdDeptDetails = require("../utils/getData").getReqdDeptDetails;
 const displayDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
    res.render("departments", { "departments": getReqdDeptDetails("display", departments) });
}

const searchDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
  res.render("departments", {
    "departments": getReqdDeptDetails("search", departments),
  });
};

const addNoteDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
  res.render("departments", {
    departments: getReqdDeptDetails("addNote", departments),
  });
};

const addQPDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
  res.render("departments", {
    departments: getReqdDeptDetails("addQP", departments),
  });
};


module.exports = { displayDepts, searchDepts, addNoteDepts, addQPDepts };