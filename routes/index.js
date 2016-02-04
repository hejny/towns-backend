var express = require('express');
var router = express.Router();
var indexHandler = require('../handlers/indexHandler');

/* GET home page. */
router.get('/', indexHandler.home);

module.exports = router;
