var score = 0;

var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.init();
};

Enemy.prototype.init = function() {
  this.x = 0;
  this.y = 83 * getRandomInt(1, 3);
  this.speed = getRandomInt(2, 8);
};

Enemy.prototype.update = function(dt) {

  this.x = (this.x + this.speed);
  if (this.x > 420) {
    this.init();
  }
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.init();
};

Player.prototype.init = function() {
  this.x = 200;
  this.y = 415;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
  allEnemies.forEach(function(enemy) {
    if (isTooClose(enemy, player)) {
      player.x = 200;
      player.y = 415;
    }
  });
};

Player.prototype.handleInput = function() {
  var task = arguments[0];
  if (task == "left") {
    this.x = this.x - 101;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } else if (task == "right") {
    this.x = this.x + 101;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } else if (task == "up") {
    console.log(this.y);
    if (this.y < 90) {
      console.log("upper " + this.y);
      score += 50;
      document.getElementById("scoreById").innerHTML = "Score " + score;

      this.init();
    } else {
      this.y = this.y - 83;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
  } else if (task == "down") {
    console.log(this.y);
    if (this.y > 400) {
      console.log("lower " + this.y);
    } else {
      console.log("else " + this.y);
      this.y = this.y + 83;
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 1);
    }
  }
  if (this.x < -10 || this.x > 420) {
    this.init();
  }

};

function isTooClose(enemy, player) {

  if (Math.abs(enemy.x - player.x) < 50) {
    if (Math.abs(enemy.y - player.y) < 41) {
      console.log("umgefahren");
      score -=25;
      document.getElementById("scoreById").innerHTML = "Score " + score;
      return true;
    }
  }
  return false;
}

var allEnemies = Array();
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

var some = '<h1 id=scoreById>Score %data%</h1>';
some = some.replace("%data%", score);
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
