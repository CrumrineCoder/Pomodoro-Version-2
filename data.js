var  shortBreakLength = 300; 
var longBreakLength = 600; 
var sessionLength = 10; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 10; 
var newTimer = true; 
// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	if(!paused){
		if(newTimer){
			pomCircle(currentTime); 
			newTimer = false; 
		}
		document.getElementById("session").innerHTML = currentTime; 
		timeGoneBy++; 
		document.getElementById("timeGoneBy").innerHTML = timeGoneBy; 
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

function changeTimer(session){
	newTimer = true; 
	 $('.pomProgressTimer').circleProgress(); 
	if(session == "session"){
		currentTime = sessionLength; 
	}
	else if(session == "short"){
		console.log(currentTime); 
		currentTime = shortBreakLength; 
		console.log(currentTime); 
	}
	else if(session == "long"){
		currentTime = longBreakLength; 
	} else{
		console.log("Error!"); 
	} 
	paused = false; 
	timeGoneBy = 0; 
	toggleBreaksAndSession(); 
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
			animationStartValue: progress,
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
	 $('.pomProgressTimer').circleProgress(); 
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
