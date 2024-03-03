const pool = require("../database/cm_database.js");

const updateForExistingTags = async (oldTags, noteId) => {
  try {
      const [tagIDs] = await pool.query(`SELECT id FROM tags WHERE tag_name in (?)`, [oldTags]);
      for (var i = 0; i <= tagIDs.length; i++) {
        const [result2] = await pool.query(
          `INSERT INTO notes_tags
            VALUES (?, ?)`,
          [noteId, tagIDs[i]]
        );
      }
      return JSON.stringify({ status: "success" });
    } catch (err) {
      throw new Error(err.message);
    }
}

const updateForNewTags = async (newTags, noteId) => {
  try {
    let insertedTagId;
    for (var i = 0; i <= newTags.length; i++) {
      const [result1] = await pool.query(`INSERT into tags VALUES (null, ?)`, [
        newTags[i],
      ]);
      insertedTagId = result1.insertId;
      const [result2] = await pool.query(
        `INSERT INTO notes_tags
          VALUES (?, ?)`,
        [noteId, insertedTagId]
      );
    }
    return JSON.stringify({ status: "success" });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { updateForExistingTags, updateForNewTags };