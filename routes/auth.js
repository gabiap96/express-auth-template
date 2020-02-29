const express = require('express');
const router = express.Router();

const {forwardAuthenticated} = require('./../middleware/authentication');

const authController = require('./../controllers/authController');

/* GET home page. */
router.get('/login', forwardAuthenticated, authController.loginUserPage);
router.post('/login', authController.loginUser);

router.get('/register', forwardAuthenticated, authController.registerUserPage);
router.post('/register', authController.registerUser);

module.exports = router;
