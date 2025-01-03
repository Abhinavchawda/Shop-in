const jwt = require("jsonwebtoken");
const { User } = require("../model/User")

exports.secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;  //get the token from the request
        
        if(!token) {
            return res.status(401).json({ message: "Not authorized "});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);  //verifying the token

        if(!verified) {
            return res.status(403).json({ message: "Invalid token "});
        }

        // const user = {"token": verified.id}
        const { email } = verified;
        const user = await User.findOne({ email }).select("-password");  //removing the password from user
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;      

        next();
    } catch (error) {
        console.log("ERROR in secureRoute.js in secureRoute() : ", error);
        res.status(500).json({ message: "Server error in secureRoute.js in secureRote()" });
    }
}