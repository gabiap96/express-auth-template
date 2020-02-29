const express = require('express');
const userController = require('./../controllers/userController');
const passport = require('./../middleware/authentication');

const router = express.Router();

/* GET users listing. */
router.get('/index', passport.ensureAuthenticated, userController.index);

module.exports = router;
