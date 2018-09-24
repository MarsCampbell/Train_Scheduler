 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCzK0Xb6xsDr0PkUllp5ogJ2H4Be6cGbbk",
    authDomain: "train-scheduler-deb72.firebaseapp.com",
    databaseURL: "https://train-scheduler-deb72.firebaseio.com",
    projectId: "train-scheduler-deb72",
    storageBucket: "train-scheduler-deb72.appspot.com",
    messagingSenderId: "61398969954"
  };
  firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();
var name = "";
var role = "";
var start = "";
var destination = "";
var tMinutesTillTrain = "";
var rate = 0;
var monthsWorked = 0;
var minutesAway = 0;

database.ref().on("child_added", function(childSnapshot) {
    $("#trainData").append("<tr><td>" + childSnapshot.val().name + 
    "</td><td>" + childSnapshot.val().destination + 
    "</td><td>" + childSnapshot.val().frequency + 
    "</td><td>" + childSnapshot.val().nextTrainHour +
     "</td><td>" + childSnapshot.val().tMinutesTillTrain);
 
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
$("#submit-train").on("click", function(event) {
    event.preventDefault();
    name = $("#TrainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainStart").val().trim();
    frequency = $("#trainFrequency").val().trim();
    
    console.log(name);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
    var firstTime = trainTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainHour = moment(nextTrain).format("hh:mm");
    console.log(tRemainder);
    console.log(tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
   


     frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrainHour: nextTrainHour        
    });   
});
