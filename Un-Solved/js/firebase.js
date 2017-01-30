// available functions and variables from app.js:
// updateMessages(snapshot) -- updates all messages based on a snapshot object which holds all messages
//                             Run this when ever the data object is updated.
//                             For Firebase, add it as a callback to an on value change once
//
// curUser -- use this variable to get the username of the current user
// $("#message-input").val() -- use this jquery selector to get the current message. Be sure to clear the message after sending

// This is a sample object which acts like the object which we will receive from firebase. Currently the app pushes to this object therefore when the app is refreshed, it is reset. Once we integrate Firebase, this object will no longer be required.
var sampleMessagesObject = {
    "1": {
        "message": "Hello EveryOne",
        "time": "8:49:21 AM",
        "username": "jigglybrain"
    },
    "2": {
        "message": "Hey JigglyBrain. How are you?",
        "time": "8:50:07 AM",
        "username": "hacker10292"
    },
    "3": {
        "message": "Let's get hacking",
        "time": "8:50:21 AM",
        "username": "debugger345"
    },
    "4": {
        "message": "I'm good. It's great hearing from you all",
        "time": "8:51:39 AM",
        "username": "jigglybrain"
    },
    "5": {
        "message": "What's on the agenda for today",
        "time": "8:51:45 AM",
        "username": "jshacker"
    }
};

//Initially update the UI
updateUI(sampleMessagesObject);

var counter = 1;

$("#send").click(function () {
    var message = $('#message-input').val();
    var time = new Date().toLocaleTimeString();
    // Clear the input box once we save the value
    $('#message-input').val("");


    //notice that each message is add as a new object with an 'unique' identifier. Once we incorporate Firebase, the Unique Identifier will be handled automatically. This was just a hack to make the app temporarily functional.
    sampleMessagesObject['newMessage' + counter] = {
        message: message,
        time: time,
        username: curUser
    };
    counter++;

    //once we update the object we must update our UI. This function must be called anytime the messages object is updated.
    updateUI(sampleMessagesObject);

    return false;

});
