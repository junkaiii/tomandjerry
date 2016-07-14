var boxTom;  //defining tom as a variable
var boxJerry; //defining jerry as a variable

// Game Area Object
var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = 700;
      this.canvas.height = 400;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(moveTom, 20);
    },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// Make Components Constructor -> blueprint for characters
var MakeComponents = function(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  };

};


// Create Sprites and the Gameboard + Game initialisation
function startGame() {
  boxTom = new MakeComponents (30, 30, "red", 10, 120);
  boxJerry = new MakeComponents (30, 30, "black", 60, 120);
  gameArea.start();
}

startGame();

function moveTom() {
  gameArea.clear();
  boxTom.newPos();
  boxTom.update();
  boxJerry.newPos();
  boxJerry.update();
}


//Moving boxTom

function moveYup() {
    boxTom.speedY -= 1;
    if (boxTom.speedY < -2) {
      boxTom.speedY = -2;
    }
}

function moveYdown() {
    boxTom.speedY += 1;
    if (boxTom.speedY > 2) {
      boxTom.speedY = 2;
    }
}

function moveYend() {
    boxTom.speedY = 0;
}

function moveXleft() {
    boxTom.speedX -= 1;
    if (boxTom.speedX < -2) {
      boxTom.speedX = -2;
    }
}

function moveXright() {
    boxTom.speedX += 1;
    if (boxTom.speedX > 2) {
      boxTom.speedX = 1;
    }
}

function moveXend() {
    boxTom.speedX = 0;
}

var keypressW = function(w){
  if (w.which == 87) {
    moveYup();
  }
};

var keypressWx = function(w){
  if (w.which == 87) {
    moveYend();
  }
};

var keypressS = function(s){
  if (s.which == 83) {
    moveYdown();
  }
};

var keypressSx = function(s){
  if (s.which == 83) {
    moveYend();
  }
};

var keypressA = function(a){
  if (a.which == 65) {
    moveXleft();
  }
};

var keypressAx = function(a){
  if (a.which == 65) {
    moveXend();
  }
};

var keypressD = function(d){
  if (d.which == 68) {
    moveXright();
  }
};

var keypressDx = function(d){
  if (d.which == 68) {
    moveXend();
  }
};


var playerOneKeys = function() {
$(document).on('keydown', keypressW);
$(document).on('keyup', keypressWx);
$(document).on('keydown', keypressS);
$(document).on('keyup', keypressSx);
$(document).on('keydown', keypressA);
$(document).on('keyup', keypressAx);
$(document).on('keydown', keypressD);
$(document).on('keyup', keypressDx);
};

setInterval(playerOneKeys, 20);

//moving boxJerry

function moveYup2() {
    boxJerry.speedY -= 1;
    if (boxJerry.speedY < -1) {
      boxJerry.speedY = -1;
    }
}

function moveYdown2() {
    boxJerry.speedY += 1;
    if (boxJerry.speedY > 1) {
      boxJerry.speedY = 1;
    }
}

function moveYend2() {
    boxJerry.speedY = 0;
}

function moveXleft2() {
    boxJerry.speedX -= 1;
    if (boxJerry.speedX < -1) {
      boxJerry.speedX = -1;
    }
}

function moveXright2() {
    boxJerry.speedX += 1;
    if (boxJerry.speedX > 1) {
      boxJerry.speedX = 1;
    }
}

function moveXend2() {
    boxJerry.speedX = 0;
}




var keypressUp = function(up){
  if (up.which == 38) {
    moveYup2();
  }
};

var keypressUpx = function(up){
  if (up.which == 38) {
    moveYend2();
  }
};

var keypressDown = function(down){
  if (down.which == 40) {
    moveYdown2();
  }
};

var keypressDownx = function(down){
  if (down.which == 40) {
    moveYend2();
  }
};

var keypressLeft = function(left){
  if (left.which == 37) {
    moveXleft2();
  }
};

var keypressLeftx = function(left){
  if (left.which == 37) {
    moveXend2();
  }
};

var keypressRight = function(right){
  if (right.which == 39) {
    moveXright2();
  }
};

var keypressRightx = function(right){
  if (right.which == 39) {
    moveXend2();
  }
};


var playerTwoKeys = function(){
$(document).on('keydown', keypressUp);
$(document).on('keyup', keypressUpx);
$(document).on('keydown', keypressDown);
$(document).on('keyup', keypressDownx);
$(document).on('keydown', keypressLeft);
$(document).on('keyup', keypressLeftx);
$(document).on('keydown', keypressRight);
$(document).on('keyup', keypressRightx);
};

setInterval(playerTwoKeys, 20);
