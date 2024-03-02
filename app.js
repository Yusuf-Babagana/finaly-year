const express = require("express");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const app = express();
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const options = {
  connectionLimit: 10,
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  createDatabaseTable: false,
  schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	},
  endConnectionOnClose: true,
};
const sessionStore = new mysqlStore(options);

const TWELVE_HOURS = 1000 * 60 * 60 * 12;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: TWELVE_HOURS,
    },
  })
);

const PORT = 3000;

const getSemesterSubjectsContoller = require("./controllers/semesterController.js");
const getSubjectMaterialsController = require("./controllers/subjectController.js");
const getRegisterController = require("./controllers/registerController.js");

const registerGet = getRegisterController.registerUserGet;
const registerPost = getRegisterController.registerUserPost;

const getSearchNotesController = require("./controllers/getSearchNotesController.js");
const postSearchNotesController = require("./controllers/postSearchNotesController.js");
const getSearchQPsController = require("./controllers/getSearchQPsController .js");
const postSearchQPsController = require("./controllers/postSearchQPsController.js");

const addNote = require("./controllers/addNoteController.js");
const getAddController = addNote.getController;
const postAddController = addNote.postController;

const addQP = require("./controllers/addQPController.js");
const getAddQP = addQP.getController;
const postAddQP = addQP.postController;

const editNote = require("./controllers/editNoteController.js");
const getEditNote = editNote.getController;
const putEditNote = editNote.putController;

const editQP = require("./controllers/editQPController.js");
const getEditQP = editQP.getController;
const putEditQP = editQP.putController;

const deleteDeptController = require("./controllers/deleteDeptController.js");
const deleteNoteController = require("./controllers/deleteNoteController.js");
const deleteQPController = require("./controllers/deleteQPController.js");

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
app.get("/departments/:code/question-papers/add", getAddQP);
app.post("/departments/:code/question-papers/add", postAddQP);

app.get("/departments/:code/notes/edit", getEditNote);
app.put("/departments/:code/notes/edit", putEditNote);

app.get("/departments/:code/question-papers/edit", getEditQP);
app.put("/departments/:code/question-papers/edit", putEditQP);

app.delete("/departments/:code", deleteDeptController);
app.delete("/notes/delete", deleteNoteController);
app.delete("/question-papers/delete", deleteQPController);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
