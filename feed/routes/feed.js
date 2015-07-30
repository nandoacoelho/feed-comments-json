module.exports = function (app) {
    //check if the current user is the
    // one from the cookie and load feed of comments
    var auth = require('./../middlewares/auth'),
      feed = app.controllers.feed;

    app.get('/feed', auth, feed.index);
};
