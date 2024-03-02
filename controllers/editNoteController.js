const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  // /departments/:code/notes/edit?id=_
  const noteId = req.query.id;
  try {
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s, department_subjects ds, departments d
        WHERE s.id = ds.subject_id
        AND ds.dept_id = d.id AND d.code = ?`,
      [code]
    );
    const [note] = await pool.query(
      `SELECT n.* FROM notes n
        WHERE n.id = ?`,
      [noteId]
    );
    const [tags] = await pool.query(`SELECT name FROM tags`);
    //To Do: send current note details, subjects and tags to FE
    res.json({ subjects, note: note[0], tags });
  } catch (error) {
    console.log(error.message);
  }
}

const putController = async (req, res) => {
  // /departments/:code/notes/edit?id=_
  const { tags, ...fieldsToUpdate } = req.body;
  fieldsToUpdate = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([_, v]) => v)
  );
  // To Do: validate inputs, especially subject_id
  let noteId = req.query.id;
  let status = "undefined";
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    const [result] = await pool.query(
      `UPDATE departments
          SET
          ${updateString}
          WHERE id = ?`,
      [noteId]
    );
    status = "success";
  } catch (err) {
   res.json({ status: "error", message: err.message });
  }
  // tags here refer to only the tags which aren't already attached to the note
  // tags here are the tag names
  let { newTags, oldTags } = tags;
  if (newTags && newTags.length > 0) {
    try {
      let insertedTagId;
      for (var i = 0; i <= newTags.length; i++) {
        const [result1] = await pool.query(
          `INSERT into tags VALUES (null, ?)`,
          [newTags[i]]
        );
        insertedTagId = result1.insertId;
        const [result2] = await pool.query(
          `INSERT INTO notes_tags
          VALUES (?, ?)`,
          [noteId, insertedTagId]
        );
      }
      status = "success";
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }

  if (oldTags && oldTags.length > 0) {
    try {
      const [tagIDs] = await pool.query(
        `SELECT id FROM tags WHERE name in (?)`,
        [oldTags]
      );
      for (var i = 0; i <= tagIDs.length; i++) {
        const [result2] = await pool.query(
          `INSERT INTO notes_tags
            VALUES (?, ?)`,
          [noteId, tagIDs[i]]
        );
      }
      res.json({ status: "success" });
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }
  res.json({ status });
}

module.exports = { getController, putController };