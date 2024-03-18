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

router.get("/syllabuses", async (req, res) => {
  let sybs = [];
  try {
    sybs = await getData.getAllSyllabuses();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageSyllabus", {sybs});
})

router.get("/notes", async (req, res) => {
  let notes = [];
  try {
    notes = await getData.getAllNotes();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageNotes", { notes });
});

router.get("/question-papers", async (req, res) => {
  let notes = [];
  try {
    qps = await getData.getAllQPs();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageQPs", { qps });
});

router.get("/users", async (req, res) => {
  let users = [];
  try {
    users = await getData.getAllUsers();
  } catch (error) {
    return res.json({ status: "failure", message: error.message });
  }
  res.render("manageUsers", { users });
});

module.exports = router;
