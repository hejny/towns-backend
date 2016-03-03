/**
 * Handler for work with HTML Pages
 * @type {{}}
 */
var indexHandler = {};

/**
 * Returns homepage
 * @param req
 * @param res
 */
indexHandler.home = function(req, res) {
    res.render('index', { title: 'Towns 5 API', env: process.env});
};

module.exports = indexHandler;