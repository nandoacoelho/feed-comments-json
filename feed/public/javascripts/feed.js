$(document).ready(function() {

    var atualizarDatasDeEnvio = function() {
        $('.timeago').html(function() {
            var date = $(this).attr('sent-at'),
                date = date.substring(1, date.length - 1),
                date = new Date(date);
            return window.APP.modules.timeago(date, new Date());
        });
    };

    var send = function() {
        var input = $('#new-message-text');
        var msg = input.val();
        if (msg !== '') {
            socket.emit('new-message', {
                msg: msg
            });
        }
        input.val('');
    };

    var adicionarMensagensAntigas = function(comments) {
        $('#comments').append(comments);
        atualizarDatasDeEnvio();
    };

    var carregarMensagensAntigas = function(lastId) {

        $.ajax({
                url: '/comment/old',
                data: {
                    thisId: lastId
                }
            })
            .done(function(data) {
                $('.more-message-button').remove();
                adicionarMensagensAntigas(data);
            })
            .fail(function() {
                $('.loader').hide();
                $('.more-message-button .text').show();
            });

    }

    var socket = io();

    socket.on('receive-comment', function(comment) {
        $('#comments').prepend(comment);
        atualizarDatasDeEnvio();
    });

    socket.on('receive-old-comments', adicionarMensagensAntigas);

    $('#new-message-send-button').on('click', send);
    $('#new-message-text').keypress(function(event) {
        var key = event.which;
        if (key == 13) { //ENTER
            send();
            return false;
        }
    });

    $('#comments').on('click', '.more-message-button', function() {
        $('.more-message-button .text').hide();
        $('.loader').show();
        var lastId = $(this).attr('last-id-date');
        carregarMensagensAntigas(lastId);
    });

    setInterval(atualizarDatasDeEnvio, 30000);

});
