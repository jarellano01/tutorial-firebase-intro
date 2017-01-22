// available functions and variables from app.js:
// updateMessages(snapshot) -- updates all messages based on a snapshot object which holds all messages
//                             Run this when ever the data object is updated.
//                             For Firebase, add it as a callback to an on value change once
//


var chatroom = firebase.database().ref('hackers');

chatroom.on('value', function (snapshot) {
    updateUI(snapshot.val())
});

//On Click Send function.
$("#send").click(function () {
    // Get the inputted message using jquery
    var message = $('#message-input').val();
    // Clear the input box
    $('#message-input').val('');

    // Get current time
    var time = new Date().toLocaleTimeString();

    //push the new message object into Firebase using the reference variable
    chatroom.push({
        username: curUser,
        message: message,
        time: time
    });

    // return false in to stop page from reloading
    return false;
});



