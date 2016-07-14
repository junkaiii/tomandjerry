var boxTom; //defining tom as a variable
var boxJerry; //defining jerry as a variable

//instruction event listners
$("#instructions").hover(
  function() {
    $("#instructions2").show();
  }, function() {
    $("#instructions2").hide();
  }
);


// Game Area Object
var gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 700;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[2]);
    this.interval = setInterval(moveTom, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

// Make Components Constructor -> blueprint for characters
var MakeComponents = function(width, height, color, x, y, type) {
  this.type = type;
  if (type == 'image') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((myright > gameArea.canvas.width) || (myleft < 0) || (mytop < 0) || (mybottom > gameArea.canvas.height)) {
      crash = 'wall';
      console.log('wall');
    } else if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      crash = false;
    }
    return crash;
  };

};


// Create Sprites and the Gameboard + Game initialisation
function startGame() {
  boxTom = new MakeComponents(56, 57, "images/tom.gif", 10, 120, "image");
  boxJerry = new MakeComponents(56, 49, "images/jerry.gif", 60, 200, "image");
  gameArea.start();
}

startGame();

function moveTom() {
  if (boxJerry.x === 0) {
    boxJerry.x = gameArea.canvas.width;
  } else if (boxJerry.x === gameArea.canvas.width) {
    console.log('jerry wall');
    boxJerry.x = 0;
  } else if (boxJerry.y === 0) {
    console.log('jerry wall');
    boxJerry.y = gameArea.canvas.height;
  } else if (boxJerry.y === gameArea.canvas.height) {
    boxJerry.y = 0;
  }
  if (boxTom.crashWith(boxJerry) == "wall") {
    gameArea.stop();
    $('#winner').html('<p>Tom hit the wall!</p>');
  } else if (boxTom.crashWith(boxJerry) === true) {
    gameArea.stop();
    $('#winner').html('<p>Tom caught Jerry!</p>');
  } else {
    gameArea.clear();
    boxTom.newPos();
    boxTom.update();
    boxJerry.newPos();
    boxJerry.update();
  }
}

//Moving boxTom

function moveYup() {
  boxTom.speedY -= 2;
  if (boxTom.speedY < -8) {
    boxTom.speedY = -8;
  }
}

function moveYdown() {
  boxTom.speedY += 2;
  if (boxTom.speedY > 8) {
    boxTom.speedY = 8;
  }
}

function moveYend() {
  boxTom.speedY = 0;
}

function moveXleft() {
  boxTom.speedX -= 2;
  if (boxTom.speedX < -8) {
    boxTom.speedX = -8;
  }
}

function moveXright() {
  boxTom.speedX += 2;
  if (boxTom.speedX > 8) {
    boxTom.speedX = 8;
  }
}

function moveXend() {
  boxTom.speedX = 0;
}

var keypressW = function(w) {
  if (w.which == 87) {
    moveYup();
  }
};

var keypressWx = function(w) {
  if (w.which == 87) {
    moveYend();
  }
};

var keypressS = function(s) {
  if (s.which == 83) {
    moveYdown();
  }
};

var keypressSx = function(s) {
  if (s.which == 83) {
    moveYend();
  }
};

var keypressA = function(a) {
  if (a.which == 65) {
    moveXleft();
  }
};

var keypressAx = function(a) {
  if (a.which == 65) {
    moveXend();
  }
};

var keypressD = function(d) {
  if (d.which == 68) {
    moveXright();
  }
};

var keypressDx = function(d) {
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
  if (boxJerry.speedY < -4) {
    boxJerry.speedY = -4;
  }
}

function moveYdown2() {
  boxJerry.speedY += 1;
  if (boxJerry.speedY > 4) {
    boxJerry.speedY = 4;
  }
}

function moveYend2() {
  boxJerry.speedY = 0;
}

function moveXleft2() {
  boxJerry.speedX -= 1;
  if (boxJerry.speedX < -4) {
    boxJerry.speedX = -4;
  }
}

function moveXright2() {
  boxJerry.speedX += 1;
  if (boxJerry.speedX > 4) {
    boxJerry.speedX = 4;
  }
}

function moveXend2() {
  boxJerry.speedX = 0;
}




var keypressUp = function(up) {
  if (up.which == 38) {
    moveYup2();
  }
};

var keypressUpx = function(up) {
  if (up.which == 38) {
    moveYend2();
  }
};

var keypressDown = function(down) {
  if (down.which == 40) {
    moveYdown2();
  }
};

var keypressDownx = function(down) {
  if (down.which == 40) {
    moveYend2();
  }
};

var keypressLeft = function(left) {
  if (left.which == 37) {
    moveXleft2();
  }
};

var keypressLeftx = function(left) {
  if (left.which == 37) {
    moveXend2();
  }
};

var keypressRight = function(right) {
  if (right.which == 39) {
    moveXright2();
  }
};

var keypressRightx = function(right) {
  if (right.which == 39) {
    moveXend2();
  }
};


var playerTwoKeys = function() {
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
