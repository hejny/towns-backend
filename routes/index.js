var express = require('express');
var router = express.Router();
var indexController = require('../controllers/http/index');

/* GET home page. */
router.get('/', indexController.home);

module.exports = router;
