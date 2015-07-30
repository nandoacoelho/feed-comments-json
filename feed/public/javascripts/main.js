$(document).ready(function() {

    //Update date from the comments using jQuery Timeago
    var updateDate = function() {
        $('.timeago').html(function() {
            var date = $(this).attr('sent-at'),
                date = date.substring(1, date.length - 1),
                date = new Date(date);
            return jQuery.timeago(date);
        });
    };

    //send new comment
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

    //Add previous comments with date updated
    var addOldComments = function(comments) {
        $('#comments').append(comments);
        updateDate();
    };

    //Load 10 previous comments given the Id from the last comment displayed
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
                $('.progress.indeterminate').hide();
                $('.more-message-button.blue.waves-effect.waves-light.btn').show();
            });

    };

    //Open socket with the backend
    var socket = io();

    //Receive comments from backend and update date
    socket.on('receive-comment', function(comment) {
        $('#comments').prepend(comment);
        updateDate();
    });

    //Receive old comments from backend
    socket.on('receive-old-comments', addOldComments);

    //Send new comment to feed
    $('#new-message-send-button').on('click', send);
    $('#new-message-text').keypress(function(event) {
        var key = event.which;
        if (key == 13) { //ENTER
            send();
            return false;
        }
    });

    //Load more comments when more-message-button is clicked
    $('#comments').on('click', '.more-message-button', function() {
        $('.more-message-button.blue.waves-effect.waves-light.btn').hide();
        $('.progress.indeterminate').show();
        var lastId = $(this).attr('last-id-date');
        loadOldComments(lastId);
        $('.row.loading').remove();
    });

    setInterval(updateDate, 30000);

});
