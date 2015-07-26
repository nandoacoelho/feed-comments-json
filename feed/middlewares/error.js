exports.notFoundError = function(req, res, next) {
    var err = new Error('This is not the page you were looking for');
    err.status = 404;
    next(err);
};

exports.error = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('Error', {
        message: err.message,
        error: err
    });
};