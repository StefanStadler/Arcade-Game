var score = 0;

// Definiton and Initialization an Enemy
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.init();
};
// get a random Number
Enemy.prototype.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// initializes Enemy`s position and speed
Enemy.prototype.init = function() {
  this.x = 0;
  this.y = 83 * this.getRandomInt(1, 3);
  this.speed = this.getRandomInt(2, 8);
};
// Updates enemies position according to the speed
Enemy.prototype.update = function(dt) {
  this.x = (this.x + this.speed);
  // if Enemy reaches right edge of the canvas -> Enemy is moved back to the starting point
  if (this.x > 420) {
    this.init();
  }
};
// renders the Enemy`s picture on the canvas
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// initializes the Player
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.init();
};
// Defines the start Position of the Player
Player.prototype.start_x = 200;
Player.prototype.start_y = 415;
// Method to determine wether Player is hit by an Enemy
Player.prototype.isTooClose = function(enemy, player) {
    if (Math.abs(enemy.x - player.x) < 50) {
      if (Math.abs(enemy.y - player.y) < 41) {
        score -= 25;
        document.getElementById("scoreById").innerHTML = "Score " + score;
        return true;
      }
    }
    return false;
  }
  // Initializes the position of the Player
Player.prototype.init = function() {
  this.x = this.start_x;
  this.y = this.start_y;
};
// Renders the Player Image on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Updates the players Posiiton according to the new position
Player.prototype.update = function(dt) {
  var self = this; // This is required to bid the Player object within the allEnemies array objec
  allEnemies.forEach(function(enemy) {
    // In case player is too close to an Enemy Player is sent back to starting position
    if (self.isTooClose(enemy, self)) {
      self.x = 200;
      self.y = 415;
    }
  });
}


//    Canvas Axes and scalar positions
//    y     0
//    y     |
//    y     |
//    y     v      0  - - -> 400
//    y    415   xxxxxxxxxxxxxxx

// Method to handle Input for the Players behaviour
Player.prototype.handleInput = function() {
  var task = arguments[0];
  // If input is left x is decremented
  if (task == "left") {
    this.x -= 101;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } // If input is right x is incremented
  else if (task == "right") {
    this.x += 101;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } // If input is up y is decremented
  else if (task == "up") {
    console.log(this.y);
    // if y-position is below 90 the goal is reached -> player gets additional score
    if (this.y < 90) {
      score += 50;
      document.getElementById("scoreById").innerHTML = "Score " + score;
      this.init();
    } else {
      this.y = this.y - 83;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } // if input is down -> y position is incremented
  else if (task == "down") {
    // is input is down and endpoint not reach (y<415) then increment y position
    if (this.y < 400) {
      this.y = this.y + 83;
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
    }
  }
  // if left or right border of canvas is reached, push player back to starting position
  if (this.x < -10 || this.x > 420) {
    this.init();
  }

}

// create Enemy and Player instances
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// generate html heading to show scare
var some = '<h1 id=scoreById>Score %score%</h1>';
some = some.replace("%score%", score);
$("#score").append(some);

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
