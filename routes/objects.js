var express = require('express');
var router = express.Router();

/**
 * GET /objects
 * vrati vsetky objekty
 */
router.get('/', function(req, res) {
    res.json({ GET: 'Vypytaj vsetky objekty' });
});

/**
 * POST /objects
 * Vytvor odoslany objekt
 */
router.post('/', function(req, res) {
    res.json({ POST: 'Vytvor odoslany objekt' });
});

/**
 * GET /objects/:id
 * Vypytaj len objekt s id
 */
router.get('/:id', function(req, res) {
    res.json({ GET: 'Vypytaj len objekt s id '+ req.params.id });
});

/**
 * PUT /objects/:id
 * Updatni objekt s danym id
 */
router.put('/', function (req, res) {
    res.send({ PUT: 'Updatni objekt s id ' + req.params.id});
});

/**
 * DELETE /objects/:id
 * Vymaz objekt s danym id
 */
router.delete('/', function (req, res) {
    res.json({ DELETE: 'Vymaz objekt s id' + req.params.id});
});


module.exports = router;
