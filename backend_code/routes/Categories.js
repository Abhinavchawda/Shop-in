const express = require('express');
const {fetchCategories, createCategory} = require('../controller/Category')

const router = express.Router();

//  '/Categories' is already included in base path
router.get('/', fetchCategories).post('/', createCategory);

exports.router = router;