const getData = require("../utils/getData");
const express = require("express");
const router = express.Router();

router.get("/departments", async (req, res) => {
  let departments = [];
  try {
    departments = await getData.getAllDepartments();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageDepts", {
    departments: getData.getReqdDeptDetails("display", departments),
  });
});
router.get("/subjects", async (req, res) => {
  let subs = [];
  try {
    subs = await getData.getAllSubjects();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageSubjects", {subs});
});
module.exports = router;
