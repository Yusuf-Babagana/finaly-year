const pool = require("../database/cm_database.js");
const updateTags = require("../utils/updateTags.js");

const getController = async (req, res) => {
  const code = req.params.code;
  try {
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s, department_subjects ds, departments d
        WHERE s.id = ds.subject_id
        AND ds.dept_id = d.id AND d.code = ?`,
      [code]
    );
    const [tags] = await pool.query(
      `SELECT tag_name FROM tags`
    )
    //To Do: send subjects and tags to FE
    res.render("addNote", { subjects, tags, code });
  } catch (error) {
    console.log(error.message);
  }
}

const postController = async (req, res) => {
  // res.json(req.body);
  const { link: noteLink, subject: subjectId, module, title } = req.body;
  // To Do: validate inputs, especially subject_id
  let noteID;
  let status = "undefined";
  try {
    const [result] = await pool.query(
      `INSERT INTO notes
        VALUES (null, ?, ?, ?, ?)`,
      [title, subjectId, module, noteLink]
    );
    noteID = result.insertId;
    status = "success";
  } catch (err) {
    return res.json({ status: "failure", message: err.message });
    //reload page or something after giving user some message (using err.code)
  }
  //tags here are the tag names
  if (req.body.noteTags) {
    tags = req.body.noteTags.split(',');
    let newTags = [], oldTags = [];
    for (let i = 0; i < tags.length; i++) {
      const [tagExists] = await pool.query(`SELECT CASE WHEN EXISTS(
        SELECT * FROM tags WHERE tag_name = ?
        ) THEN 1 ELSE 0 END
        AS exist`,
        [tags[i]]);
      if (tagExists[0].exist)
        newTags.push(tags[i])
      else
        oldTags.push(tags[i]);
    }

    if (newTags.length > 0) {
      try {
        await updateTags.updateForNewTags(newTags, noteID);
      } catch (error) {
        return res.json({ status: "failure", message: error.message });
      }
    }
    if (oldTags.length > 0) {
      try {
        await updateTags.updateForExistingTags(oldTags, noteID);
      } catch (error) {
        return res.json({ status: "failure", message: error.message });
      }
    }
  }
  res.json({ status });
}

module.exports = { getController, postController };