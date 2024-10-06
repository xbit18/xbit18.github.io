var TIMER = 25
var PAUSE = 5
var LONGPAUSE = 15
var COUNTER = 0
var timer = new easytimer.Timer();
var bell = new Audio("assets/audio/zapsplat_bells_small_timer_ping_constant_loop_58348.mp3")
var click = new Audio("assets/audio/click.mp3")
var activePage = ""
var activeTimer = ""

var content = {
    "Focus": ["Focus", "Focus on your task of choice!", "#ff2525", "#ff6f6f", "25:00", 25],
    "Pause": ["Short Break", "Time for a little break!", "#48c348", " #76e476", "05:00", 5],
    "LongPause": ["Long Break", "Time for a deserved long break!", "#417be7", "#88adf1", "15:00", 15]
}

function startTimer(type){
    if(activeTimer != type || !(timer.isRunning() || timer.isPaused())){
        timer.stop();
        timer.start({countdown: true, precision: 'seconds', startValues: {minutes: content[type][5]}});
    } else {
        timer.start()
    }
    activeTimer = type
}

$('#startButton').click(function () {
    if (activePage == "Focus") {
        startTimer("Focus")
        //console.log("Focus Timer Started")
    } else if (activePage == "Pause") {
        startTimer("Pause")
        //console.log("Pause Timer Started")
    } else if (activePage == "LongPause") {
        startTimer("LongPause")
        //console.log("Long Pause Timer Started")
    }
    click.play()
});

$('#pauseButton').click(function () {
    if(activePage == activeTimer){
        timer.pause();
        //console.log("Paused")
    }
});

$('#stopButton').click(function () {
    if(activePage == activeTimer && (timer.isRunning() || timer.isPaused())){
        timer.stop();
        setTimerValues()
        //console.log("Stopped")
    }
});

$('#resetButton').click(function () {
    if(activePage == activeTimer && (timer.isRunning() || timer.isPaused())){
        timer.reset();
        setTimerValues()
        //console.log("Reset")
    }
});

timer.addEventListener('secondsUpdated', function (e) {
    if(activePage == activeTimer){
        setTimerValues()
    }
    updateTitle()
});

timer.addEventListener('targetAchieved', function (e) {
    bell.play()
    if(activeTimer == "Focus"){
        COUNTER++

        var totalSeconds = COUNTER * 25 * 60
        var hours = Math.trunc(totalSeconds/3600)
        var minutes = Math.trunc((totalSeconds - (hours*3600)) / 60)
        
        $('#totaltime').html(hours + " Hours and " + minutes + " Minutes")

        if(COUNTER % 4 != 0){
            openPage("Pause")
            startTimer("Pause")
        } else {
            openPage("LongPause")
            startTimer("LongPause")
        }
    } else if (activeTimer == "Pause"){
        openPage("Focus")
        startTimer("Focus")
    }
});

timer.addEventListener('started', function (e) {
    if(activePage == activeTimer){
        setTimerValues()
    }
});

function openPage(pageName) {
  
    // Remove white background, make it match color of the button
    document.getElementsByTagName("body")[0].style.background = content[pageName][2];

    document.getElementById("pause").style.borderRadius = "0px";
    document.getElementById("focus").style.borderRadius = "0px";
    document.getElementById("longpause").style.borderRadius = "0px";

    if(pageName == "Focus"){
        document.getElementById("pause").style.borderRadius = "0px 0px 0px 10px";
    } else if (pageName == "Pause"){
        document.getElementById("focus").style.borderRadius = "0px 0px 10px 0px";
        document.getElementById("longpause").style.borderRadius = "0px 0px 0px 10px";
    } else if (pageName == "LongPause"){
        document.getElementById("pause").style.borderRadius = "0px 0px 10px 0px";
    }

    
    // Change color and text based on the mode
    document.getElementById("modeTitle").innerHTML = content[pageName][0];
    document.getElementById("subtitle").innerHTML = content[pageName][1];
    document.getElementById("Wrapper").style.background = content[pageName][2];
    document.getElementById("timerValues").style.background = content[pageName][3];
    document.getElementById("pinInPlace").style.background = content[pageName][2];

    activePage = pageName
    setTimerValues();
}

function getTimerValues(){
    if(activePage == activeTimer){
        if(timer.isRunning() || timer.isPaused()){
            return timer.getTimeValues().toString(['minutes', 'seconds']);
        } 
    }
    return content[activePage][4];
}

function setTimerValues(){
    document.getElementById("timerValues").innerHTML = getTimerValues();
}
    

function loadVideo() {
    window.YT.ready(function() {
      new window.YT.Player("player", {
        height: "350",
        width: "500",
        videoId: "jfKfPfyJRdk",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    });
  
    function onPlayerReady(event) {
        event.target.playVideo();
      }
  
    function onPlayerStateChange(event) {
      var videoStatuses = Object.entries(window.YT.PlayerState)
      event.target.setVolume(25);
    }
  }
  
$(document).ready(function() {

$.getScript("https://www.youtube.com/iframe_api", function() {
    loadVideo();
});
});

function updateTitle(){
    document.title = activeTimer + ": " + timer.getTimeValues().toString(['minutes', 'seconds']);
}

  // Get the element with id="defaultOpen" and click on it
openPage("Focus")
