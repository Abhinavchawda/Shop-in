const { User } = require("../model/User")

const crypto = require('crypto')

const SECRET_KEY = 'SECRET_KEY'
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    const user = req.body
    // console.log("user is : ", user)
    try {
        // const newUser = new User({email: user.email, role: user.role, password: user.password, name: user.name})
        // const doc = await newUser.save()
        // res.status(201).json({ id: doc.id, email: doc.email, role: user.role })

        const salt = crypto.randomBytes(16)
        crypto.pbkdf2(
            req.body.password,
            salt,
            31000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                const user = new User({ ...req.body, password: hashedPassword, salt })
                const doc = await user.save();

                req.login({ id: doc.id, role: doc.role }, (err) => {
                    if(err) {
                        res.status(400).json(err)
                    }
                    else {
                        const token = jwt.sign({ id: doc.id, role: doc.role }, SECRET_KEY)
                        res.status(201).json(token)
                    }
                })
            }
        )
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {    
    res.json(req.user)

    // const user = await User.findOne({ email: req.body.email })
    // try {
    //     if(! user) {
    //         res.status(400).json({"message" : "Login Failed"})
    //     }
    //     else if(user.password === req.body.password) {
    //         res.status(200).json({ id: user.id, name: user.name, email: user.email, addresses: user.addresses, role: user.role })
    //     }
    //     else {
    //         console.log(user)
    //         res.status(400).json({"message" : "Login failed"})
    //     }
    // }
    // catch(error) {
    //     res.status(400).json(error)
    // }
}

exports.checkUser = async (req, res) => {
    res.json(req.user)
}
