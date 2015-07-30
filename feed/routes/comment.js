module.exports = function(app) {
    // Check if the current user is the
    // one from the cookie and load old comments
    var auth = require('./../middlewares/auth'),
        comment = app.controllers.comment;

    app.get('/comment/old', auth, comment.old);
};
