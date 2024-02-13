const express = require("express");

const getSemesterSubjectsContoller = require('./controllers/semesterController.js');

const app = express();
// app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

// app.get("/ise/semesters", (req, res) => {
//   res.sendFile(__dirname + "/html/semesters.html");
// });

app.get("/departments/:code/semesters/:semester", getSemesterSubjectsContoller);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
