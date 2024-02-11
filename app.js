const express = require("express");

const getSemesterSubjects = require('./database/cm_database.js').getSemesterSubjects;

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Home.<h1>`);
});

// app.get("/ise/semesters", (req, res) => {
//   res.sendFile(__dirname + "/html/semesters.html");
// });

app.get("/ise/semesters/5", async (req, res) => {
  subjects = await getSemesterSubjects(5);
  res.send(`<ul><li>${subjects[0].name}</li><li>${subjects[1].name}</li></ul>`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
