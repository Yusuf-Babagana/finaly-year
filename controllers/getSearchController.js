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
    return res.sendFile(__dirname + "/test_search.html");
  }
  const { type, topics, semester, subject, module } = req.query;
  const tags = topics ? topics.split(" ") : "";
  const modNum = Number(module);
  
  //TODO: validate query params
  const contentType = type || "notes";
  const searchQuery = `SELECT title, link, s.name as subject, module_no 
  FROM ${contentType} c, subjects s
  WHERE c.subject_id = s.id 
    AND s.semester = ? 
    AND s.code = ? 
    ${modNum ? "AND module_no = ?" : ""}
    ${
      tags.length
        ? "AND c.id IN (SELECT nt.note_id FROM tags t, notes_tags nt WHERE nt.tag_id = t.id AND t.tag_name IN (?))"
        : ""
    }`;

  try {
    const [results] = await pool.query(searchQuery, [
      Number(semester),
      subject,
      ...(modNum ? [modNum] : []),
      ...(tags.length ? [tags] : []),
    ]);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
