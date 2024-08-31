/*
@title: snake_snack
@tags: ['classic']
@addedOn: 2024-08-1
@author: meghnaraj
*/

/*
Use Key "w", "s", "a", "d" to start the Game.

Use Key "w" to change the direction of snake Upwards.
Use Key "s" to change the direction of snake Downwards.
Use Key "a" to change the direction of snake Left.
Use Key "d" to change the direction 
of snake Right.
Use Key "r" to Reset the Game.

Key "r" can only be used after the Message LOST.
*/

const snakeHead = "H";
const snakeBody = "B";
const ground = "G";
const apple = "A";
const wall = "W";

setLegend(
  [ snakeHead, bitmap`
................
....00000000....
...0555777770...
..055777777770..
.05577777777770.
.05777777777770.
.05722272227770.
.07720070027770.
.07720070027770.
.07877777778770.
.07770777077770.
.07777000777770.
..057777777770..
...0555557770...
....00000000....
................`],
  [ snakeBody, bitmap`
................
....00000000....
...0077777700...
..007777777700..
.00777777777700.
.07777777777750.
.07777777777750.
.07777777777750.
.07777777777750.
.07777777777750.
.07777777777750.
.00777777777500.
..007777777500..
...0077755500...
....00000000....
................`],
  [ ground, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ apple, bitmap`
................
.....000000.....
....0033330.....
....03333330....
...0033303330...
...03333333330..
...033333333330.
..0330333333330.
.033333333330330
0333330333333330
0463333333333330
04466333333666F0
0D444666666644D0
0DDD444444444DD0
000DDDDDDDDDDD0.
..000000000000..`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);


setBackground(ground);

let currentLevel = 0;
const gameLevels = [
  map`
WWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWW
W............A..W
W...............W
W...............W
W...............W
W...............W
W.......H.......W
W...............W
W...............W
W...............W
W...............W
W...............W
W...............W
W...............W
WWWWWWWWWWWWWWWWW`,
];

setMap(gameLevels[currentLevel]);

setPushables({
  [ snakeHead ]: [],
});

let resetInterval = null;
let gameInterval = null;

const displayLostMessage = () => {
  addText("You Lose!", { 
      x: 6, 
      y: 8, 
      color: color`3`
  });
}

const displayCongratsMessage = () => {
  addText("You Win!", { 
      x: 6, 
      y: 8, 
      color: color`3`
  });
}

let gameScore = 0;
let snake = [{ x: getFirst(snakeHead).x, y: getFirst(snakeHead).y }];

const displayScore = () => {
  addText(`${gameScore}`, { 
      x: 4, 
      y: 1, 
      color: color`2`
  });
}
displayScore();

const placeApple = () => {
  let isPlaced = false;
  while(!isPlaced){
    getFirst(apple).x = Math.floor(Math.random()*15) + 1;
    getFirst(apple).y = Math.floor(Math.random()*15) + 3;
    isPlaced = true;
    for(let segment of snake){
      if(segment.x === getFirst(apple).x && segment.y === getFirst(apple).y){
        isPlaced = false;
        break;
      }
    }
  } 
}

const eatSound = tune`
82.64462809917356: b5~82.64462809917356,
2561.9834710743803`;
const crashSound = tune`
84.50704225352112: c4-84.50704225352112,
84.50704225352112: d4-84.50704225352112,
84.50704225352112: e4-84.50704225352112,
84.50704225352112: d4-84.50704225352112,
84.50704225352112: c4-84.50704225352112,
2281.6901408450703`;

let isLost = false;

const checkCollision = () => {
  for(let segment of snake){
    if(getFirst(snakeHead).x === segment.x && getFirst(snakeHead).y === segment.y){
      playTune(crashSound);
      isLost = true;
      clearInterval(gameInterval);
      clearInterval(resetInterval);
      displayLostMessage();
      break;
    }
  }
}

const eatApple = () => {
  let headX = getFirst(snakeHead).x;
  let headY = getFirst(snakeHead).y;
  if(headX === getFirst(apple).x && headY === getFirst(apple).y){
    playTune(eatSound);
    gameScore++;
    if(gameScore === 150){
      clearInterval(gameInterval);
      displayCongratsMessage();
    }  
    displayScore();
    snake.unshift({ x: headX, y: headY });
    placeApple();
  }else{
    checkCollision();
    const tail = snake.pop();
    clearTile(tail.x, tail.y);
    snake.unshift({ x: headX, y: headY });
  }
  moveSnakeBody();
}

let direction = "";

const hitWall = () => {
  playTune(crashSound);
  isLost = true;
  clearInterval(gameInterval);
  clearInterval(resetInterval);
  displayLostMessage();
}

const moveSnake = () => {
  if(direction === "a"){
    if(getFirst(snakeHead).x === 1){
      hitWall();
      return;
    }
    getFirst(snakeHead).x -= 1;
    eatApple();
  }
  if(direction === "d"){
    if(getFirst(snakeHead).x === 15){
      hitWall();
      return;
    }
    getFirst(snakeHead).x += 1;
    eatApple();
  }
  if(direction === "w"){
    if(getFirst(snakeHead).y === 3){
      hitWall();
      return;
    }
    getFirst(snakeHead).y -= 1;
    eatApple();
  }
  if(direction === "s"){
    if(getFirst(snakeHead).y === 17){
      hitWall();
      return;
    }
    getFirst(snakeHead).y += 1;
    eatApple();
  }
}

const moveSnakeBody = () => {
  for(let i=0; i<snake.length; i++){
    let segmentX = snake[i].x;
    let segmentY = snake[i].y;
    if(i !== 0){
      addSprite(segmentX, segmentY, snakeBody);
    }
  }
}
const snakeHeadSprite = getAll(snakeHead);

onInput("a", () => {
  if(direction !== "d"){
    direction = "a";
    snakeHeadSprite.rotation = -90; // Rotate left
  }
});

onInput("d", () => {
  if(direction !== "a"){
    direction = "d";
    snakeHeadSprite.rotation = 90; // Rotate right
  }
});

onInput("w", () => {
  if(direction !== "s"){
    direction = "w";
    snakeHeadSprite.rotation = 0;
  }
});

onInput("s", () => {
  if(direction !== "w"){
    direction = "s";
    snakeHeadSprite.rotation = 180;
  }
});

const restartGame = () => {
  direction = "";
  
  snake.forEach(segment => clearTile(segment.x, segment.y)); // Removing Snake Body
  clearTile(getFirst(apple).x, getFirst(apple).y); // Removing Apple
  
  clearText(); // Clearing all Text in playing Area
  gameScore = 0; // Resetting Score
  displayScore(); // Show Score Text in Screen Again
  
  addSprite(8, 10, snakeHead); // Add Snake Head
  snake = [{ x: getFirst(snakeHead).x, y: getFirst(snakeHead).y }];
  addSprite(13, 5, apple); // Add Apple

  resetInterval = setInterval(moveSnake, 120);
}

onInput("l", () => {
  if(isLost){
    restartGame();
    isLost = false;
  }
})

gameInterval = setInterval(moveSnake, 120);
