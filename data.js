// Default lengths for the timers
var shortBreakLength = 300;
var longBreakLength = 600;
var sessionLength = 1500;
// If paused is true, then the timer stops. Pretty obvious. 
var paused = false;
// This is how far the current timer has gone. So 10 seconds into a new timer will be 10 here.
var timeGoneBy = 0;
// The current timer length. By default it's the sessionLength. 
var currentTime = 1500;
// Used to tell if the timer has been reset
var newTimer = true;
// The type of timer. By default it's the session one. 
var setting = "session";
// Create an interval where the timeGoneBy increases, the progress bar changes and time goes down. 
function timer() {
    document.getElementById("timeLeft").innerHTML = convertTime(currentTime - timeGoneBy);
    if (!paused) {
        if (newTimer) {
            pomCircle(currentTime);
            newTimer = false;
        }
        timeGoneBy++;
        if (timeGoneBy >= currentTime) {
            paused = true;
            toggleBreaksAndSession();
            document.getElementById("pause").style.display = "none";
            document.getElementById("play").style.display = "none";
            document.getElementById("reset").style.display = "block";
        }
    }
}
// Every 1000 miliseconds, or 1 second, run the timer() function. 
var pomodoro = setInterval(timer, 1000);

// Don't show the user the buttons to change what type of timer is running. 
toggleBreaksAndSession();
// Don't show the user the buttons to change the lengths of the timers. 
toggleSettings();

// Toggles whether or not the type of timer buttons are shown to the user. . 
function toggleBreaksAndSession() {
    var x = document.getElementById("sessionButtons");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Toggles whether or not the system setting buttons are shown to the user. . 
function toggleSettings() {
    var x = document.getElementById("changeTimeContainer");
    var y = document.getElementById("CONT");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
    } else {
        x.style.display = "none";
        y.style.display = "none";
    }
}

// Change the time to that  of the setting. So if the user clicks on the session one, the timer shows the maximum for the session time length. By default this is 25 minutes. 
function toggleTimerSettings(sesh) {
    setting = sesh;
    if (sesh == "session") {
        document.getElementById("display").innerHTML = convertTime(sessionLength);
    } else if (sesh == "longBreak") {
        document.getElementById("display").innerHTML = convertTime(longBreakLength);
    } else {
        document.getElementById("display").innerHTML = convertTime(shortBreakLength);
    }
}
// The function for managing changing the sessionLength and such variables. 
function changeTime(amount) {
    if (setting == "session") {
        var temp = sessionLength + amount;
        if (temp <= 0) {
            sessionLength = 0;
        } else {
            sessionLength += amount;
        }
        document.getElementById("display").innerHTML = convertTime(sessionLength);
    } else if (setting == "longBreak") {
        var temp = longBreakLength + amount;
        if (temp <= 0) {
            longBreakLength = 0;
        } else {
            longBreakLength += amount;
        }
        document.getElementById("display").innerHTML = convertTime(longBreakLength);
    } else {
        var temp = shortBreakLength + amount;
        if (temp <= 0) {
            shortBreakLength = 0;
        } else {
            shortBreakLength += amount;
        }
        document.getElementById("display").innerHTML = convertTime(shortBreakLength);
    }
}

// Formats time. 
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


// Swap the timer length to another one. 
function changeTimer(session) {
    newTimer = true;
    $('.pomProgressTimer').circleProgress({
        animationStartValue: 0
    });
    if (session == "session") {
        currentTime = sessionLength;
    } else if (session == "short") {
        currentTime = shortBreakLength;
    } else if (session == "long") {
        currentTime = longBreakLength;
    } else {
        console.log("Error!");
    }
    togglePause();
    timeGoneBy = 0;
}

// Pause or unpause the timer. 
function togglePause() {
	// If the timer is over, reset the timer. 
    if (timeGoneBy == currentTime) {
        reset();
    }
    // Resume: set paused to false, show the paused button, get rid of the session buttons, and continue the progresstimer. 
    else if (paused) {
        paused = false;
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
        document.getElementById("reset").style.display = "none";
        toggleBreaksAndSession();
        var obj = $('.pomProgressTimer').data('circle-progress'),
            progress = obj.lastFrameValue;
        $('.pomProgressTimer').circleProgress({
            animationStartValue: progress
        });
    }
    // Pause: set paused to true, show the play and reset button, show the session buttons, and stop the progresstimer. 
    else if (!paused) {
        paused = true;
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "block";
        document.getElementById("reset").style.display = "block";
        toggleBreaksAndSession();
        var el = $('.pomProgressTimer');
        $(el.circleProgress('widget')).stop();
    }
}

// Set the timer back to its maximum. 
function reset() {
    newTimer = true;
    $('.pomProgressTimer').circleProgress({
        animationStartValue: 0
    });
    timeGoneBy = 0;
    togglePause();
}
// The circle timer animation. 
var pomCircle = function(durationTime) {
    $('.pomProgressTimer').circleProgress({
        value: 1,
        thickness: '3',
        startAngle: -(Math.PI / 2),
        size: 300,
        lineCap: "round",
        fill: {
            color: '#FF6347',
        },
        animation: {
            // Is in milliseconds
            duration: durationTime * 1000,
        },
    })
};