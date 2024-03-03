const pool = require("../database/cm_database.js");
const bcrypt = require("bcrypt");

getLoginUser = async( req, res ) => {
    let message;
    switch (req.query.error) {
        case "invalidUser":
            message = "This email is not registered.";
        break;
        case "incorrectpassword":
            message = "Incorrect password.";
        break;
        default:
            message = undefined;
    }
    res.render("login", { errorMessage: message });
}

postLoginUser = async( req, res ) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const [userExists] = await pool.query('SELECT u.*, r.name AS role FROM users u, roles r WHERE u.email= ? AND u.role_id = r.role_id;',
            [email]);
        if(userExists.length === 0 ){
            res.redirect('/login?error=invalidUser');
        }
        else{
            const hashedPassword = userExists[0].password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (result) {
                    req.session.userId = userExists[0].id;
                    req.session.role = userExists[0].role.toLowerCase();
                    res.redirect(`/u/${userExists[0].id}/profile`);
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