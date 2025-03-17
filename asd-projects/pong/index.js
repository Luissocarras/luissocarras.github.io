/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
const PADDLE_HEIGHT = $("#leftPaddle").height();
const BALL_HEIGHT = $("#ball").height();
const BALL_WIDTH = $("#ball").width();
  // Game Item Objects
const KEY = {
"W": 87,
"S": 83,
"UP": 38,
"DOWN": 40
}



function GameItem(id, speedX, speedY){
var objInstance = {
id: id,
 x: parseFloat($(id).css("left")),
 y:  parseFloat($(id).css("top")),
 speedX: speedX,
 speedY: speedY,
w: $(id).width(),
h:$(id).height(),



}
return objInstance;
}

var leftPaddle = GameItem("#leftPaddle", 0 , 0);
var rightPaddle = GameItem("#rightPaddle", 0 , 0);
var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1) );
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(leftPaddle);
    updateGameItem(leftPaddle);
    drawGameItem(rightPaddle);
    updateGameItem(rightPaddle);
    drawGameItem(ball);
    updateGameItem(ball);
wallcollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
if(event.which === KEY.W){
leftPaddle.speedY = -5;
}
if(event.which === KEY.S){
  leftPaddle.speedY = 5;
  }
  if(event.which === KEY.UP){
    rightPaddle.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      rightPaddle.speedY = 5;
      }
  }
  
function handleKeyUp(event){
if(event.which === KEY.W){
  leftPaddle.speedY = 0;
}
if(event.which === KEY.S){
  leftPaddle.speedY = 0;
}
if(event.which === KEY.UP){
  rightPaddle.speedY = 0;
}
if(event.which === KEY.DOWN){
  rightPaddle.speedY = 0;
}
} 
function wallcollision(){
  if(leftPaddle.y > BOARD_HEIGHT - PADDLE_HEIGHT || leftPaddle.y < 0   ){
   leftPaddle.y-= leftPaddle.speedY;
  }
  if(rightPaddle.y > BOARD_HEIGHT - PADDLE_HEIGHT || rightPaddle.y < 0   ){
    rightPaddle.y-= rightPaddle.speedY;
   }
   if(ball.y > BOARD_HEIGHT - BALL_HEIGHT || ball.y < 0   ){
    ball.y-= ball.speedY;
   }
   if(ball.x > BOARD_WIDTH - BALL_WIDTH || ball.x < 0   ){
    ball.x-= ball.speedX;
   }
 
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    ///Movement Helper///
function drawGameItem(obj){
$(obj.id).css("left", obj.x);
$(obj.id).css("top", obj.y);
}
  
function updateGameItem(obj){
obj.x += obj.speedX;
obj.y += obj.speedY;
}
//check boundries of paddles//
//determine if objects collide//
//handle what happens when ball hits walls//
// handle what happens when ball hits paddles//
//handle what happens when someone wins//
//handles points//
// handle reset of game//



/* 
This Function will be called 20 times/second. Each time it is called,
it should move the Box to a new location. If the box drifts off the screen
turn it around! 
*/

function update() {
  moveBoxTo(positionX, positionY);
  positionX = positionX + speed;
          positionY = positionY + speedY;
          if (positionX > boardWidth - 85){
              speed = -speed;
          }
          if (positionX < 0){
              speed = -speed;
    speed = -speed;  
              speed = -speed;
          }
          if (positionY > boardHeight - 85){
              speedY = -speedY;
          }
          if (positionY < 0){
              speedY = -speedY;
          }

};

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
