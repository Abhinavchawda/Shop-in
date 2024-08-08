const express = require('express');
const { createProducts, fetchAllProducts, fetchProductById, updateProduct, deleteProduct } = require('../controller/Product');

const router = express.Router();

//  '/products' is already included in base path
router.post('/', createProducts)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct)

exports.router = router;