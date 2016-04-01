module.exports = function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth, Content-Type, Accept");
    
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};