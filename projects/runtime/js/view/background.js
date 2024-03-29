var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
 
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight,'grey');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a moon and starfield 
           
            // loop that draws stars
           /* for(var i = 0; i < 100; i++){
                var circle = draw.circle(3, "white", "LightGray", 2); // draws a circle and stores it in the circle variable
                circle.x = canvasWidth * Math.random(); //  takes the width of the canvas and multiplies times a random decimal and it stores that as the x value for the circle
                circle.y = groundY * Math.random(); // takes groundY and multiplies times a random decimal and it stores that as the y value for the circle
                background.addChild(circle); // adds that circle to the background as a child
              }
                */
            var moon = draw.bitmap("img/spaceBackground.png"); // draws the image as a bitmap and stores it to the variable moon
            moon.x = 1; // creates an x key for the moon object and assigns it a value of 300
            moon.y = groundY - 412; // creates an y key for the moon object and assigns it a value of 200
           moon.scaleX = 5; // scale the x value of the moon
           moon.scaleY =  3; // scale the y value of the moon
           background.addChild(moon); // add the moon as a child of background
         
           
           // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
          var buildingHeights = [160, 160, 160, 160];  // creates a array of buildingHeight and stores 300 as the height of the building
          var buildingColors = ["LightGrey", "Grey", "DarkGrey", "Grey"]; // stores an array of colors in buildingHeights
          // loop that will create the buildings
          var building; // draws a rectangle and stors it in the variable building 
          for (var i = 0; i < buildingHeights.length; i++) {
            building = draw.rect(75, buildingHeights[i], buildingColors[i], "black", 1);     
            building = draw.bitmap("img/sciFiPillar.png");
            
            building.x = 400 * i; // multiplies 200 times the current iteration of the loop so that the buildings are 200 pixels apart and stores it as the x value of the building
            building.y = groundY - buildingHeights[i]; // subtracts buildingHeight from groundY and sets it as the y value
            background.addChild(building); // add the building as a child to the background
            buildings.push(building); // adds the building to the buildings array
           
          }
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/Sci-fi door.png"); // draws a tree uesing bitmap and stores the variable tree
            tree.x = canvasWidth; // sets the x value of the tree 
            tree.y = groundY - 104; // sets the y value of the tree
            background.addChild(tree); // adds the tree to the background as a child
           
          
            
        } // end of render function - DO NOT DELETE
               
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 0.7; // takes the current x position of the tree to make it move left subtracts 3 and reassigns it to tree.
            // check if the tree has moved off the canvas and if it has it resets to the right side of the canvas
            if (tree.x < -200) {
              tree.x = canvasWidth;
            
            
            
            }   
           
                  // TODO 5: Part 2 - Parallax
            // loops through the buildings array to acess each index of the array, move it, and check its position on the canvas if it has gone off the left side of the canvas it resets to the right side of the canvas
            for (var i = 0; i < buildings.length; i++){
                  var building = buildings[i];
                 building.x = building.x - 0.3; // what moves the building
                  if (building.x < -300) { // checks the position of the building
                    building.x = canvasWidth; // resets the building to the right side of the canvas
                  }
            }



        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
