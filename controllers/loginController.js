const pool = require("../database/cm_database.js");
const bcrypt = require("bcrypt");

getLoginUser = async( req, res ) => {
    res.sendFile(__dirname + "/test_login.html");
}

postLoginUser = async( req, res ) => {
    const username = req.body.userName;
    const password = req.body.password;
    try{
        const [user] = await pool.query('SELECT * FROM users WHERE username= ? ;',
            [username]);
        if(user.length === 0 ){
            res.redirect('/login?error=invalidUser');
        }
        else{
            const hashedPassword = user[0].password;
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
    catch{
        console.log(error);
    }
}

module.exports = { getLoginUser, postLoginUser };