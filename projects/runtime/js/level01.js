var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 295},
                { "type": "sawblade", "x": 600, "y": groundY - 360},
                { "type": "sawblade", "x": 800, "y": groundY - 267},
                { "type": "sawblade", "x": 2400, "y": groundY - 295},
                { "type": "sawblade", "x": 2600, "y": groundY - 360},
                { "type": "sawblade", "x": 2800, "y": groundY - 267},
                { "type": "sawblade", "x": 3400, "y": groundY - 360},
                { "type": "sawblade", "x": 3600, "y": groundY - 295},
                { "type": "sawblade", "x": 3800, "y": groundY - 360},

                { "type": "pitFall", "x": 2000, "y": groundY - 460},
                { "type": "pitFall", "x": 3000, "y": groundY - 460},

                { "type": "enemy", "x": 400, "y": groundY - 50},
                { "type": "enemy", "x": 600, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 3400, "y": groundY - 50},
                { "type": "enemy", "x": 3600, "y": groundY - 50},
                { "type": "enemy", "x": 3800, "y": groundY - 50},

                { "type": "fireEnemy", "x": 2200, "y": groundY - 49},
                { "type": "fireEnemy", "x": 2950, "y": groundY - 49},
                { "type": "fireEnemy", "x": 3200, "y": groundY - 49},
                { "type": "fireEnemy", "x": 3900, "y": groundY - 49},

                { "type": "reward", "x": 1000, "y": groundY - 60 },
                { "type": "reward", "x": 8000, "y": groundY - 60 },
               
                { "type": "health", "x": 1000, "y": groundY - 60},
                { "type": "health", "x": 3600, "y": groundY - 60},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       
        // function creates a sawblade at a given x and y value
        function createSawBlade(x, y){
            var hitZoneSize = 25; // size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 10; // sets the damage amount and assigns to a variable called damageFromObstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the the obstacle and assigns the damage to the obstacle 
            sawBladeHitZone.x = x; // assigns the x value using the argument passed as the x perimiter 
            sawBladeHitZone.y = groundY - y; // assigns the y value using the argument passed as the y perimiter 
            game.addGameItem(sawBladeHitZone); // adds the hitzone to the game
            var obstacleImage = draw.bitmap("img/sawblade.png"); // draws the image as a bitmap and stores it as the sawblade
            sawBladeHitZone.addChild(obstacleImage); // adds obstacle image as a child of the sawBladeHitzone 
            obstacleImage.x = -25; // modify the x value of the image to line up with the hitzone
            obstacleImage.y = -25; // modify the y value of the image to line up with the hitzone
    
        }
       
        function createPitFall(x, y){
            var hitZoneSize = 80; // size of the hitzone assigned to the variable hitZoneSize
            var damageFromObstacle = 10000; // sets the damage amount and assigns to a variable called damageFromObstacle
            var pitFallHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the the obstacle and assigns the damage to the obstacle 
           pitFallHitZone.x = x; // assigns the x value using the argument passed as the x perimiter 
            pitFallHitZone.y = groundY - y; // assigns the y value using the argument passed as the y perimiter 
            game.addGameItem(pitFallHitZone); // adds the hitzone to the game
            var obstacleImage = draw.bitmap("img/pitfall.png"); // draws the image as a bitmap and stores it as the sawblade
           pitFallHitZone.addChild(obstacleImage); // adds obstacle image as a child of the sawBladeHitzone 
            obstacleImage.x = -180; // modify the x value of the image to line up with the hitzone
            obstacleImage.y = -70; // modify the y value of the image to line up with the hitzone
    
        }
       
   
       
        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 25); // creates the gameItem and stores it to the variable enemy
            var redSquare = draw.rect(50, 50,'red'); // draws a rectangle and stores it in the variable enemy
            redSquare.x = -25; // stores a value as the x value of the gameItem
            redSquare.y = -25; // stores a value as the y value of the gameItem
            var redSquare = draw.bitmap('img/enemyRobot.png');
            enemy.addChild(redSquare); // adds the gameItem as a child of game enemy 
            enemy.x = x; // stores the value passed as the x argument as enemy's x value
            enemy.y = y;// stores the value passed as the y argument as enemy's y value
            game.addGameItem(enemy); // adds the enemy as an item to the game 
            enemy.velocityX = -1.5; // assigns a value to the velocityX of the enemy to make it move
           redSquare.x = - 80;
           redSquare.y = - 73;
          
            enemy.onPlayerCollision = function () { 
                game.changeIntegrity(-10); // subtracts from the health when Halle collides with enemy
            };
            enemy.onProjectileCollision = function (){ 
                game.increaseScore(100); // increases the score when Halle shoots the enemy
                enemy.fadeOut(); // the enemy fades when Halle shoots it
            }
          }
          
          function createFireEnemy(x, y) {
            var fireEnemy = game.createGameItem("fireEnemy", 25); // creates the gameItem and stores it to the variable enemy
            var yellowSquare = draw.rect(50, 50,'yellow'); // draws a rectangle and stores it in the variable enemy
            yellowSquare.x = -25; // stores a value as the x value of the gameItem
            yellowSquare.y = -25; // stores a value as the y value of the gameItem
            var yellowSquare = draw.bitmap('img/robotEnemy.png');
            fireEnemy.addChild(yellowSquare); // adds the gameItem as a child of game enemy 
            fireEnemy.x = x; // stores the value passed as the x argument as enemy's x value
            fireEnemy.y = y;// stores the value passed as the y argument as enemy's y value
            game.addGameItem(fireEnemy); // adds the enemy as an item to the game 
            fireEnemy.velocityX = -1.6; // assigns a value to the velocityX of the enemy to make it move
            yellowSquare.x = - 80;
            yellowSquare.y = - 73;
          
            fireEnemy.onPlayerCollision = function () { 
                game.changeIntegrity(-30); // subtracts from the health when Halle collides with enemy
            };
            fireEnemy.onProjectileCollision = function (){ 
                game.increaseScore(150); // increases the score when Halle shoots the enemy
                fireEnemy.fadeOut(); // the enemy fades when Halle shoots it
            }
          }
          
          function createReward(x, y) {
            var reward = game.createGameItem("reward", 25); // creates the gameItem and stores it to the variable reward
            var rewardImage = draw.bitmap("img/chest.png");
            var blueSquare = draw.rect(50, 50, 'DarkBlue'); // draws a rectangle and stores it in the variable reward
            blueSquare.x = -25; // stores a value as the x value of the gameItem
            blueSquare.y = -25; // stores a value as the y value of the gameItem
           reward.addChild(rewardImage);  // adds the gameItem as a child of game reward 
           reward.x = x; // stores the value passed as the x argument as reward's x value
            reward.y = y; // stores the value passed as the y argument as reward's y value
           game.addGameItem(reward);  // adds the reward as an item to the game 
            rewardImage.x = -100; // modify the x value of the image to line up with the hitzone
            rewardImage.y = -100;
           reward.velocityX = -3; // assigns a value to the velocityX of the reward to make it move
        
           reward.onProjectileCollision = function () { 
            game.increaseScore(4800); // when Halle tuches the reward it gives a score   
                reward.fadeOut(); // when Halle tuches the reward it fades
            };
          
          }

          function createHealth(x, y) {
            var health = game.createGameItem("health", 25); // creates the gameItem and stores it to the variable health
            var healthImage = draw.bitmap("img/health.png");
            var pinkSquare = draw.rect(50, 50,'pink'); // draws a rectangle and stores it in the variable health
            pinkSquare.x = -25; // stores a value as the x value of the gameItem
            pinkSquare.y = -25; // stores a value as the y value of the gameItem
           health.addChild(healthImage);  // adds the gameItem as a child of game health
            health.x = x; // stores the value passed as the x argument as health's x value
            health.y = y; // stores the value passed as the y argument as health's y value
           game.addGameItem(health);  // adds the health as an item to the game 
           healthImage.x = -100; // modify the x value of the image to line up with the hitzone
           healthImage.y = -100;
           health.velocityX = -1; // assigns a value to the velocityX of the health to make it move
          health.onProjectileCollision = function () { 
            game.changeIntegrity(100); // Adds from the health when Halle collides with health
                health.fadeOut(); // when Halle tuches the health it fades
            };
          
          }
          
          //Loop for gameItems
          for (var i = 0; i < levelData.gameItems.length; i++ ){ 
            var gameItem = levelData.gameItems[i]; // assigns the current index of gameItem

            if(gameItem.type === "sawblade"){ // checks the type of game item 
                createSawBlade(gameItem.x, gameItem.y); // if the type is true it executes createSawBlade
            }
           
            if(gameItem.type === "pitFall"){ // checks the type of game item 
                createPitFall(gameItem.x, gameItem.y); // if the type is true it executes createPitFall
            }

            if(gameItem.type === "enemy"){ // checks the type of game item 
                createEnemy(gameItem.x, gameItem.y);  // if the type is true it executes createEnemy
            }

            if(gameItem.type === "fireEnemy"){ // checks the type of game item 
                createFireEnemy(gameItem.x, gameItem.y);  // if the type is true it executes createFireEnemy
            }

            if(gameItem.type === "reward"){ // checks the type of game item 
                createReward(gameItem.x, gameItem.y); // if the type is true it executes createReward
            }
            if(gameItem.type === "health"){ // checks the type of game item 
                createHealth(gameItem.x, gameItem.y); // if the type is true it executes createHealth
            }
          }



        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
