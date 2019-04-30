// Enemies our player must avoid

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y; 
    this.speed = getRandomInt(3, 20)*25;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if(this.x>480){
        this.speed = getRandomInt(3, 20)*25;
        this.x=-100;
    }
    let xDif = Math.abs(player.x -this.x);
    let yDif = Math.abs(player.y-this.y);

    if (xDif<25 && yDif<25){
        player.x = 200;
        player.y = 403;

    };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x; 
    this.y = y; 
};

Player.prototype.update = function(){

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keystr) {
console.log(keystr);
let h = 100;
let v = 82;
if(keystr=="left"){
    if(player.x> 0){
        player.x -= h;
    }
    
}else if (keystr== "right"){
    if (player.x <400){
        player.x += h;
    }
    
}
else if (keystr == "up"){
    if (player.y>30){
        player.y -= v;
    }
    
}
else if (keystr == "down"){
    if (player.y <400){
        player.y += v;
    }
}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (i=0;i<5;i++){
    let enemy = new Enemy(-100,60+83*(i%3));
    allEnemies.push(enemy);
}

let player = new Player(200,403);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
