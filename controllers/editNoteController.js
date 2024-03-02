const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  // /departments/:code/notes/edit?id=_
  const code = req.params.code;
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
    const [tags] = await pool.query(`SELECT tag_name FROM tags`);
    //To Do: send current note details, subjects and tags to FE
    // res.json({ subjects, note: note[0], tags });
    res.sendFile("C:/Users/Rajasree/Desktop/Sushma/Code/DBMS-Project/public/test_edit.html");
  } catch (error) {
    console.log(error.message);
  }
}

const putController = async (req, res) => {
  // /departments/:code/notes/edit?id=_
  let {...fieldsToUpdate } = req.body;
  fieldsToUpdate = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([_, v]) => v)
  );
  // To Do: validate inputs, especially subject_id
  let noteId = Number(req.query.id);
  if (!noteId) res.sendStatus(400);
  let status = "undefined";
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
    const [result] = await pool.query(
      `UPDATE notes
          SET
          ${updateString}
          WHERE id = ?`,
      [noteId]
    );
    status = "success";
  } catch (err) {
   return res.json({ status: "error", message: err.message });
  }
  //To Do: edit tags
  // tags here refer to only the tags which aren't already attached to the note
  // tags here are the tag names
}

module.exports = { getController, putController };