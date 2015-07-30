module.exports = function(req, res, next) {

    // Module to check if the current user is
    // the one saved in the cookies, if not
    // redirect to home index
    if (!req.session.user) {
        return res.redirect('/');
    }
    return next();
};
