var express = require('express');
var router = express.Router();
var resourcesController = require('../controllers/api/resources');
var auth = require('../controllers/middleware/auth');

/**
 * GET /resources
 * Returns list of all resources
 */
router.get('/', auth.check, resourcesController.getResources);

// /**
//  * POST /resources
//  * Update status of resources
//  */
// router.post('/', resourcesController.updateResources);

module.exports = router;
