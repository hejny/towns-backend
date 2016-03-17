var express = require('express');
var router = express.Router();
var authController = require('../controllers/api/auth');

/**
 * GET /auth
 * sending GET request should return status:"ok"
 * TODO: implement this
 */
// router.get('/', authController.get);

/**
 * POST /auth
 * Login
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
