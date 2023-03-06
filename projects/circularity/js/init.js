var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
      
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;  // The variable that holds a single circle when creating circles and iterating.
        var circles = []; // The variable that stores all circles in one Array.

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() { // This block of code is used to draw a circle in a random spot and give the circles a random speed.
        circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
        physikz.addRandomVelocity(circle, canvas);
        view.addChild(circle);
        circles.push(circle);
    }
        // TODO 3 / 7 : Call the drawCircle() function 
        for (var loopsCompleted = 0; loopsCompleted <= 250; loopsCompleted++) { // This code loops the drawCircle() function 250 times.
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            for (var i = 0; i < circles.length; i++) {  // This block of code moves all 100 circles, updates their positions and checks their positions.
               var circle = circles[i];
              physikz.updatePosition(circles[i]);
              game.checkCirclePosition(circles[i]); 
            }
    
            // TODO 4 : Update the circle's position //
            physikz.updatePosition(circles[0]); // This code returns the first value in the circles array and updates its position.
            physikz.updatePosition(circles[1]); // This code returns the second value in the circles array and updates its position.
            physikz.updatePosition(circles[2]); // This code returns the third value in the circles array and updates its position.
            physikz.updatePosition(circles[3]); // This code returns the fourth value in the circles array and updates its position.
            physikz.updatePosition(circles[4]); // This code returns the fith value in the circles array and updates its position.
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            game.checkCirclePosition(circles[0]); // This code returns the first value in the circles array and it checks the circle position.
            game.checkCirclePosition(circles[1]); // This code returns the second value in the circles array and it checks the circle position.
            game.checkCirclePosition(circles[2]); // This code returns the third value in the circles array and it checks the circle position.
            game.checkCirclePosition(circles[3]); // This code returns the fourth value in the circles array and it checks the circle position.
            game.checkCirclePosition(circles[4]); // This code returns the fith value in the circles array and it checks the circle position.

            
                
              
             
            // TODO 9 : Iterate over the array
            for (var i = 0; i < 0; i++) { // This block of code keeps all the circles inbounds.
                game.checkCirclePosition(circles[i]);
                physikz.updatePosition(circles[i]);
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // Checks if the circle has gone past the RIGHT side of the screen then place it on the LEFT.
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
           
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0 ) { // Checks if the circle has gone past the LEFT side of the screen then place it on the RIGHT.
                circle.x = canvas.width;
            }  
            if ( circle.y < 0 ) { // Checks if the circle has gone past the TOP side of the screen then place it on the BOTTOM.
                circle.y = canvas.height;
            }
            if ( circle.y > canvas.height ) {  // Checks if the circle has gone past the BOTTOM side of the screen then place it on the TOP.
                circle.y = 0;
            }
            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
