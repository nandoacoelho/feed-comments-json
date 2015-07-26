module.exports = function(app) {
    var HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        entrar: function(req, res) {
            var name = req.body.name,
                avatar = req.body.avatar,
                validImg = false;

            //check if the link is really an image
            if(/^http:\/\/.+\.(gif|png|jpg|jpeg)$/i.test(avatar)) {
                validImg = true;
            }
            if (name) {
                if (avatar) {
                    if (validImg === false) {
                        res.render('home/index', {
                            avatarError: true
                        });
                    }
                }
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
