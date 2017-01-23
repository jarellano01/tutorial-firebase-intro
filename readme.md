## Firebase Intro
###Firebase Chatroom

In this tutorialm we will be building a very simple chatroom to demonstrate the quick-and-easy database functionality that Google's Firebase has to offer.

After this tutorial you will have learned how to do the following:
- create a new Firebase Project
- Initialize a Firebase database from your web app
- Pull snapshots of your database whenever a value changes
- Push new data into your database
- Create a fun, but elementary, live chatroom web app

To follow along, please download the Un-Solved folder in this repository. I have set up a simple front-end interface along with some simple UI manipulation functions; all we have to do now is make it work. 

Fortunutely, Firebase is simple to use and to set up. 

Let's begin!!

### 1. Create a new Firebase Project

1. Go to https://console.firebase.google.com/ 
2. Click on `Create New Project`
    - For this tutorial, I will be naming my project `fb-chatroom`
3. Press `Create Project`
    
### 2. Initialize Firebase in your Web App
We will not be going over auth in this tutorial and therefore will be required to give all full read/write access. Please note that it is never a good idea to leave a database open to full read/write access. 
1. Click on the `Database` tab in the left sidebar
2. Click on the `Rules` tab
3. Replace the code in the box with the following code. This will set read/write permissions to true

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

One of my favorite things about Firebase is that it very simple to initialize and to get started. 
1. Go back to the Overview section by clicking on `Overview` in the left sidebar
2. Click on `Add Firebase to your Web App`
3. Copy all the code shown in the dialog
4. Paste this code right after your jQuery Script tag and before  
    ![Paste Code](/assets/images/initialize-fb.png)

That's it. We can now start using Firebase with our newly created project. 

### 3. Basic Concepts

#### On Value Change
Firebase is a great tool when working with front-end applications because of it's "on value change" API function. This is the main way to obtain data from your Firebase project. 

The "on value" change function will run once when your app is initiated as well as whenever data changes in your database. 

For example, let's say that someone across the world decided to send a message in our amazing chatroom app. Firebase will hear that change and will run whatever callback we send through the "on value" change function. 

In the example below, I have create a variable called "chatroom". "chatroom" w will reference the item in our database which holds messages for our chatroom. In this case, our chatroom is called 'ChatroomForHackers'. 
```
var chatroom = firebase.database().ref('ChatroomForHackers');

chatroom.on('value', function (snapshot) {
    console.log(snapshot.val());
})

```

Now I can attach an "on value change" listener to my chatroom variable. With that, whenever a message is added to this chatroom, Firebase will shoot us over a snapshot of all the data as a JSON object which we can then process as we wish. In this case ,I am simply logging it to our console. 

If you try run this code now, you will recieve `null` as we have not inserted any data into our database yet. 

Note: This will run everytime a value changes. Refer to the Firebase API to see what other 'on' events are available. 

https://firebase.google.com/docs/reference/js/firebase.database.Reference#on

#### Pushing Data into our Database
Firebase acts much like JSON objects and arrays with a few minor quirks. 

Usually we push data into an array but with Firebase we will actually be pushing an object into a parent object. For example: 
```
var chatroom = firebase.database().ref('hackers');
var newMessageRef = chatroom.push({
        username: 'jigglybrain',
        message: 'Hello Every One',
        time: '5:40pm'
    });
```

If we look at the object returned in our console, we will get something like this:
```
Object: {
    Kb6tSmvRMTFj: {
        username: 'hacker23532',
        message: 'Hello Every One',
        time: '4:34pm'
    },
    Kb6tSmvRMTFj: {
        username: 'someoneElse',
        message: 'Hack Away',
        time: '5:21pm'
    },
    Kb6tSmvRMTFj: {
        username: 'jigglybrain',
        message: 'Hello Every One',
        time: '5:40pm'
    }
}
```

Notice that our pushed object has been placed inside of another object with a unique key, along with any other messages that were already in the database. Those keys can later be used to update or modify specific messages. 

Refer to the Firebase API to learn more about pushing, updating, or removing items from your database. 
https://firebase.google.com/docs/reference/js/firebase.database.Reference#push

### 4. Pseudo Code

Now that we have a general understanding of how Firebase works, we can begin to plan our chatroom app. Be sure to test out the current unsolved web app as it already has some very basic logic incorporated. We will be working only inside of `js/firebase.js`.

Currently, the unsolved code works with an object, `sampleMessagesObject`, that has been hardcoded inside of `js/firebase.js`. Any time a message is "sent", this object is updated, and then we run `updateUI(sampleMessagesObject)` to re-render the messages in our chatroom. 

```
$("#send").click(function () {
    var message = $('#message-input').val();
    var time = new Date().toLocaleTimeString();
    // Clear the input box once we save the value
    $('#message-input').val("");


    //notice that each message is added as a new object with a 'unique' identifier. Once we incorporate Firebase, the Unique Identifier will be handled automatically. This was just a hack to make the app temporarily functional.
    sampleMessagesObject['newMessage' + counter] = {
        message: message,
        time: time,
        username: curUser
    };
    counter++;

    //once we update the object, we must update our UI. This function must be called anytime the messages object is updated.
    updateUI(sampleMessagesObject);

    return false;

});
```
This means that this one click listener handles updating our data as well as updating our UI. 

Since we are now using Firebase, we will split up some of this logic and let an `on value change` handle our UI updates.

Note: Our current username can be obtained by using the variable `curUser` anywhere in `firebase.js`.

We will need the following: 

Functions: 
- on value change: run updateUI with the snapshot data from firebase
- Function to push our new message into firebase when the send button is pressed

Based on our basic concepts in Part 3 of this tutorial, we can see that this will actually all be quite simple to set up and now we have consolidated all of our logic down to two simple functions. 

### The Code
Finally we can start coding out our logic. Let's start inside of `js/firebase.js`.


1. Set up a reference to our chatroom node inside of our Firebase app. Remember we may want more chatrooms in the future therefore we shall set a reference to a named chatroom. I'm calling our chatroom 'hackers`.

    ```
    var chatroom = firebase.database().ref('hackers');
    ```

    Note that Parent Nodes do not have to exist at the time that you reference them. Firebase will return `null` but that is not an issue. Firebase does not allow empty parent nodes either way.

2. Set up a Firebase listener for any value changes on our referenced parent node.

    ```
    chatroom.on('value', function (snapshot) {
        //to use the snapshot as a JSON object add .val() to it
        updateMessages(snapshot.val())
    });
    ```
    `updateMessages(messagesObject)` is a function already included in the unsolved code which will update the UI. All is needed is to pass in an object with the following format: 
    
    ```
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
        }
    }
    ```
    When pushing items into Firebase we will automatically be set up with this format. 
    
3. Create an on-click listener to push a new message into the database when the send button is clicked.
    ```
    $("#send").click(function () {
        // Get the inputted message using jquery
        var message = $('#message-input').val();
        
        // Clear the input box
        $('#message-input').val('');
        
        // Get current time
        var time = new Date().toLocaleTimeString();
    
        //push the new message object into Firebase using the reference variable
        chatroom.push({
            //curUser has been set as a global variable that we can use at any time
            //curUser gets set when you first launch the app in the prompt
            username: curUser,
            message: message,
            time: time
        });
    
        // return false in to stop page from reloading
        return false;
    });
    ```
    
### 5. Guess What!!!
    
At this point, we are done. You might be thinking, is that it?!?!?!? 
    
First, we updates the UI with messages already in Firebase when we first launched our app. 
    
Second, when we pushed an item into our Firebase database, Firebase hears the change, which then triggers an update to our UI since we set an 'on value change' listener. 
    
It's as easy as that. 
    
Feel free to take this code and enhance it any way that you wish. 

Bonus Assignment: Add a sidebar to the html with the ability to select a different chat room. This will require: 
- HTML and CSS updates
- Changing the parent node to a different chatroom name
    - Perhaps create a variable with the chatroom name and add a click listener to your sidebar which will change this variable based on the tab clicked.
- Remember to let Firebase do the heavy lifting

Firebase documentation can be daunting. I find that this url has everything that you need when dealing with Web Apps: 
https://firebase.google.com/docs/reference/js/firebase.database.Reference

#### Have fun hacking away and invite me to your chatroom!!!




