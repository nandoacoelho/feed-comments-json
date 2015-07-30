module.exports = function (app) {
  var auth = require('./../middlewares/auth'),
      feed = app.controllers.feed;

    //check if the current user is the user from the cookie and load feed of comments
    app.get('/feed', auth, feed.index);
};
