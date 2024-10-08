var TIMER = 25
var PAUSE = 5
var LONGPAUSE = 15
var COUNTER = 0
var timer = new easytimer.Timer();
var bell = new Audio("assets/audio/zapsplat_bells_small_timer_ping_constant_loop_58348.mp3")
var click = new Audio("assets/audio/click.mp3")
var activePage = ""
var activeTimer = ""
var player;
var loadButtonClicked = false;

var content = {
    "Focus": {
        "title": "Focus", 
        "subtitle": "Focus on your task of choice!", 
        "backgroundColor": "#ff2525", 
        "timerColor": "#ff6f6f", 
        "timerDefaultString": "25:00", 
        "timerDuration": 25,
        "loadVideoBtnColor": "#d61717"
    },
    "Pause": {
        "title": "Short Break", 
        "subtitle": "Time for a little break!", 
        "backgroundColor": "#48c348", 
        "timerColor": "#76e476", 
        "timerDefaultString": "05:00", 
        "timerDuration": 5,
        "loadVideoBtnColor": "#369536"
    },
    "LongPause": {
        "title": "Long Break", 
        "subtitle": "Time for a deserved long break!", 
        "backgroundColor": "#417be7", 
        "timerColor": "#88adf1", 
        "timerDefaultString": "15:00", 
        "timerDuration": 15,
        "loadVideoBtnColor": "#2d55a2"
    }
}

function startTimer(type){
    if(activeTimer != type || !(timer.isRunning() || timer.isPaused())){
        timer.stop();
        timer.start({countdown: true, precision: 'seconds', startValues: {minutes: content[type]['timerDuration']}});
    } else {
        timer.start()
    }
    activeTimer = type
}

$('#startButton').click(function () {
    if (activePage == "Focus") {
        startTimer("Focus")
    } else if (activePage == "Pause") {
        startTimer("Pause")
    } else if (activePage == "LongPause") {
        startTimer("LongPause")
    }
    click.play()
});

$('#pauseButton').click(function () {
    if(activePage == activeTimer){
        timer.pause();
    }
});

$('#stopButton').click(function () {
    if(activePage == activeTimer && (timer.isRunning() || timer.isPaused())){
        timer.stop();
        setTimerValues()
    }
});

$('#resetButton').click(function () {
    if(activePage == activeTimer && (timer.isRunning() || timer.isPaused())){
        timer.reset();
        setTimerValues()
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
    document.getElementsByTagName("body")[0].style.background = content[pageName]['backgroundColor'];

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
    document.getElementById("modeTitle").innerHTML = content[pageName]['title'];
    document.getElementById("subtitle").innerHTML = content[pageName]['subtitle'];
    document.getElementById("Wrapper").style.background = content[pageName]['backgroundColor'];
    document.getElementById("timerValues").style.background = content[pageName]['timerColor'];
    document.getElementById("pinInPlace").style.background = content[pageName]['backgroundColor'];
    document.getElementById("youtubeLink").style.background = content[pageName]['timerColor'];
    document.getElementById("youtubeLink").style.borderColor = content[pageName]['backgroundColor'];
    document.getElementsByClassName("youtubeSubmit")[0].style.background = content[pageName]['loadVideoBtnColor'];


    activePage = pageName
    setTimerValues();
}

function getTimerValues(){
    if(activePage == activeTimer){
        if(timer.isRunning() || timer.isPaused()){
            return timer.getTimeValues().toString(['minutes', 'seconds']);
        } 
    }
    return content[activePage]['timerDefaultString'];
}

function setTimerValues(){
    document.getElementById("timerValues").innerHTML = getTimerValues();
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: "350",
    width: "500",
    videoId: "jfKfPfyJRdk",
    playerVars: { 'autoplay': 1},
    events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
    }
});
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
var videoStatuses = Object.entries(window.YT.PlayerState)
event.target.setVolume(25);
}

function updateTitle(){
    document.title = activeTimer + ": " + timer.getTimeValues().toString(['minutes', 'seconds']);
}

function getIdFromLink(){
    url = String(document.getElementById("youtubeLink").value)
    
    var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    r = url.match(rx);
    if(r != null){
        var id = r[1]
        return [id, true]
    } else {
        return ["",false]
    }
}

let btn = document.querySelector(".youtubeSubmit"),
                spinIcon = document.querySelector(".spinner"),
                btnText = document.querySelector(".btn-text");

btn.addEventListener("click", () => {
    if(document.getElementById("youtubeLink").value == ""){
        document.getElementById("youtubeLink").placeholder = "This field must contain a URL!"
        return;
    }

    if(!loadButtonClicked){
        var id = getIdFromLink()
        if(!id[1]){
            document.getElementById("youtubeLink").value = ""
            document.getElementById("youtubeLink").placeholder = "Oops! This link seems to be broken, try a new one!"
            return;
        }

        loadButtonClicked = true;

        btn.style.cursor = "wait";
        btn.classList.add("checked");
        spinIcon.classList.add("spin");
        btnText.textContent = "Loading";

        setTimeout(() => {
            spinIcon.classList.replace("spinner", "check");
            spinIcon.classList.replace("fa-circle-notch", "fa-check");
            btnText.textContent = "All done!";
            btn.style.cursor = "pointer"
            player.loadVideoById(id[0]);
            document.getElementById("youtubeLink").placeholder = "Tired of Lofi? Paste the Youtube URL here"
        }, 1500) //1s = 1000ms

        setTimeout(() => {
            setVideoButton()
            loadButtonClicked = false;
        }, 3000)
    }
});

var text = document.getElementById("youtubeLink")
text.addEventListener("focus", () => {
    text.style.borderColor = content[activePage]['loadVideoBtnColor'];
});

text.addEventListener("focusout", () => {
    text.style.borderColor = content[activePage]['timerColor'];
});

function setVideoButton(){
    let btn = document.querySelector(".youtubeSubmit")
        spinIcon = document.querySelector(".check"),
        btnText = document.querySelector(".btn-text");

    btn.classList.remove("checked");
    spinIcon.classList.remove("spin");
    spinIcon.classList.replace("check", "spinner");
    spinIcon.classList.replace("fa-check", "fa-circle-notch");
    btnText.textContent = "Load Video";
}

  // Get the element with id="defaultOpen" and click on it
openPage("Focus")
