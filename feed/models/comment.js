module.exports = function(sequelize, DataType) {
    var Comment = sequelize.define('Comment', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataType.TEXT
        },
        author: DataType.STRING,
        avatar: DataType.STRING,
        createdAt: {
            type: DataType.DATE,
            defaultValue: DataType.NOW
        },
        photo: DataType.STRING,
        video: DataType.STRING,
        verified: DataType.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'COMMENTS',
        classMethods: {
            //get 10 previous comments
            old: function(config, callback) {
                var _configQuery = {
                    order: 'id DESC',
                    limit: 10
                };
                if (config && config.fromId) {
                    _configQuery.where = {
                        id: {
                            lt: config.fromId
                        }
                    };
                }
                Comment.findAndCountAll(_configQuery)
                    .then(function(result) {
                        var comments = [],
                            resultLength = result.rows.length,
                            hasMorePages = result.count > 10,
                            lastId = null;

                        for (var i = 0; i < resultLength; i++) {
                            var comment = result.rows[i];
                            comments.push({
                                id: comment.id,
                                body: comment.body,
                                author: comment.author,
                                avatar: comment.avatar,
                                createdAt: comment.createdAt,
                                photo: comment.photo,
                                video: comment.video,
                                verified: comment.verified
                            });
                            lastId = comment.id;
                        }
                        callback && callback(null, {
                            comments: comments,
                            hasMorePages: hasMorePages,
                            lastId: lastId
                        });
                    }, function(error) {
                        callback && callback(error);
                    });
            }
        }
    });
    return Comment;
};
