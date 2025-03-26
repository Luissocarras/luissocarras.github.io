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
const PADDLE_WIDTH = $("#leftPaddle").width();
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
var pointsLeft = 0;
var pointsRight = 0;
$("#playAgain").hide();
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
    ballColisionBT();
    ballColisionLR();
    paddleBoundries(leftPaddle);
    paddleBoundries(rightPaddle);
    paddleColisions();
    detectGameEnd();
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

 
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    ///Movement Helper///
function drawGameItem(obj){
$(obj.id).css("left", obj.x);
$(obj.id).css("top", obj.y);
}
  function paddleBoundries(obj){
if(obj.y < 0 || obj.y > BOARD_HEIGHT - PADDLE_HEIGHT){
  obj.y -= obj.speedY;
}
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
function paddleColisions(){
  if(doCollide(ball, leftPaddle)){
ball.speedX = -ball.speedX
  }
  if(doCollide(ball, rightPaddle)){
    ball.speedX = -ball.speedX
      }
}

function reset(){
  leftPaddle = GameItem("#leftPaddle", 0 , 0);
 rightPaddle = GameItem("#rightPaddle", 0 , 0);
 ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1) );
 ball.x = BOARD_WIDTH /2;
 ball.y = BOARD_HEIGHT /2;
}

function ballColisionLR(){
  if(ball.x + BALL_WIDTH > BOARD_WIDTH){
//score
pointsLeft++
$("#leftPointValue").text(pointsLeft)
ball.speedX++
reset();
  }
  if(ball.x + BALL_WIDTH < 0){
    //pos reset
    pointsRight++
$("#rightPointValue").text(pointsRight)
ball.speedX++
reset();

      }
      
}

function doCollide(obj1, obj2){
if(
  obj1.x + obj1.w > obj2.x &&
  obj1.x < obj2.x + obj2.w &&
  obj1.y + obj1.h > obj2.y &&
  obj1.y < obj2.y + obj2.h 
  
){
return true;
}
return false;
}

function ballColisionBT(){
  if (ball.y < 0){
 ball.speedY = -ball.speedY;
  }  
  if(ball.y + BALL_HEIGHT > BOARD_HEIGHT){
    ball.speedY = -ball.speedY;
  }
 }


function detectGameEnd(){
  if(pointsLeft === 15 || pointsRight === 15 ){
reset();
endGame();
  }
}
function playAgainButton(){
  $("#playAgain").css("top", BOARD_HEIGHT / 2);
  $("#playAgain").css("left", BOARD_WIDTH / 2 - $ ("#playAgain").width()/2);
  $("#playAgain").show();
}

  function endGame() {
    // stop the interval timer
    playAgainButton();

    // turn off event handlers
    $(document).off();
  }
  
}
