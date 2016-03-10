var express = require('express');
var router = express.Router();

var prototypesController = require('../controllers/api/prototypes');

/**
 * GET /objects/prototypes
 * Return all prototypes
 */
router.get('/', prototypesController.getAll);

/**
 * POST /objects/prototypes
 * Creates given prototype
 */
router.post('/', prototypesController.createOne);

/**
 * GET /objects/prototypes/:id
 * Returns prototype with given id
 */
router.get('/:id', prototypesController.getOne);

/**
 * POST /objects/prototypes/:id
 * Update prototype with given id, according to json sent in body
 */
router.post('/:id', prototypesController.updateOne);

/**
 * DELETE /objects/prototypes/:id
 * Delete prototype with given id
 */
router.delete('/:id', prototypesController.deleteOne);

module.exports = router;
