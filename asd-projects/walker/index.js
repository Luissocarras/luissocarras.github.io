/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
   const BOARD_HEIGHT = $("#board").height();
     const WALKER_HEIGHT = $("#walker").height();
   const WALKER_WIDTH = $("#walker").width();
  
  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    
    A: 65,
    D: 68,
    W: 87,
    S: 83,
    
    C: 67
  }
  // Game Item Objects
  
  var walker = {
    xPos: 0,
    yPos: 0,
    speedX: 0,
    speedY: 0,
   }
   var walker2 = {
    xPos: BOARD_WIDTH - WALKER_WIDTH,
    yPos: BOARD_HEIGHT - WALKER_HEIGHT,
    speedX: 0,
    speedY: 0,
   }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown); 
  $(document).on('keyup', handleKeyUp);                          
 $("#board").click(changeColor);
  // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallcollision();
  }
    // CORE LOGIC...
  
    function handleKeyDown(event) {
      if (event.which === KEY.LEFT){
          console.log("left");
        walker.speedX = -5
        }
          if (event.which === KEY.RIGHT){
          console.log("right");
             walker.speedX = 5
        }
          if (event.which === KEY.UP){
          console.log("up");
             walker.speedY = -5
        }
          if (event.which === KEY.DOWN){
          console.log("down");
            walker.speedY = 5
        }
          if (event.which === KEY.A){
          console.log("left");
        walker2.speedX = -5
        }
          if (event.which === KEY.D){
          console.log("right");
             walker2.speedX = 5
        }
          if (event.which === KEY.W){
          console.log("up");
             walker2.speedY = -5
        }
          if (event.which === KEY.S){
          console.log("down");
            walker2.speedY = 5
        }
          
          if(event.which === KEY.C){
            changeColor();
          }
            
        }
  
  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0
      }
       
        if (event.which === KEY.UP || event.which === KEY.DOWN){
           walker.speedY = 0
      }
         
         if (event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0
      }
       
        if (event.which === KEY.W || event.which === KEY.S){
           walker2.speedY = 0
      }
       }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveWalker (x, y) {
    walker.x = x
    walker.y = y
    $("#walker").css('left', walker.x);
    $("#walker").css('top', walker.y);
}

function doCollide(walker, walker2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    walker.leftX = walker.x;
    walker.topY = walker.y;
    walker.rightX = walker.x + WALKER_WIDTH;
    walker.bottomY = walker.y + WALKER_HEIGHT;
  
    // TODO: Do the same for square2
    walker2.leftX = walker2.x;
    walker2.topY = walker2.y;
    walker2.rightX = walker2.x + WALKER_WIDTH;
    walker2.bottomY = walker2.y + WALKER_HEIGHT;
    // TODO: Return true if they are overlapping, false otherwise
	if(
    walker2.rightX >walker.leftX &&
      walker2.leftX < walker.rightX &&
    walker2.bottomY > walker.topY && 
      walker2.topY < walker.bottomY
    ){
      return true, changeColor, orange;
    } else {
      return false, changeColor, teal;
    }
		
}

  function repositionGameItem(){
    walker.xPos += walker.speedX;
    walker.yPos += walker.speedY;
    
    walker2.xPos += walker2.speedX;
    walker2.yPos += walker2.speedY;
  }
  
  function redrawGameItem(){
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);
    
     $("#walker2").css("left", walker2.xPos);
    $("#walker2").css("top", walker2.yPos);
  }
  
  function wallcollision(){
    if(walker.xPos > BOARD_WIDTH - WALKER_WIDTH || walker.xPos < 0   ){
      walker.xPos -= walker.speedX;
    }
   
    if(walker.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker.yPos < 0 ){
      walker.yPos -= walker.speedY; 
    }
    
    if(walker2.xPos > BOARD_WIDTH - WALKER_WIDTH || walker2.xPos < 0   ){
      walker2.xPos -= walker2.speedX;
    }
   
    if(walker2.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker2.yPos < 0 ){
      walker2.yPos -= walker2.speedY; 
    }
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
