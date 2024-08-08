const { Brand } = require("../model/Brand")
const { User } = require("../model/User")

exports.fetchUserById = async (req, res)=> {
    const { id } = req.params;

    try {
        const user = await User.findById( id, "name email id addresses role").exec()
        res.status(200).json(user)
    }   
    catch(err) {
        res.status(400).json(err)
    }
}


exports.updateUser = async (req, res)=>{
    const { id } = req.params;  //params same name se hi value lega
    //const { userId } = req.params    nahi chalega
    try {
        const temp = await User.findOne({email: req.body.email})
        const user = await User.findOneAndUpdate(
            {'email':temp.email},   //filter query
            {$set: {addresses: req.body.addresses} },   //update query
            {new:true}
        ).exec()
        // By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        res.status(200).json(user);
    }
    catch(err) {
        console.log("err ayya")
        res.status(400).json(err);
    }
};


// exports.createUser = async (req, res)=> {
//     const user = new User(req.body)
//     try {
//         const doc = await user.save()
//         res.status(201).json(doc)
//     }   
//     catch(err) {
//         res.status(400).json(err)
//     }
// }
