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
    //test UI, REQUIRES test_search.html to be present in the controllers directory
    //To Do: pass subjects to the frontend
    return res.sendFile(__dirname + "/test_search_notes.html");
  }
  const { semester, subject } = req.query;
  //TODO: validate query params
  const tags = req.query.topics ? [req.query.topics.split(' ')] : [''];
  const module = req.query.module ? ((num = Number(req.query.module)) ? [num] : []) : [];
  const searchQuery = `SELECT title, link, s.name as subject, module_no 
  FROM notes c, subjects s
  WHERE c.subject_id = s.id 
    AND s.semester = ? 
    AND s.code = ? 
    ${module.length ? "AND module_no = ?" : ""}
    ${
      tags[0]
        ? "AND c.id IN (SELECT nt.note_id FROM tags t, notes_tags nt WHERE nt.tag_id = t.id AND t.tag_name IN (?))"
        : ""
    }`;

  try {
    const [results] = await pool.query(searchQuery, [
      Number(semester),
      subject,
      ...module,
      ...tags,
    ]);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
