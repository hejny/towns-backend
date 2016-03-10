var express = require('express');
var router = express.Router();
var userController = require('../controllers/api/user');

/**
 * POST /users
 * Create new user
 */
router.post('/', userController.createUser);

module.exports = router;
