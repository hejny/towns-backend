var express = require('express');
var router = express.Router();
var userHandler = require('../handlers/userHandler');

/**
 * GET /user
 * will return information about the current authorised user
 */
router.get('/', userHandler.getUser);

/**
 * POST /user
 * Sending username and password will return web token
 */
router.post('/', userHandler.createToken);

module.exports = router;
