const express = require('express');
const { fetchOrdersByUser, addOrder, updateOrder, deleteOrder, fetchAllOrders} = require('../controller/Order')

const router = express.Router();

//  '/orders' is already included in base path
router.get('/user/:userId', fetchOrdersByUser)
    .post('/', addOrder)
    .patch('/:id', updateOrder)
    .delete('/:id', deleteOrder)
    .get('/', fetchAllOrders);

exports.router = router;