var focus_timer = new easytimer.Timer();
var pause_timer = new easytimer.Timer();
var longpause_timer = new easytimer.Timer();
var TIMER = 25
var PAUSE = 5
var LONGPAUSE = 15
var COUNTER = 0
var secondsCounter = 0
var bell = new Audio("assets/audio/zapsplat_bells_small_timer_ping_constant_loop_58348.mp3")
var click = new Audio("assets/audio/click.mp3")
$('#FocusTimer .startButton').click(function () {
    /* chosen = parseInt(document.getElementById("minutes").value);
    console.log(chosen); */
    focus_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: TIMER}});
    click.play()
});

$('#PauseTimer .startButton').click(function () {
    /* chosen = parseInt(document.getElementById("minutes").value);
    console.log(chosen); */
    pause_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: PAUSE}});
});

$('#LongPauseTimer .startButton').click(function () {
    /* chosen = parseInt(document.getElementById("minutes").value);
    console.log(chosen); */
    longpause_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: LONGPAUSE}});
});

$('#FocusTimer .pauseButton').click(function () {
    focus_timer.pause();
});

$('#PauseTimer .pauseButton').click(function () {
    pause_timer.pause();
});

$('#LongPauseTimer .pauseButton').click(function () {
    longpause_timer.pause();
});

$('#FocusTimer .stopButton').click(function () {
    focus_timer.stop();
});

$('#PauseTimer .stopButton').click(function () {
    pause_timer.stop();
});

$('#LongPauseTimer .stopButton').click(function () {
    longpause_timer.stop();
});

$('#FocusTimer .resetButton').click(function () {
    focus_timer.reset();
    focus_timer.stop();
});

$('#PauseTimer .resetButton').click(function () {
    pause_timer.reset();
    pause_timer.stop();
});

$('#LongPauseTimer .resetButton').click(function () {
    longpause_timer.reset();
    longpause_timer.stop();
});

focus_timer.addEventListener('secondsUpdated', function (e) {
    secondsCounter += 1;
    $('title').html("Focus: " + focus_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#FocusTimer .values').html(focus_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#FocusTimer .progress_bar').html($('#FocusTimer .progress_bar').html() + '.');
});

pause_timer.addEventListener('secondsUpdated', function (e) {
    $('title').html("Short Break: " + pause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#PauseTimer .values').html(pause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#PauseTimer .progress_bar').html($('#PauseTimer .progress_bar').html() + '.');
});

longpause_timer.addEventListener('secondsUpdated', function (e) {
    $('title').html("Long Break: " + longpause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#LongPauseTimer .values').html(longpause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#LongPauseTimer .progress_bar').html($('#LongPauseTimer .progress_bar').html() + '.');
});

focus_timer.addEventListener('targetAchieved', function (e) {
    $('#FocusTimer .progress_bar').html('COMPLETE!!');
    COUNTER++
    var hours = Math.trunc(secondsCounter/3600)
    var minutes = Math.trunc((secondsCounter - (hours*3600)) / 60)
    var seconds = secondsCounter - (minutes*60 + hours*3600)
    $('#totaltime').html(hours + " Hours " + minutes + " Minutes and " + seconds + " Seconds")
    bell.play()
    if(COUNTER < 4){
        document.getElementById("pause").click();
        pause_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: PAUSE}});
    } else {
        COUNTER = 0
        document.getElementById("longpause").click();
        longpause_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: LONGPAUSE}});
    }
});

pause_timer.addEventListener('targetAchieved', function (e) {
    bell.play()
    $('#PauseTimer .progress_bar').html('COMPLETE!!');
    document.getElementById("focus").click();
    focus_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: TIMER}});
});

longpause_timer.addEventListener('targetAchieved', function (e) {
    bell.play()
    $('#LongPauseTimer .progress_bar').html('COMPLETE!!');
    document.getElementById("focus").click();
    focus_timer.start({countdown: true, precision: 'seconds', startValues: {minutes: TIMER}});
});

focus_timer.addEventListener('started', function (e) {
    $('#FocusTimer .values').html(focus_timer.getTimeValues().toString(['minutes', 'seconds']));
});

pause_timer.addEventListener('started', function (e) {
    $('#PauseTimer .values').html(pause_timer.getTimeValues().toString(['minutes', 'seconds']));
});

longpause_timer.addEventListener('started', function (e) {
    $('#LongPauseTimer .values').html(longpause_timer.getTimeValues().toString(['minutes', 'seconds']));
});

focus_timer.addEventListener('reset', function (e) {
    $('#FocusTimer .values').html(focus_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#FocusTimer .progress_bar').html('.');
});

pause_timer.addEventListener('reset', function (e) {
    $('#PauseTimer .values').html(pause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#PauseTimer .progress_bar').html('.');
});

longpause_timer.addEventListener('reset', function (e) {
    $('#LongPauseTimer .values').html(longpause_timer.getTimeValues().toString(['minutes', 'seconds']));
    $('#LongPauseTimer .progress_bar').html('.');
});

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
  }
  
/* var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('playeriframe', {
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
} */

function loadVideo() {
    window.YT.ready(function() {
      new window.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "5qap5aO4i9A",
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
      console.log(videoStatuses.find(status => status[1] === event.data)[0])
      event.target.setVolume(25);
    }
  }
  
  $(document).ready(function() {
    $.getScript("https://www.youtube.com/iframe_api", function() {
      loadVideo();
    });
  });

  function updateTitle(){
      
    document.title = $('#FocusTimer .values').html(focus_timer.getTimeValues().toString(['minutes', 'seconds']));
  }

  // Get the element with id="defaultOpen" and click on it
document.getElementById("focus").click();
$(document).ready(function(){ $(".disclaimer").remove(); });