const jwt = require('jsonwebtoken');

exports.createTokenAndSaveCookie = (email, res) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });
    res.cookie("jwt", token, {
        httpOnly: true, //prevent us from xxs attacks
        secure: true,
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site cookies in production

        sameSite: "none"  //prevent us from csrf attacks
    })
};