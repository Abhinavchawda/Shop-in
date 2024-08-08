const { Order } = require("../model/Order")

exports.fetchOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const order = await Order.find({ user: userId })
        // .populate('product');
        // .populate('user')
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json(err)
    }
};

exports.addOrder = async (req, res) => {
    // const order = req.body;
    console.log("New ORder : ", req.body.selectedAddress)
    const order = new Order(req.body)
    try {
        const doc = await order.save();
        console.log("New ORder : ", doc)
        res.status(201).json(req.body)
    }
    catch (err) {
        console.log("eoor : ", err)
        res.status(400).json(err)
    }
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = Order.findByIdAndDelete(id);
        res.status(200).json(doc)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Order.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(doc)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchAllOrders = async (req, res)=>{

    //use let instead of const
    let query = Order.find({});      // $ne means not equal to 
    let totalOrdersQuery = Order.find({});

    if(req.query._sort && req.query._order) {
        query = query.sort({[req.query._sort]: req.query._order});
        totalOrdersQuery = totalOrdersQuery.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({totalDocs});

    //Now, we will do pagination 
    if(req.query._page && req.query._limit) {
        const page = req.query._page;
        const pageSize = req.query._limit;
        // READ ABOUT IT
        await query.skip(pageSize*(page-1)).limit(pageSize);    
    }

    try {
        const docs = await query.exec();        //execute the query
        res.set('X-Total-Count', totalDocs);    //to set the header
        res.status(200).json(docs);
    }
    catch(err) {
        res.status(400).json(err);
    }
};