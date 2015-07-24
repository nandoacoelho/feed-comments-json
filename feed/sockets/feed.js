module.exports = function(io, app) {
    var sockets = io.sockets,
        Comment = app.models.schema.Comment;

    sockets.on('connection', function(client) {
        var session = client.handshake.session,
            user = session.user;

        client.on('new-message', function(data) {
            newComment(data, function(err, result) {
                if (!err && result) {
                    SendNewComment(result);
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

        var SendNewComment = function(comment) {
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

        var SendOldComments = function() {
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
        SendOldComments();
    });
};
/**
 * Created by fernandodealmeidacoelho on 22/07/15.
 */
