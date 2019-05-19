
let res = document.getElementById("res");
    res.style.display = "none";
// this function returns a random integer between the two parameter. 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Enemies our player must avoid
var Enemy = function(x,y) {
    // variable x , y indicates the position. 
    this.x = x;
    this.y = y; 
    this.speed = getRandomInt(5, 25)*25;
    // this.sprite shows the image
    this.sprite = 'images/enemy-bug.png';
};

// Update function is used for changing the enemy location. 
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if(this.x>480){
        this.speed = getRandomInt(5, 25)*25;
        this.x= -100;
    }
    let xDif = Math.abs(player.x -this.x);
    let yDif = Math.abs(player.y-this.y);

    if (xDif<70 && yDif<25){
        player.x = 200;
        player.y = 403;
        

    };
};

// Render will draw the enemy 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class will render / move player. 

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    // x, y is the player position. 
    this.x = x; 
    this.y = y; 
};

// render will draw player. 
Player.prototype.render = function() {
   
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this will get the user input and use only 4 arrows to move the player in the grid 
Player.prototype.handleInput = function(keystr) {
let h = 100;
let v = 82;

if(this.y>74){
    if(keystr=="left"){
        if(this.x> 0){
           this.x -= h;
        }
        
    }else if (keystr== "right"){
        if (this.x <400){
           this.x += h;
        }
        
    }
    else if (keystr == "up"){
        if (this.y>30){
            this.y -= v;
        }
        
    }
    else if (keystr == "down"){
        if (this.y <400){
            this.y += v;
        }
    }

}
if (this.y < 60){
    res.style.display = "block";
    let btn = document.getElementById('reset-game');
    btn.onclick = function resetPlayerPosition (){
    this.x =200;
    this.y =403;
    res.style.display = "none";
};
}
};

// creating enemy arrays here 4 enemies generated. 
let allEnemies = [];
for (i=0;i<5;i++){
    let enemy = new Enemy(-100,60+83*(i%3));
    allEnemies.push(enemy);
}

let player = new Player(200,403);

//This is eventlistener to listen to keystroke. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
