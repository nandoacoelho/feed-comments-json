const KEY = 'feed.sid',
    SECRET = 'feed';
var express = require('express'),
    error = require('./middlewares/error'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cookie = cookieParser(SECRET),
    csurf = require('csurf'),
    store = new expressSession.MemoryStore();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cookie);
app.use(expressSession({
  secret: SECRET,
  name: KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(csurf());
app.use(function(req, res, next) {
    res.locals._csrf = req.csrfToken();
    next();
});

io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('acesso negado'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

load('models/schema.js')
    .then('controllers')
    .then('routes')
    .into(app);

require('./sockets/feed.js')(io, app);


// error handlers
app.use(error.notFoundError);
app.use(error.error);


//START
require('./boot')(app).start(function() {
    server.listen(3000, function() {
        console.log('ITS ALIVE!! Acesse: http://localhost:3000');
    });
});

module.exports = app;
