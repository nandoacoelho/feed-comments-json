module.exports = function(app) {
    var checkImg = function(url) {
        var arr = ["jpeg", "jpg", "gif", "png"];
        var ext = url.substring(url.lastIndexOf(".") + 1);
        for (var i = 0; i < arr.length; i++) {
            if (ext.indexOf(arr[i]) > -1) {
                return true;
            }
        }
        return false;
    };

    return {
        index: function (req, res) {
            res.render('home/index');
        },
        entrar: function (req, res) {
            var name = req.body.name,
                avatar = req.body.avatar;

            if (name) {
                if (avatar) {
                    if (!checkImg(avatar)) {
                        res.render('home/index', {
                            avatarError: true
                        });
                    }
                }
                req.session.user = {
                    name: name,
                    avatar: avatar
                };
                res.redirect('/feed');

            } else {
                if (avatar) {
                    if (!checkImg(avatar)) {
                        res.render('home/index', {
                            avatarError: true,
                            userError: true
                        });
                    }
                }
                res.render('home/index', {
                    userError: true
                });
            }
        }
    };
};