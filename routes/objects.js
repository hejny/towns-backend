var express = require('express');
var router = express.Router();
var objectsController = require('../controllers/api/objects');
var auth = require('../controllers/middleware/auth');

/**
 * GET /objects
 * Return all objects
 */
router.get('/', objectsController.getAll);

/**
 * POST /objects
 * Create received resource
 */
router.post('/', auth.check, objectsController.createOne);

/**
 * GET /objects/:id
 * Returns object with given id
 */
router.get('/:id', objectsController.getOne);

/**
 * POST /objects/:id
 * Update object with given id, according to json sent in body
 */
router.post('/:id', auth.check, objectsController.updateOne);

/**
 * DELETE /objects/:id
 * Deletes the object with given id
 */
router.delete('/:id', auth.check, objectsController.deleteOne);

module.exports = router;
