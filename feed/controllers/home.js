module.exports = function(app) {
    var HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        entrar: function(req, res) {
            var name = req.body.name,
                avatar = req.body.avatar;

            if (name) {
                var user = {
                    name: name,
                    avatar: avatar
                };
                req.session.user = user;
                res.redirect('/feed');
            } else {
                res.render('home/index', {
                    userError: true
                });
            }
        }
    };
    return HomeController;
};
