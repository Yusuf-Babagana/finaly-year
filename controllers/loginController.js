const pool = require("../database/cm_database.js");
const bcrypt = require("bcrypt");

getLoginUser = async( req, res ) => {
    res.sendFile(__dirname + "/test_login.html");
}

postLoginUser = async( req, res ) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const [userExists] = await pool.query('SELECT * FROM users WHERE email= ? ;',
            [email]);
        if(userExists.length === 0 ){
            res.redirect('/login?error=invalidUser');
        }
        else{
            const hashedPassword = userExists[0].password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (result) {
                    res.redirect('/');
                }
                else{
                    res.redirect("/login?error=incorrectpassword");
                }

            });
        }
    }
    catch (error){
        console.log(error);
    }
}

module.exports = { getLoginUser, postLoginUser };