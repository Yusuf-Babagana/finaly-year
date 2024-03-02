const pool = require("../database/cm_database.js");

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
      `SELECT name FROM tags`
    )
    //To Do: send subjects and tags to FE
  } catch (error) {
    console.log(error.message);
  }
}

const postController = async (req, res) => {
  // res.json(req.body);
  const { link:noteLink, subject:subjectId, module, title } = req.body;
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
    res.json({ message: err.message });
    //reload page or something after giving user some message (using err.code)
  }
  //tags here are the tag names
  let { newTags, oldTags } = req.body.tags;
  if (newTags.length > 0) {
    try {
      let insertedTagId;
      for (var i = 0; i <= newTags.length; i++) {
        const [result1] = await pool.query(`INSERT into tags VALUES (null, ?)`, [newTags[i]]);
        insertedTagId = result1.insertId;
        const [result2] = await pool.query(
          `INSERT INTO notes_tags
          VALUES (?, ?)`,
          [noteID, insertedTagId]
        );
      }
      status = "success";
    } catch (err) {
      return JSON.stringify({ status: "error", message: err.message });
    }
  }

  if (oldTags.length > 0) {
    try {
      const [tagIDs] = await pool.query(`SELECT id FROM tags WHERE name in (?)`, [oldTags]);
      for (var i = 0; i <= tagIDs.length; i++) {
        const [result2] = await pool.query(
          `INSERT INTO notes_tags
            VALUES (?, ?)`,
          [noteID, tagIDs[i]]
        );
      }
      return JSON.stringify({ status: "success" });
    } catch (err) {
      return JSON.stringify({ status: "error", message: err.message });
    }
  }
  return JSON.stringify({ status });
}

module.exports = { getController, postController };