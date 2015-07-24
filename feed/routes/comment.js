module.exports = function(app) {
    var auth = require('./../middlewares/auth'),
        comment = app.controllers.comment;

    app.get('/comment/old', auth, comment.old);
};
