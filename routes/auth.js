var express = require('express');
var router = express.Router();
var authHandler = require('../handlers/authHandler');

/**
 * GET /auth
 * will return information about the current authorised user
 */
router.get('/', authHandler.getUser);

/**
 * POST /auth
 * Sending username and password will return web token
 */
router.post('/', authHandler.createToken);

/**
 * DELETE /auth
 * Removes the token from client
 * TODO: implement this
 */
//router.delete('/', authHandler.deleteToken);

module.exports = router;
