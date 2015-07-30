module.exports = function(app) {
    var auth = require('./../middlewares/auth'),
        comment = app.controllers.comment;
    //check if the current user is the user from the cookie and load old comments
    app.get('/comment/old', auth, comment.old);
};
