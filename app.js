const express = require("express");

const getSemesterSubjectsContoller = require('./controllers/semesterController.js');
const getSubjectMaterialsController = require('./controllers/subjectController.js');
const getRegisterController = require('./controllers/registerController.js');

const registerGet = getRegisterController.registerUserGet;
const registerPost = getRegisterController.registerUserPost;

const app = express();
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

// app.get("/ise/semesters", (req, res) => {
//   res.sendFile(__dirname + "/html/semesters.html");
// });

app.get("/departments/:code/semesters/:semester", getSemesterSubjectsContoller);
app.get("/subjects/:subjectCode", getSubjectMaterialsController);
app.get("/register", registerGet);
app.post("/register", registerPost);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
