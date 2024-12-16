const jwt = require('jsonwebtoken');

exports.createTokenAndSaveCookie = (email, res) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.cookie("jwt", token, {
        // httpOnly: true, //prevent us from xxs attacks
        secure: true,
        sameSite: true  //prevent us from csrf attacks
    })
};