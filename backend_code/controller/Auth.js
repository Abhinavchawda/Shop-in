const { createTokenAndSaveCookie } = require("../jwt/generateToken");
const { User } = require("../model/User")
const bcrypt = require('bcryptjs');

require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, address, role} = req.body;   //destructuring the values
        
        const check = await User.findOne({ email });        
        if (check) {
            return res.status(400).json({ message: "User (email) already exits !" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);  // (password, salt)
        
        const newUser = await new User({
            "password": hashedPassword,
            username, email, "addresses": address, role
        });
        
        const user = { id: newUser._id, username, email, "addresses": address, role };

        await newUser.save().then(() => {
            createTokenAndSaveCookie(user.email, res);
            res.status(200).json({ message: "Sign-up successful !", user });
        });
    }
    catch (err) {
        console.log("ERROR in signup() in Auth.js")
        res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid credentials !" });
        }

        const user = {
            id: checkUser._id,
            username: checkUser.username,
            email: checkUser.email,
            addresses: checkUser.addresses,
            role: checkUser.role,
            orders: checkUser.orders
        }
        createTokenAndSaveCookie(user.email, res);
        return res.status(201).json({ message: "Log-in successful !", user });
    }
    catch (err) {
        console.log("ERROR in user.js in login : ", err);
        res.status(500).json({ message: "Server err in user.js in login" });
    }
}

exports.checkUserLoggedIn = async (req, res) => {
    const user = req.user;
    if(user)
        res.status(200).json(user);    //status ok
    else
        res.status(500);    //status error
}

exports.logOut = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "Logged out successfully !" });
    }
    catch (err) {
        console.log("ERROR in user.js in logOut : ", err);
        res.status(500).json({ message: "Server err in user.js in logOut()" });
    }
}