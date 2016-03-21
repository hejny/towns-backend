var express = require('express');
var router = express.Router();
var userController = require('../controllers/api/user');

/**
 * GET /users
 * Returns list of all users
 */
router.get('/', userController.getAll);

/**
 * POST /users
 * Create new user
 */
router.post('/', userController.createUser);

/**
 * GET /users/me
 * will return information about the current authorised user
 */
router.get('/me', userController.getUser);

/**
 * GET /users/:id
 * Returns user with given id
 */
router.get('/:id', userController.getOne);

/**
 * POST /users/:id
 * Update user with given id, according to json sent in body
 */
router.post('/:id', userController.updateOne);

/**
 * DELETE /users/:id
 * Deletes the users with given id
 */
router.delete('/:id', userController.deleteOne);


module.exports = router;
