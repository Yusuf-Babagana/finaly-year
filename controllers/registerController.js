const pool = require("../database/cm_database.js");
const bcrypt = require("bcrypt");

registerUserGet = async( req, res ) => {

    res.send("<h1>Register</h1>"+
    "<form action='/register' method='post'>"+
    "<input name='userName', placeholder='UserName'>"+
    "<input type='email', name='email', placeholder='Email id'>"+
    "<input type='password', name='password', placeholder='Password'>"+
    "<input type='checkbox', id='role', name='role', value='student'>"+
    "<label for='role'> I am a student </label>"+
    "<button type='submit' name='submit'>Register</button></form>");
}

registerUserPost = async( req, res ) => {
    // console.log(req.body);

    const username = req.body.userName;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash( req.body.password, 5 );
    const role = (req.body.role)==="student" ? "Student" : "Teacher" ;
    console.log(username, email, hashedPassword, role);

    try {
        const [userExists] = await pool.query('SELECT * FROM users WHERE username= ? ;',
            [username]);
        // console.log(userExists.length);

        if( userExists.length !== 0 ){
            res.send("User already exists!");
        }
        else{
            const [role_id] = await pool.query('SELECT role_id FROM roles WHERE name= ? ;',[role]);
            // console.log(role_id[0].role_id);
            const [result] = await pool.query(`INSERT INTO users (username, email, role_id, password)
                                            VALUES (?, ?, ?, ?)`, 
                                            [username, email, role_id[0].role_id, hashedPassword]);
            console.log("New user created");
            res.send("Thank you for registering!");
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