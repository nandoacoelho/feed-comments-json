module.exports = function(app) {

    var Comment = app.models.schema.Comment;

    // Render old comments based on the
    // last ID sent from the client
    return {
        old: function (req, res, next) {
            Comment.old({
                    fromId: req.query.thisId
                },
                function (error, result) {
                    if (error) {
                        next(error);
                        return;
                    }
                    res.render('feed/partials/comments', result);
                });
        }
    };
};
