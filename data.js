var  shortBreakLength = 300; 
var longBreakLength = 600; 
var sessionLength = 1500; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 1500; 
var newTimer = true; 

var setting = "session"; 
// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	document.getElementById("timeLeft").innerHTML = convertTime(currentTime - timeGoneBy);  
	if(!paused){
		if(newTimer){
			pomCircle(currentTime); 
			newTimer = false; 
		}
		
		timeGoneBy++; 
		if(timeGoneBy >= currentTime){
			paused = true; 
			toggleBreaksAndSession(); 
			document.getElementById("pause").style.display = "none"; 
			document.getElementById("play").style.display = "none"; 
			document.getElementById("reset").style.display = "block";
		}
	}
	
}
var pomodoro = setInterval(timer, 1000); 


toggleBreaksAndSession(); 
function toggleBreaksAndSession(){
	var x = document.getElementById("sessionButtons");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleSettings(){
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

function toggleTimerSettings(sesh){
	setting = sesh; 
	if (sesh == "session"){
		 document.getElementById("display").innerHTML = convertTime(sessionLength); 
	} else if(sesh == "longBreak"){
		 document.getElementById("display").innerHTML = convertTime(longBreakLength);
	}
	else{
		document.getElementById("display").innerHTML = convertTime(shortBreakLength);
	}
}

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

toggleSettings(); 
function changeTimer(session){
	newTimer = true; 
	 $('.pomProgressTimer').circleProgress({animationStartValue: 0}); 
	if(session == "session"){
		currentTime = sessionLength; 
	}
	else if(session == "short"){
		currentTime = shortBreakLength; 
	}
	else if(session == "long"){
		currentTime = longBreakLength; 
	} else{
		console.log("Error!"); 
	} 
	togglePause(); 
	timeGoneBy = 0; 
//	toggleBreaksAndSession(); 
}

function togglePause(){
	if(timeGoneBy == currentTime){
		reset(); 
	}
	// Resume
	else if(paused){
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
	// Pause
	else if(!paused){
		paused = true; 
		document.getElementById("pause").style.display = "none"; 
		document.getElementById("play").style.display = "block"; 
		document.getElementById("reset").style.display = "block"; 
		toggleBreaksAndSession();
		var el = $('.pomProgressTimer');
		$(el.circleProgress('widget')).stop();

	}
	
}

function reset(){
	newTimer = true; 
	 $('.pomProgressTimer').circleProgress({animationStartValue: 0}); 
	timeGoneBy = 0; 
	togglePause(); 
}

var pomCircle = function(durationTime) {

  $('.pomProgressTimer').circleProgress({
    value: 1,
    thickness: '3',
	startAngle: -(Math.PI/2), 
    size: 300,
	lineCap: "round" , 
    fill: {
      color: '#FF6347',
    },
    animation: {
		// Is in milliseconds
      duration: durationTime*1000,
    },
  })
};
