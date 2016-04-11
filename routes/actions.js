var express = require('express');
var router = express.Router();
var actionController = require('../controllers/api/actions');
var auth = require('../controllers/middleware/auth');

/**
 * POST /actions/build
 * builds the prototype for authenticated user
 */
router.post('/build', auth.check, actionController.build);

/**
 * POST /actions/attack
 * builds the prototype for authenticated user
 */
//router.post('/build', auth.check, actionController.attack);

/**
 * POST /actions/repair
 * builds the prototype for authenticated user
 */
//router.post('/build', auth.check, actionController.repair);

/**
 * POST /actions/move
 * builds the prototype for authenticated user
 */
//router.post('/move', auth.check, actionController.move);

module.exports = router;
