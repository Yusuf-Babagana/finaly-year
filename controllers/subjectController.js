const pool = require("../database/cm_database.js");

getSubjectMaterials = async (req, res) => {
    const {subjectCode} = req.params;
    try {
        const [getId] = await pool.query('SELECT id FROM subjects WHERE code= ? ;',
            [subjectCode]);
        const subject_id = getId[0].id;

        const [notes] = await pool.query('SELECT * FROM notes WHERE subject_id = ? ;',
            [subject_id]);  

        const [questionPapers] = await pool.query('SELECT * FROM question_papers WHERE subject_id = ? ;',
            [subject_id]);

        const [syllabus] = await pool.query('SELECT SY.* FROM syllabuses SY, subjects S WHERE S.code = ? AND S.syllabus_id = SY.id ;', [subjectCode]);

        const [tags] = await pool.query('SELECT NT.note_id, T.tag_name FROM notes_tags NT, tags T, notes N WHERE N.subject_id = ? AND N.id = NT.note_id AND NT.tag_id = T.id;', [subject_id]);

        const [test_qps] = await pool.query('SELECT * FROM test_papers WHERE subject_id = ? ;', [subject_id]);

        res.render('subjectMaterials', {subjectCode: subjectCode, notes: notes, questionPapers : questionPapers, syllabus: syllabus, tags: tags, test_qps : test_qps});
    } catch (error) {
        console.log(error);
    }
}

module.exports = getSubjectMaterials;