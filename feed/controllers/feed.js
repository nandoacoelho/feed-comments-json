module.exports = function(app) {

    var FeedController = {
        index: function(req, res) {
            res.render('feed/index', {
                user: req.session.user
            });
        }
    };

    return FeedController;
};
