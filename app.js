const express = require("express");

const getSemesterSubjectsContoller = require('./controllers/semesterController.js');

const getSearchController = require('./controllers/getSearchController.js');
const postSearchNotesController = require("./controllers/postSearchNotesController.js");
const getSearchNotesController = require('./controllers/getSearchNotesController.js');

const app = express();
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

app.get("/departments/:code/semesters/:semester", getSemesterSubjectsContoller);
app.get("/departments/:code/search", (req, res) => {
  res.sendFile(__dirname + "/public/test_search.html");
});
app.get("/departments/:code/notes/search", getSearchNotesController);
app.post("/departments/:code/notes/search", postSearchNotesController);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
