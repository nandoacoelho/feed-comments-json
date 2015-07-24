module.exports = function(app) {
    var Comment = app.models.schema.Comment;

    var CommentController = {
        old: function(req, res, next) {
            Comment.old({
                    fromId: req.query.thisId
                },
                function(error, result) {
                    if (error) {
                        next(error);
                        return;
                    }
                    res.render('comments', result);
                });
        }
    };
    return CommentController;
};
