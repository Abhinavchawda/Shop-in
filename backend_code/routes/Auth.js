const express = require('express');
const { createUser, loginUser, checkUser } = require('../controller/Auth');
const passport = require('passport')

const router = express.Router();

//  '/auth' is already included in base path
router.post('/signup', createUser)
        // .post('/login', loginUser)
        
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check', checkUser);    

exports.router = router;