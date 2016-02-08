var express = require('express');
var router = express.Router();

var objectsHandler = require('../handlers/objectsHandler');
var prototypesHandler = require('../handlers/prototypesHandler');

/**
 * GET /objects/prototypes
 * Return all prototypes
 */
router.get('/prototypes', prototypesHandler.getAll);

/**
 * POST /objects/prototypes
 * Creates given prototype
 */
router.post('/prototypes', prototypesHandler.createOne);

/**
 * GET /objects/prototypes/:id
 * Returns prototype with given id
 */
router.get('/prototypes/:id', prototypesHandler.getOne);

/**
 * POST /objects/prototypes/:id
 * Update prototype with given id, according to json sent in body
 */
router.post('/prototypes/:id', prototypesHandler.updateOne);

/**
 * DELETE /objects/prototypes/:id
 * Delete prototype with given id
 */
router.delete('/prototypes/:id', prototypesHandler.deleteOne);


/**
 * GET /objects
 * Return all objects
 */
router.get('/', objectsHandler.getAll);

/**
 * POST /objects
 * Create received resource
 */
router.post('/', objectsHandler.createOne);

/**
 * GET /objects/:id
 * Returns object with given id
 */
router.get('/:id', objectsHandler.getOne);

/**
 * POST /objects/:id
 * Update object with given id, according to json sent in body
 */
router.post('/:id', objectsHandler.updateOne);

/**
 * DELETE /objects/:id
 * Deletes the object with given id
 */
router.delete('/:id', objectsHandler.deleteOne);

module.exports = router;
