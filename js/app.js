// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    'use strict';
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    'use strict';
    // enemies loop to left side when reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // check for collision
    collision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Place the player object in a variable called player
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
}


// Draw the player on the screen
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

// Function to display player's score
const displayScoreLevel = function(displayScore, displayLevel) {
    let canvas = document.getElementsByTagName('canvas');
    let firstCanvasTag = canvas[0];

    // add player score and level to div
    scoreLevelDiv.innerHTML = 'Score: ' + displayScore
        + ' / ' + 'Level: ' + displayLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

const collision = function(theEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= theEnemy.y + 90
        && player.x + 25 <= theEnemy.x + 88
        && player.y + 73 <= theEnemy.y + 135
        && player.x + 76 >= theEnemy.x + 11) {
        alert('They got you! Try Again.');
        player.x = 202.5;
        player.y = 383;
    };

    // check for player winning the game
    // if player wins, add 1 to the score and level
    // pass score as argument to increaseDifficulty function
    if (player.y + 63 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        
        increaseDifficulty(score);
        alert('Congratulations! You made it! Current Score: ' + score + ', Current Level: ' + gameLevel);
    };

    // prevent player from moving beyond boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies based on level
const increaseDifficulty = function(numEnemies) {
    // reset enemies
    allEnemies.length = 0;

    for (i = 0; i <= numEnemies; i++) {
        let enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        
        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
let allEnemies = [];
let player = new Player(202.5, 383, 50);
let score = 0;
let gameLevel = 1;
let scoreLevelDiv = document.createElement('div');
let enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});