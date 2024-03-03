const pool = require("../database/cm_database.js");
const bcrypt = require("bcrypt");

registerUserGet = async( req, res ) => {

    switch (req.query.error) {
        case "alreadyexists":
            message = "This email is already registered.";
        break;
        case "usernametaken":
            message = "Username is already taken. Please select another username";
        break;
        default:
            message = undefined;
    }

    const [usernames] = await pool.query('SELECT username FROM users');
    const unames = usernames.map(u => u.username);

    res.render("register", { errorMessage: message, usernames: unames });
}

registerUserPost = async( req, res ) => {

    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    // console.log(username, email, role);
    let sanitisedUName = username.toLowerCase();
    let invalidChars = new RegExp(/\W+/, 'g' );
    sanitisedUName = sanitisedUName.replace(invalidChars, '');
    try {
        const [userExists] = await pool.query('SELECT * FROM users WHERE username = ? ;',
            [sanitisedUName]);
        const [emailExists] = await pool.query('SELECT * FROM users WHERE email = ? ;',
           [email]);

        if( emailExists.length !== 0 ){
            return res.redirect('/register?error=alreadyexists');
        }
        console.log(emailExists);
        if( userExists.length !== 0){
            return res.redirect('/register?error=usernametaken');
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 5);
            const [role_id] = await pool.query('SELECT role_id FROM roles WHERE name = ? ;',[role]);
            
            const [result] = await pool.query(`INSERT INTO users (username, email, role_id, password)
                                VALUES (?, ?, ?, ?)`, 
                                [username, email, role_id[0].role_id, hashedPassword]);

                                
            console.log("New user created");
            req.session.userId = result.insertId;
            req.session.role = role.toLowerCase();
            res.redirect('/');
        }   
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerUserGet,
    registerUserPost
};