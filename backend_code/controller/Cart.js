const { Cart } = require("../model/Cart")

exports.fetchCartByUser = async (req, res) => {
    const { user } = req.query;
    try {
        //populate :  The function is used to populate reference fields in a document of a certain collection with documents from another collection.
        //populate is to fetch the user and product from the db
        const cartItems = await Cart.find({ user: user })
        .populate([{
                path: 'product',
                model: 'Product'
            }, {
                path: 'user',
                model: 'User'
            }])
            
            
            // .populate('product');
            // .populate('user')
        res.status(200).json(cartItems);
    }
    catch (err) {
        res.status(400).json(err)
    }
};

exports.addToCart = async (req, res) => {
    const cart = new Cart (req.body);
    try {
        const doc = await cart.save();
        const result = await doc.populate([{
            path: 'product',
            model: 'Product'
        }])
        res.status(201).json(result)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        // console.log("id : ", id)
        // const itemId = id;
        // const item = await Cart.findById(id).exec()
        // console.log("item : ", item)
        const cart = await Cart.findByIdAndDelete(id)
        // console.log(cart)
        res.status(200).json(cart)
    }
    catch (err) {
        console.log("err hai")
        res.status(400).json(err)
    }
}

exports.updateCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, {new:true}).exec();
        const result = await cart.populate('product')
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
