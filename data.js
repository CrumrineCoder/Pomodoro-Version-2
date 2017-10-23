var  shortBreakLength = 300; 
var longBreakLength = 600; 
var sessionLength = 1500; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 1500; 

// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	if(!paused){
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
	else if(paused){
		paused = false; 
		document.getElementById("pause").style.display = "block"; 
		document.getElementById("play").style.display = "none"; 
		document.getElementById("reset").style.display = "none"; 
		toggleBreaksAndSession();
	}
	else if(!paused){
		paused = true; 
		document.getElementById("pause").style.display = "none"; 
		document.getElementById("play").style.display = "block"; 
		document.getElementById("reset").style.display = "block"; 
		toggleBreaksAndSession();
	}
	
}

function reset(){
	if(timeGoneBy == currentTime){
		toggleBreaksAndSession(); 
	}
	timeGoneBy = 0; 
	togglePause(); 
}

function changeTime(amount, session){
		console.log(session); 
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