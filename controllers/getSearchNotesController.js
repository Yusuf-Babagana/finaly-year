const pool = require("../database/cm_database.js");

module.exports = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    const [subjects] = await pool.query(
      `SELECT name, code FROM subjects WHERE id in (
        SELECT subject_id FROM department_subjects WHERE dept_id = (
        SELECT id FROM departments WHERE code = ?
        )
      )`,
      [req.params.code]
    );
    return res.render("searchNote", { subjects, "code": req.params.code });
  }
  const { subject } = req.query;
  //TODO: validate query params
  if (!subject) {
    return res.sendStatus(400);
  }
  const tags = req.query.topics ? [req.query.topics.split(' ')] : [''];
  const module = req.query.module ? ((num = Number(req.query.module)) ? [num] : []) : [];
  const searchQuery = `SELECT m.id, m.title, m.link, s.code as subject, module_no 
  FROM notes m, subjects s
  WHERE m.subject_id = s.id 
    AND s.code = ? 
    ${module.length ? "AND m.module_no = ?" : ""}
    ${
      tags[0]
        ? "AND m.id IN (SELECT nt.note_id FROM tags t, notes_tags nt WHERE nt.tag_id = t.id AND t.tag_name IN (?))"
        : ""
    }`;

  try {
    const [results] = await pool.query(searchQuery, [
      subject,
      ...module,
      ...tags,
    ]);
    res.render("searchNoteResults", {results});
  } catch (error) {
    console.log(error);
  }
};
