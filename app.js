const express = require("express");

const getSemesterSubjects = require('./database/cm_database.js').getSemesterSubjects;
const getSubjectId = require('./database/cm_database.js').getSubjectId;
const getNotes = require('./database/cm_database.js').getNotes;
const getQuestionPapers = require('./database/cm_database.js').getQuestionPapers;

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

app.get("/subjects/21CS54", async(req, res)=>{
  subject_id = await getSubjectId("21CS54");
  // console.log(subject_id[0].id);
  notes = await getNotes(subject_id[0].id);
  questionPapers = await getQuestionPapers(subject_id[0].id);

  res.send(`<h2>Notes</h2>
          <ul><li>${notes[0].title}</li>
          <li>${notes[1].title}</li></ul>
          <h2>Question papers</h2>
          <ul><li>${questionPapers[0].year} Scheme: ${questionPapers[0].scheme}</li>
          <li>${questionPapers[1].year} Scheme: ${questionPapers[1].scheme}</li>
          <li>${questionPapers[2].year} Scheme: ${questionPapers[2].scheme}</li></ul>`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
