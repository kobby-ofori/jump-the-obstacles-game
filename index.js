let up = document.getElementById("up");
let down = document.getElementById("down");
let left = document.getElementById("left");
let right = document.getElementById("right");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var playBackAudio = new Audio("/soundEffect/TropicalForestAmbiences.mp3");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

// create gravity
var gravity = 0.5;

// create background img
const background = new Lego({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/desktop-1024x576.jpg",
});

// create player variable
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  // imageSrc: './img/Knight/Idle/idle1.png'
});

// create enemies variable
const enemy1 = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: -3,
    y: 0,
  },
  color: "green",
});
console.log(enemy1);

const enemy2 = new Fighter({
  position: {
    x: 700,
    y: 50,
  },
  velocity: {
    x: -3,
    y: 0,
  },
  color: "green",
});
const enemy3 = new Fighter({
  position: {
    x: 1000,
    y: 300,
  },
  velocity: {
    x: -3,
    y: 0,
  },
  color: "green",
});

console.log(player);

var keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

var lastKey;

// animation
function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy1.update();
  enemy2.update();
  enemy3.update();

  // player movement
  player.velocity.x = 0;
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -3;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 3;
  } else {
    player.velocity.x = 0;
  }

  //stop movement at canvas left & right borders
  if (keys.a.pressed && player.position.x === 0) {
    player.velocity.x = 0;
  } else if (keys.d.pressed && player.position.x >= 974) {
    player.velocity.x = 0;
  }

  //stop movement at canvas top border
  if (keys.w.pressed && player.position.y <= 25) {
    player.velocity.y = 0;
    console.log(player.position.y);
  }

  // // collision detection 1
  // if(player.attackBox.position.x + player.attackBox.width >=
  //   enemy1.position.x && player.attackBox.position.x <= enemy1.position.x + enemy1.width &&
  //   player.attackBox.position.y + player.attackBox.height >= enemy1.position.y
  //   && player.attackBox.position.y <= enemy1.position.y + enemy1.height
  // ) {
  //   console.log('die');
  // }

  // // collision detection 2
  // if(player.attackBox.position.x + player.attackBox.width >=
  //   enemy2.position.x && player.attackBox.position.x <= enemy2.position.x + enemy2.width &&
  //   player.attackBox.position.y + player.attackBox.height >= enemy2.position.y
  //   && player.attackBox.position.y <= enemy2.position.y + enemy2.height
  // ) {
  //   console.log('die');
  // }

  // // collision detection 3
  // if(player.attackBox.position.x + player.attackBox.width >=
  //   enemy3.position.x && player.attackBox.position.x <= enemy3.position.x + enemy3.width &&
  //   player.attackBox.position.y + player.attackBox.height >= enemy3.position.y
  //   && player.attackBox.position.y <= enemy3.position.y + enemy3.height
  // ) {
  //   console.log('die');
  // }
}
animate();

// enemies loop function
function enemy1Loop() {
  if (enemy1.position.x <= 0) {
    enemy1.position.x = 1024;
  }
}
setInterval(enemy1Loop);
//
function enemy2Loop() {
  if (enemy2.position.x <= 0) {
    enemy2.position.x = 1024;
  }
}
setInterval(enemy2Loop);
//
function enemy3Loop() {
  if (enemy3.position.x <= 0) {
    enemy3.position.x = 1024;
  }
}
setInterval(enemy3Loop);

// eventlistener for player control
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      if (player.position.y > 0) {
        // Check if player is not at the top border
        player.velocity.y = -12;
      }
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
  console.log(event.key);
});

// mouse buttons for control
// up
up.onmousedown = function () {
  if (player.position.y <= 150) {
    player.velocity.y = 0;
  } else {
    player.velocity.y = -12;
  }
};
//down
down.onmousedown = function () {};
//left
left.onmousedown = function () {
  if (player.position.x <= 0) {
    player.velocity.x = 0;
  } else {
    player.velocity.x = -5;
  }
};
//right
right.onmousedown = function () {
  if (player.position.x >= 974) {
    player.velocity.x = 0;
  } else {
    player.velocity.x = 5;
  }
};

up.ontouchstart = function () {
  player.velocity.y = -12;
};
down.ontouchstart = function () {};
left.ontouchstart = function () {
  player.velocity.x = -3;
};
right.ontouchstart = function () {
  player.velocity.x = 3;
};

up.onmouseup = function () {
  keys.w.pressed = false;
};
// down.onmouseup = function () {};
// left.onmouseup = function () {};
// right.onmouseup = function () {};

up.ontouchend = function () {
  keys.w.pressed = false;
};
// down.ontouchend = function () {};
// left.ontouchend = function () {};
// right.ontouchend = function () {};

// Health-bar / health function
var lifeSpan = document.getElementById("health");
lifeSpan.style.width = "300px"; // Set initial width to 300px

//The variable below will just make it so the user cannot run the setTimeout method more than once at a time
var isSetTimmeoutRunning = false;
function startCountUp() {
  if (isSetTimmeoutRunning == false) {
    //We set this variable to true when we first run the setTimeout method.
    //It will get set back to false when the setTimeout method has completed
    isSetTimmeoutRunning = true;

    // Audio
    playBackAudio.play();
    playBackAudio.volume = 0.5;

    //Alert the user when 5 seconds have passed
    setTimeout(function () {
      isSetTimmeoutRunning = false;
      //Send alert message to the user
      alert(
        "LEVEL 1 COMPLETE!! " +
          "Your score is " +
          document.getElementById("score").innerHTML
      );
    }, 900000);

    //The initial point of the counter is 0
    var counter = 0;

    document.getElementById("score").innerHTML = 0;

    var interval = setInterval(function () {
      counter++;
      document.getElementById("score").innerHTML = counter;

      // if statement to determine collision so far as statement below is true
      if (
        player.position.x < enemy1.position.x + enemy1.width &&
        player.position.x + player.width > enemy1.position.x &&
        player.position.y < enemy1.position.y + enemy1.height &&
        player.position.y + player.height > enemy1.position.y
      ) {
        //check if code above worked.
        console.log("worked");
        // Decrease width of lifeSpan bar by 100px
        var currentWidth = parseInt(lifeSpan.style.width);
        if (currentWidth > 100) {
          lifeSpan.style.width = currentWidth - 100 + "px";
        } else {
          // If width is already less than 0r equal to 100px, set it to 0px
          lifeSpan.style.width = "0px";
          // Stop count up(score) & alert user
          clearInterval(interval);
          alert(
            "Your score is " +
              document.getElementById("score").innerHTML +
              " game over"
          );
        }
      }
    }, 1000);
  }
}
