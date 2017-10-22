var  shortBreak = 300; 
var longBreak = 900; 
var session = 1500; 
var paused = false; 
var timeGoneBy = 0; 
var currentTime = 1500; 

// Create an interval where the timeGoneBy increases, the progress bar changes. 

function timer(){
	if(!paused){
		timeGoneBy++; 
		if(timeGoneBy > currentTime){
			paused = true; 
			
		}
	}
	
}

