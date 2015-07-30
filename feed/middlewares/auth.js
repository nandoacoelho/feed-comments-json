module.exports = function(req, res, next) {
    //Module to check if the current user is
    // the user saved in the cookies
    if (!req.session.user) {
        return res.redirect('/');
    }
    return next();
};
