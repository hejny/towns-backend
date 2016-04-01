var express = require('express');
var router = express.Router();
var auth = require('../controllers/middleware/auth');
var prototypesController = require('../controllers/api/prototypes');

/**
 * GET /objects/prototypes
 * Return all prototypes
 */
router.get('/', auth.check, prototypesController.getAll);

/**
 * POST /objects/prototypes
 * Creates given prototype
 */
router.post('/', auth.check, prototypesController.createOne);

/**
 * GET /objects/prototypes/:id
 * Returns prototype with given id
 */
router.get('/:id', auth.check, prototypesController.getOne);

/**
 * POST /objects/prototypes/:id
 * Update prototype with given id, according to json sent in body
 */
router.post('/:id', auth.check, prototypesController.updateOne);

/**
 * DELETE /objects/prototypes/:id
 * Delete prototype with given id
 */
router.delete('/:id', auth.check, prototypesController.deleteOne);

module.exports = router;
