var express = require('express');
var router = express.Router();
var userController = require('../controllers/api/user');

/**
 * GET /users
 * will return information about the current authorised user
 */
router.get('/', userController.getUser);

/**
 * POST /users
 * Create new user
 */
router.post('/', userController.createUser);

/**
 * TODO: implement this
 * GET /users/:id
 * Returns user with given id
 */
//router.get('/:id', userController.getUserById);

/**
 * TODO: implement this
 * POST /users/:id
 * Update user with given id, according to json sent in body
 */
//router.post('/:id', userController.updateUserById);

/**
 * TODO: implement this
 * DELETE /users/:id
 * Deletes the users with given id
 */
//router.delete('/:id', userController.deleteUserById);


module.exports = router;
