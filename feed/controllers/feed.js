module.exports = function(app) {
    return {
        index: function (req, res) {
            res.render('feed/index', {
                user: req.session.user
            });
        }
    };
};
