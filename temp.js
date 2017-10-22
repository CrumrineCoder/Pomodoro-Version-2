var sessionSeconds = 1500;
var shortBreakSeconds = 300;
var longBreakSeconds = 900;
var paused = false;
var seconds_left = sessionSeconds;
var on_break = false;
var currentTimer = "Session";
var width = (1 - (seconds_left / sessionSeconds)) * 100;
var tempoarySessionSeconds = 1500;
var tempoaryShortBreakSeconds = 300;
var tempoaryLongBreakSeconds = 900;
var audio = new Audio('https://www.dropbox.com/s/fykpah6dy6ykklc/Mgs%20-%20Alert%20Sound.mp3?raw=1');
var intervalID = null;

function doTheInterval() {
    if (!paused) {
        seconds_left -= 1; // Makes the time go down 1 each second
    document.getElementById('myBar').style.width = (width * 100) + '%'; // Changes the bar's width based on the width variable
        if (currentTimer == "Session") { // change the width variable
            width = 1 - (seconds_left / sessionSeconds);
        } else if (currentTimer == "Long Break") {
            width = 1 - (seconds_left / sessionSeconds);
        } else {
            width = 1 - (seconds_left / shortBreakSeconds);
        }
      // Update the time
        document.getElementById('time').innerHTML = convertTime(seconds_left);
        if (seconds_left <= 0) { // If the timer has run out
            document.getElementById('myBar').style.width = (width * 100) + '%';
            if (on_break) { // If it was a break, then start another session
                seconds_left = sessionSeconds;
                on_break = false;
            }
          // clear the interval
            intervalManager(false); 
          // play the music
            audio.play();
        }
    }
} 
var interval;
// Either starts the interval or clears the existing one 
function intervalManager(flag, func) {
    if (flag) {
        interval = setInterval(func, 1000);
    } else {
        clearInterval(interval);
    }
}
// When the initial page loads, start the interval 
window.onload = function() {
    intervalManager(true, doTheInterval); 
}

// Converts the seconds_left seconds to a format
function convertTime(trueSeconds) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    while (trueSeconds >= 3600) {
        hours += 1;
        trueSeconds -= 3600;
    }
    while (trueSeconds >= 60) {
        minutes += 1;
        trueSeconds -= 60;
    }

    seconds = trueSeconds;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var formattedTime = hours + ":" + minutes + ":" + seconds;
    return formattedTime;
}

// Controls whether the function inside the interval is ccontinuing
function pause() {
    if (!paused) {
        paused = true;
    } else {
        paused = false;
    }
}

// Changes the time on a timer
function changeTime(amount, target) {
    if (target == "sessionLength") {
        var temp = tempoarySessionSeconds + amount;
        if (temp <= 0) {
            tempoarySessionSeconds = 0;
        } else {
            tempoarySessionSeconds += amount;
        }
        document.getElementById(target).innerHTML = convertTime(tempoarySessionSeconds);
    } else if (target == "longBreakLength") {
        var temp = tempoaryLongBreakSeconds + amount;
        if (temp <= 0) {
            tempoaryLongBreakSeconds = 0;
        } else {
            tempoaryLongBreakSeconds += amount;
        }
        document.getElementById(target).innerHTML = convertTime(tempoaryLongBreakSeconds);
    } else {
        var temp = tempoaryShortBreakSeconds + amount;
        if (temp <= 0) {
            tempoaryShortBreakSeconds = 0;
        } else {
            tempoaryShortBreakSeconds += amount;
        }
        document.getElementById(target).innerHTML = convertTime(tempoaryShortBreakSeconds);
    }

}

// Changes which clock the timer is running on
function changeTimer(timer) {
    seconds_left = timer;
    if (timer == sessionSeconds) {
        on_break = false;
        currentTimer = "Session";
        sessionSeconds = tempoarySessionSeconds;
    } else if (timer == longBreakSeconds) {
        on_break = true;
        currentTimer = "Long Break";
        longBreakSeconds = tempoarySessionSeconds;
    } else {
        on_break = true;
        currentTimer = "Short Break";
        shortBreakSeconds = tempoaryShortBreakSeconds;
    }


}

// Sets the current timer to the timer length and restarts the interval
function reset() {
    if (currentTimer == "Session") {
        sessionSeconds = tempoarySessionSeconds;
        seconds_left = sessionSeconds;
    } else if (currentTimer == "Long Break") {
        longBreakSeconds = tempoaryLongBreakSeconds;
        seconds_left = longBreakSeconds;
    } else {
        shortBreakSeconds = tempoaryShortBreakSeconds;
        seconds_left = shortBreakSeconds;
    }
   seconds_left += 1;
    clearInterval(interval);
    intervalManager(true, doTheInterval); // for setInterval


}

// Dev: shows all variables I need
function statusUpdate() {
    console.log("Session Seconds: " + sessionSeconds);
    console.log("Short Break Seconds: " + shortBreakSeconds);
    console.log("Long Break Seconds: " + longBreakSeconds);
    console.log("Paused: " + paused);
    console.log("Seconds Left: " + seconds_left);
    console.log("Current Timer: " + currentTimer);
    console.log("Temp Session Seconds: " + tempoarySessionSeconds);
    console.log("Temp Short Break Seconds: " + tempoaryShortBreakSeconds);
    console.log("Temp Long Break Seconds: " + tempoaryLongBreakSeconds);
}