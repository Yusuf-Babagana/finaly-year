const express = require("express");

const getSemesterSubjectsContoller = require('./controllers/semesterController.js');
const getSubjectMaterialsController = require('./controllers/subjectController.js');
const getRegisterController = require('./controllers/registerController.js');

const registerGet = getRegisterController.registerUserGet;
const registerPost = getRegisterController.registerUserPost;

const getSearchNotesController = require("./controllers/getSearchNotesController.js");
const postSearchNotesController = require("./controllers/postSearchNotesController.js");
const getSearchQPsController = require("./controllers/getSearchQPsController .js");
const postSearchQPsController = require("./controllers/postSearchQPsController.js");

const addNote = require('./controllers/addNoteController.js');
const getAddController = addNote.getController;
const postAddController = addNote.postController;

const addQP = require('./controllers/addQPController.js');
const addQPGet = addQP.getController;
const addQPPost = addQP.postController;


const app = express();
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

app.get("/departments/:code/semesters/:semester", getSemesterSubjectsContoller);
app.get("/subjects/:subjectCode", getSubjectMaterialsController);
app.get("/register", registerGet);
app.post("/register", registerPost);
app.get("/departments/:code/search", (req, res) => {
  res.sendFile(__dirname + "/public/test_search.html");
});
app.get("/departments/:code/notes/search", getSearchNotesController);
app.post("/departments/:code/notes/search", postSearchNotesController);
app.get("/departments/:code/question-papers/search", getSearchQPsController);
app.post("/departments/:code/question-papers/search", postSearchQPsController);

app.post("/notes/add", (req, res) => {
  deptCode = req.body.code;
  //if deptCode is not valid, error
  let reUrl = `/departments/${deptCode}${req.path}`;
  res.redirect(reUrl);
})
app.get("/departments/:code/notes/add", getAddController);
app.post("/departments/:code/notes/add", postAddController);

app.post("/question-papers/add", (req, res) => {
  deptCode = req.body.code;
  //if deptCode is not valid, error
  let reUrl = `/departments/${deptCode}${req.path}`;
  res.redirect(reUrl);
});
app.get("/departments/:code/question-papers/add", addQPGet);
app.post("/departments/:code/question-papers/add", addQPPost);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
