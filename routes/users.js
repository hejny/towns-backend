var express = require('express');
var router = express.Router();
var userHandler = require('../handlers/userHandler');

/**
 * POST /users
 * Create new user
 */
router.post('/', userHandler.createUser);

module.exports = router;
