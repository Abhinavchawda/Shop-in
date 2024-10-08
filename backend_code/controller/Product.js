const { Product } = require('../model/Product');

exports.createProducts = async (req, res) => {
    //this product we will get from API body
    const product = new Product(req.body);
    try {
        const doc = await product.save();
        res.status(201).json(doc);
    }
    catch (err) {
        console.log("ERROR in createProduct() in Product.js")
        res.status(400).json(err);
    }
};

exports.fetchAllProducts = async (req, res) => {
    // let condition = {}
    // if( !req.query.admin){
    //     condition.deleted = {$ne:true}     // $ne means not equal to 
    // } 

    //use let instead of const
    let query = Product.find({});      
    let totalProductsQuery = Product.find({});

    //first filter by category | eg. electronics, clothing
    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }
    //then filter by brand
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    //then sort karne ko bola hai then we will do sort
    //req.query._sort : kiske basis pe sort karna hai
    //req.query._order : asc YAA desc  (ascending yaa descending) 
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
        // totalProductsQuery = totalProductsQuery.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs = await totalProductsQuery.count().exec();

    try {
        if (req.query._page && req.query._per_page) {
            const page = req.query._page;
            //in frontend, we have used _per_page instead of _limit
            const pageSize = req.query._per_page;       
            const docs = await query.skip(pageSize*(page-1)).limit(pageSize)
            res.set('X-Total-Count', totalDocs);    //to set the header
            res.status(200).json(docs);
        }
        else {
            const docs = await query.exec();        //execute the query
            res.set('X-Total-Count', totalDocs);    //to set the header
            res.status(200).json(docs);
        }
    }
    catch (err) {
        console.log("ERROR in fetchAllProducts() in Product.js")
        res.status(400).json(err);
    }
};

exports.fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(
            id, req.body, 
            { new: true }
        ).exec();
        // By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.

        res.status(200).json(product);
        // product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100))
        // const updatedProduct = await product.save()
        // res.status(200).json(updatedProduct);
    }
    catch (err) {
        console.log("ERROR in updateProduct() in Product.js")
        res.status(400).json(err);
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id, req.body).exec();
        res.status(200).json(product);
    }
    catch (err) {
        console.log("ERROR in deleteProduct() in Product.js")
        res.status(400).json(err);
    }
};