//If not found return this error
exports.notFoundError = function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
};

//If other errors return this error
exports.error = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('Error', {
        message: err.message,
        error: err
    });
};