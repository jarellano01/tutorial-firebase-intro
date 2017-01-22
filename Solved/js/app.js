var curUser = prompt("Please enter a username", "jigglybrain") || 'unknown';

$('.username').html(curUser);
// helper functions


//use newMessage to add a new message to the UI
// isCurUser should be set to true or false
function newMessage(message, username, time) {
    var position;
    if (curUser == username) {
        position = 'left'
    }
    else {
        position = 'right'
    }

    $('.messages > ul').append($("<li class='li-" + position + "'><span class='li-message'>" + message + "</span><span class='li-username'>- " + username + " | " + time + "</span></li>"));
    $(".messages").animate({scrollTop: $(this)[0].scrollHeight}, 1000);
}

function scrollToBottom() {
    $(".messages").animate({scrollTop: $(this)[0].scrollHeight}, 1000);
}


function updateUI(messages) {
    $('.messages > ul').html('');


    for (var key in messages) {
        var message = messages[key];
        var isCurUser = curUser == message.username;

        newMessage(messages[key].message, messages[key].username, messages[key].time);
    }

    scrollToBottom();
}