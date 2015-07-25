$(document).ready(function() {

    var updateDate = function() {
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

    var addOldComments = function(comments) {
        $('#comments').append(comments);
        updateDate();
    };

    var loadOldComments = function(lastId) {

        $.ajax({
                url: '/comment/old',
                data: {
                    thisId: lastId
                }
            })
            .done(function(data) {
                $('.more-message-button').remove();
                addOldComments(data);
            })
            .fail(function() {
                $('.loader').hide();
                $('.more-message-button .text').show();
            });

    };

    var socket = io();

    socket.on('receive-comment', function(comment) {
        $('#comments').prepend(comment);
        updateDate();
    });

    socket.on('receive-old-comments', addOldComments);

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
        loadOldComments(lastId);
    });

    setInterval(updateDate, 30000);

});
