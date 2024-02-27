const express = require("express");

const getSemesterSubjectsContoller = require('./controllers/semesterController.js');
const getSearchController = require('./controllers/getSearchController.js');
const postSearchController = require("./controllers/postSearchController.js");

const app = express();
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

// app.get("/ise/semesters", (req, res) => {
//   res.sendFile(__dirname + "/test-html/semesters.html");
// });

app.get("/departments/:code/semesters/:semester", getSemesterSubjectsContoller);
app.get("/departments/:code/search", getSearchController);
app.post("/departments/:code/search", postSearchController);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
