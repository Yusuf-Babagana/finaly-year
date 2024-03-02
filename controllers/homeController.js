const pool = require("../database/cm_database.js");

getHomePage = async (req, res) => {
    try{
        const [departments] = await pool.query('SELECT * FROM DEPARTMENTS;');
        res.json(departments);
    }
    catch (error){
        console.log(error);
    }
}

module.exports = getHomePage;