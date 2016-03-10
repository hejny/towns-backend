var express = require('express');
var router = express.Router();
var authController = require('../controllers/api/auth');

/**
 * GET /auth
 * will return information about the current authorised user
 */
router.get('/', authController.getUser);

/**
 * POST /auth
 * Sending username and password will return web token
 */
router.post('/', authController.createToken);

/**
 * DELETE /auth
 * Removes the token from client
 * TODO: implement this
 */
//router.delete('/', authController.deleteToken);

module.exports = router;
