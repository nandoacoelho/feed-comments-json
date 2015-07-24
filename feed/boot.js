module.exports = function(app) {
    var request = require('request'),
        Comment = app.models.schema.Comment;

    var carregarDadosIniciais = function(callback) {
        var url = 'https://raw.githubusercontent.com/SelecaoGlobocom/fernando-almeida-coelho/master/feed-dados.json?token=AFWT5aybH-q4UFiLMZ5UoJ1U6oAgjZe5ks5VuQiXwA%3D%3D';
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var comments = body.postList,
                    mensagensParaSeremGravadas = [];

                for (var i = comments.length - 1; i >= 0; i--) {
                    var comment = comments[i];
                    var photo = null;

                    if (comment.images && comment.images.length > 0) {
                        photo = comment.images[0].url;
                    } else if (comment.videos && comment.videos.length > 0) {
                        photo = 'images/video_placeholder.jpg';
                    }

                    mensagensParaSeremGravadas.push({
                        body: comment.body,
                        author: comment.author.name,
                        avatar: comment.author.avatar,
                        createdAt: comment.createdAt,
                        photo: photo
                    });
                }

                mensagensParaSeremGravadas.sort(function(m1, m2) {
                    if (new Date(m1.createdAt) > new Date(m2.createdAt)) return 1;
                    if (new Date(m1.createdAt) < new Date(m2.createdAt)) return -1;
                    return 0;
                });

                Comment.bulkCreate(mensagensParaSeremGravadas)
                    .then(function() {
                        callback();
                    }, function(error) {
                        console.log(error);
                    });
            }
        });
    };

    var Boot = {
        start: function(callback) {
            console.log('Sincronizando Banco de dados');
            app.models.schema.sequelize.sync().then(function() {
                console.log('Verificando dados previamentes inputados do JSON');
                Comment.count().then(function(c) {
                    if (c === 0) {
                        console.log('Carregando dados do JSON');
                        carregarDadosIniciais(callback);
                    } else {
                        console.log('JSON já carregado anteriormente');
                        callback();
                    }
                });
            });
        }
    };

    return Boot;

};
