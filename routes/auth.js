var express = require('express');
var router = express.Router();
var authController = require('../controllers/api/auth');
var auth = require('../controllers/middleware/auth');

/**
 * GET /auth
 * sending GET request should return status:"ok"
 */
router.get('/', auth.check, authController.getStatus);

/**
 * POST /auth
 * Login
 * Sending username and password will return web token
 */
router.post('/', authController.createToken);

/**
 * DELETE /auth
 * Removes the token from client
 */
//router.delete('/', authController.deleteToken);

module.exports = router;
