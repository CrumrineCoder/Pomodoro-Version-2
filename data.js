var  shortBreakLength = 5; 
var longBreakLength = 8; 
var sessionLength = 10; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 10; 

// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	if(!paused){
		document.getElementById("sessionLength").innerHTML = currentTime; 
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