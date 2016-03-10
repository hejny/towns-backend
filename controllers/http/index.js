/**
 * Handler for work with HTML Pages
 * @type {{}}
 */
var indexController = {};

/**
 * Returns homepage
 * @param req
 * @param res
 */
indexController.home = function(req, res) {
    res.render('index', { title: 'Towns 5 API', env: process.env});
};

module.exports = indexController;