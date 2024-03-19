const pool = require("../database/cm_database.js");

const getController = async (req, res) => {
  // /notes/edit?id=_
  const noteId = req.query.id;
  try {
    const [subjects] = await pool.query(
      `SELECT s.id, s.code, s.name FROM subjects s`
    );
    const [note] = await pool.query(
      `SELECT n.* FROM notes n
        WHERE n.id = ?`,
      [noteId]
    );
    const [tags] = await pool.query(`SELECT tag_name FROM tags`);
    //To Do: send current note details, subjects and tags to FE
    res.render("editNote", { subjects, note: note[0], tags});

  } catch (error) {
    console.log(error.message);
  }
}

const putController = async (req, res) => {
  // notes/edit?id=_
  let fieldsToUpdate = Object.fromEntries(
    Object.entries(req.body).filter(([_, v]) => Boolean(v))
  );
  // To Do: validate inputs, especially subject_id
  let noteId = Number(req.query.id);
  if (!noteId) return res.sendStatus(400);
  if (fieldsToUpdate.subject_id && !Number(fieldsToUpdate.subject_id)) return res.sendStatus(400);
  if (fieldsToUpdate.link) fieldsToUpdate.link = `'${fieldsToUpdate.link.split('?')[0]}'`;
  let status = "undefined";
  let updateString = "";
  try {
    for (var field in fieldsToUpdate) {
      updateString += `${field} = ${fieldsToUpdate[field]}, `;
    }
    if (updateString.length > 0) {
      updateString = updateString.slice(0, updateString.length - 2); //to remove last comma and space
      const [result] = await pool.query(
        `UPDATE notes
            SET
            ${updateString}
            WHERE id = ?`, [noteId]);
    }
    status = "success";
  } catch (err) {
   return res.json({ "status": "error", "message": err.message });
  }
  //To Do: edit tags
  // if possible, only take tags which aren't already attached to the note
  // tags here are the tag names
  return res.redirect("/manage/notes");
}

module.exports = { getController, putController };