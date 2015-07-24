module.exports = function (app) {
  var auth = require('./../middlewares/auth'),
      feed = app.controllers.feed;

  app.get('/feed', auth, feed.index);
}
