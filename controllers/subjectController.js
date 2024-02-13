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
          
        res.json([notes, questionPapers]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = getSubjectMaterials;