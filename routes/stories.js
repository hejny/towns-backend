var express = require('express');
var router = express.Router();
var storiesController = require('../controllers/api/stories');
var auth = require('../controllers/middleware/auth');

/**
 * GET /stories
 * Returns list of all stories
 */
router.get('/', auth.check, storiesController.getAll);

/**
 * POST /stories
 * TODO
 * Create new story
 */
//router.post('/', auth.check, storiesController.createUser);

/**
 * GET /stories/:id
 * TODO
 * Returns story with given id
 */
//router.get('/:id', auth.check, storiesController.getOne);

/**
 * POST /stories/:id
 * TODO
 * Updates story with given id, according to json sent in body
 */
//router.post('/:id',  auth.check, storiesController.updateOne);

/**
 * DELETE /stories/:id
 * TODO
 * Deletes the story with given id
 */
//router.delete('/:id', auth.check, storiesController.deleteOne);


module.exports = router;
