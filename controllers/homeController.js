const pool = require("../database/cm_database.js");

getHomePage = async (req, res) => {
    try{
        const [departments] = await pool.query('SELECT * FROM DEPARTMENTS;');
        res.render('home', {departments: departments});
    }
    catch (error){
        console.log(error);
    }
}

module.exports = getHomePage;