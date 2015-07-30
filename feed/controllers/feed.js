module.exports = function(app) {

    // Check if the current user is the one saved in the cookie
    // and render the feed of comments
    return {
        index: function (req, res) {
            res.render('feed/index', {
                user: req.session.user
            });
        }
    };
};
