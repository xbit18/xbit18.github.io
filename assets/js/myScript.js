var TIMER = 25
var PAUSE = 5
var LONGPAUSE = 15
var COUNTER = 0
var focus_timer = new easytimer.Timer({countdown: true, precision: 'seconds', startValues: {minutes: TIMER}});
var pause_timer = new easytimer.Timer({countdown: true, precision: 'seconds', startValues: {minutes: PAUSE}});
var longpause_timer = new easytimer.Timer({countdown: true, precision: 'seconds', startValues: {minutes: LONGPAUSE}});
var bell = new Audio("assets/audio/zapsplat_bells_small_timer_ping_constant_loop_58348.mp3")
var click = new Audio("assets/audio/click.mp3")
var activePage = "Focus"

var content = {
    "Focus": ["Focus", "Focus on your task of choice!", "#ff2525", "#ff6f6f", "25:00", focus_timer],
    "Pause": ["Short Break", "Time for a little break!", "#48c348", " #76e476", "05:00", pause_timer],
    "LongPause": ["Long Break", "Time for a deserved long break!", "#417be7", "#88adf1", "15:00", longpause_timer]
}
$('#startButton').click(function () {
    if (activePage == "Focus") {
        pause_timer.stop();
        longpause_timer.stop();
        focus_timer.start();
    } else if (activePage == "Pause") {
        focus_timer.stop();
        longpause_timer.stop();
        pause_timer.start();
    } else if (activePage == "LongPause") {
        focus_timer.stop();
        pause_timer.stop();
        longpause_timer.start();
    }
    click.play()
});

$('#pauseButton').click(function () {
    timer = content[activePage][5]
    timer.pause();
});

$('#stopButton').click(function () {
    timer = content[activePage][5]
    timer.stop();
    setTimerValues()
});

$('#resetButton').click(function () {
    timer = content[activePage][5]
    if(timer.isRunning() || timer.isPaused()){
        timer.reset();
        setTimerValues()
    }
});

focus_timer.addEventListener('secondsUpdated', function (e) {
    setTimerValues()
    updateTitle()
});

pause_timer.addEventListener('secondsUpdated', function (e) {
    setTimerValues()
    updateTitle()
});

longpause_timer.addEventListener('secondsUpdated', function (e) {
    setTimerValues()
    updateTitle()
});

focus_timer.addEventListener('targetAchieved', function (e) {
    bell.play()

    COUNTER++

    var totalSeconds = COUNTER * 25 * 60
    var hours = Math.trunc(totalSeconds/3600)
    var minutes = Math.trunc((totalSeconds - (hours*3600)) / 60)
    
    $('#totaltime').html(hours + " Hours and " + minutes + " Minutes")

    if(COUNTER % 4 != 0){
        openPage("Pause")
        pause_timer.start();
    } else {
        openPage("LongPause")
        longpause_timer.start();
    }
});

pause_timer.addEventListener('targetAchieved', function (e) {
    bell.play()
    openPage("Focus")
    focus_timer.start();
});

longpause_timer.addEventListener('targetAchieved', function (e) {
    bell.play()
    openPage("Focus")
    focus_timer.start();
});

focus_timer.addEventListener('started', function (e) {
    $('#timerValues').html(setTimerValues());
});

pause_timer.addEventListener('started', function (e) {
    $('#timerValues').html(setTimerValues());
});

longpause_timer.addEventListener('started', function (e) {
    $('#timerValues').html(setTimerValues());
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
    timer = content[activePage][5]
    if(timer.isRunning() || timer.isPaused()){
        return timer.getTimeValues().toString(['minutes', 'seconds']);
    } else {
        return content[activePage][4];
    }
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

function updateTitle(string, timer){
    document.title = string + ": " + getTimerValues();
}

  // Get the element with id="defaultOpen" and click on it
document.getElementById("focus").click();
