module.exports = function(app) {

    var NotFoundController = {
        index: function(req, res) {
            res.render('404');
        }
    };

    return NotFoundController;
};