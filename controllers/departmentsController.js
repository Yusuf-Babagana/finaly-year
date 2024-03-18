const getAllDepartments = require('../utils/getData').getAllDepartments;
const getReqdDeptDetails = require("../utils/getData").getReqdDeptDetails;

const searchDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
  res.render("departments", {
    departments: getReqdDeptDetails("search", departments),
  });
};

const addMaterialDepts = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    return res.json({ "status": "failure", "message": error.message });
  }
  res.render("departments", {
    departments: getReqdDeptDetails("add", departments),
  });
};

module.exports = { searchDepts, addMaterialDepts };