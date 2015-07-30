// Backend sockets
module.exports = function(io, app) {
    var sockets = io.sockets,
        Comment = app.models.schema.Comment;

    // Connect with client
    sockets.on('connection', function(client) {
        var session = client.handshake.session,
            user = session.user;

        // Receive new comment from client
        client.on('new-message', function(data) {
            newComment(data, function(err, result) {
                if (!err && result) {
                    sendNewComment(result);
                }
            });
        });

        var newComment = function(data, callback) {
            if (!data.msg) {
                callback(new Error('Não pode ser vazio!!'));
            }
            Comment.create({
                body: data.msg,
                author: user.name,
                avatar: user.avatar
            }).then(function(result) {
                callback(null, result);
            },function(error) {
                callback(error);
            });
        };

        // Send new comment to client to display
        var sendNewComment = function(comment) {
            app.render('feed/partials/comment', {
                comment: {
                    id: comment.id,
                    body: comment.body,
                    author: comment.author,
                    avatar: comment.avatar,
                    createdAt: comment.createdAt
                }
            }, function(error, html) {
                client.emit('receive-comment', html);
                client.broadcast.emit('receive-comment', html);
            });
        };

        // Send old comments to client and render the comments
        var sendOldComments = function() {
            Comment.old(null, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                }
                app.render('feed/partials/comments', result, function(err, html) {
                    client.emit('receive-old-comments', html);
                });
            });
        };
        sendOldComments();
    });
};