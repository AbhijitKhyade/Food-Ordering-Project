const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//REGISTER
const createUserControllers = async (req, res) => {

    //hashing Password
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    //create New User
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}

//LOGIN USER
const loginUserControllers = async (req, res) => {
   
    let email = req.body.email;
    try {

        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
        }

        //Compare Password
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
        }

        const data = {
            user: {
                id: userData.id
            }
        }

        //Assign Token
        const authToken = jwt.sign(data, process.env.jwtSecret);
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log("...", error);
        res.json({ success: false });
    }
}

module.exports = { createUserControllers, loginUserControllers }