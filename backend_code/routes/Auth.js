const express = require('express');
const { createUser, loginUser, logOut, checkUserLoggedIn } = require('../controller/Auth');
const { secureRoute } = require('../middlewares/secureRoute');

const router = express.Router();

//  '/auth' is already included in base path
router.post('/signup', createUser)
    .post('/login', loginUser)
    .post('/logout', logOut)
    .get('/checkUserLoggedIn', secureRoute, checkUserLoggedIn);

exports.router = router;