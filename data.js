var  shortBreak = 300; 
var longBreak = 900; 
var session = 10; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 10; 

// Create an interval where the timeGoneBy increases, the progress bar changes. 

document.getElementById("sessionLength").innerHTML = session; 
function timer(){
	if(!paused){
		timeGoneBy++; 
		document.getElementById("timeGoneBy").innerHTML = timeGoneBy; 
		if(timeGoneBy >= currentTime){
			paused = true; 
			
		}
	}
	
}
var pomodoro = setInterval(timer, 1000); 
