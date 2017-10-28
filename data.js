var  shortBreakLength = 300; 
var longBreakLength = 600; 
var sessionLength = 1500; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 1500; 
var newTimer = true; 
// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	document.getElementById("timeLeft").innerHTML = currentTime - timeGoneBy;  
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
	var left = document.getElementById("timer"); 
    if (x.style.display === "none") {
        x.style.display = "block";
		left.style.float = "left"; 
		left.style.width = "70%"; 
    } else {
        x.style.display = "none";
		left.style.float = "none"; 
		left.style.width = "100%"; 
    }
}

function toggleTimerSettings(sesh){
	
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
	if(timeGoneBy == currentTime){
		toggleBreaksAndSession(); 
	}
	newTimer = true; 
	 $('.pomProgressTimer').circleProgress({animationStartValue: 0}); 
	timeGoneBy = 0; 
	togglePause(); 
}

function changeTime(amount, session){
	if(session = "session"){
		sessionLength += amount; 
	}
	else if(session = "shortBreak"){
		shortBreakLength += amount; 
	}
	else if(session = "longBreak"){
		longBreakLength += amount; 
	}
	document.getElementById("sessionDisplay").innerHTML = sessionLength; 
	document.getElementById("shortBreakDisplay").innerHTML = shortBreakLength; 
	document.getElementById("longBreakDisplay").innerHTML = longBreakLength; 
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
