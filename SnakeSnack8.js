
/*
@title: SnakeSnack
@author: Meghna Pichhika
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const body = "b"
const background = "k"
const wall ="w"
const snack ="o"
const myTune = tune`
1000,
500: C5~500,
14500`;

// add mute button

setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
0000222002220000
0000222002220000
0000200DD0020000
000D20044002D000
00D4444444444D00
00D4444444444D00
00D4444444444D00
00D4444444444D00
00D4444444444D00
00D44DD44DD44D00
00D44DD44DD44D00
000D44444444D000
0000DDDDDDDD0000
0000000000000000`],
  [body,bitmap`
0000000000000000
0000000000000000
0000444444440000
0004444444444000
0044444444444400
0444444444444440
044444DDDD444440
0444444444444440
0444DDDDDDDD4440
0444444444444440
044444DDDD444440
0444444444444440
0044444444444400
0004444444444000
0000444444440000
0000000000000000`],
  [background,bitmap`
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
0000000000000000`],
  [wall,bitmap`
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
  [snack, bitmap`
0000000000000000
0000000L40000000
0000000LD0000000
0000000L00000000
0000333333330000
0003333333333000
0033323333333300
0033233333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0003333333333000
0000333333330000
0000000000000000`
]
)

setSolids([ wall ]);
setBackground(background);


let reset =null;
let game = null;

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
w..............w
w..............w
w...........o..w
w..............w
w...p..........w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`
]

let currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
})

const lostGame = () => {
  addText("LOST", { 
      x: 8, 
      y: 8, 
      color: color`3`
  });
}

const congratulation = () => {
  addText("CONGRATS !!", { 
      x: 5, 
      y: 8, 
      color: color`6`
  });
}

let score = 0;
let snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];

 const showScore = () => {
  addText( "SCORE: "+`${score}`, { 
      x: 4, 
      y: 1, 
      color: color`2`
  });
}
showScore();


const placeSnack = () => {
  let found = 1;
  while(found === 1){
    getFirst(snack).x = Math.floor(Math.random()*15) + 1;
    getFirst(snack).y = Math.floor(Math.random()*15) + 3;
    found = 0;
    for(let i=0;i<snake.length;i++){
      if(snake[i].xPos === getFirst(snack).x && snake[i].yPos === getFirst(snack).y){
        found = 1;
        break;
      }
    }
    if(found === 0){
      break;
    }
  } 
}

        

const eatMusic =  tune`
82.64462809917356: B5~82.64462809917356,
2561.9834710743803`;
const interactionTune =  tune`
500: C4-500,
500: D4-500,
500: E4-500,
500: D4-500,
500: C4-500,
13500`;
          
          

let lost =0;
const interaction = () => {
  for(let i=0;i<snake.length;i++){
    if(getFirst(player).x === snake[i].xPos && getFirst(player).y === snake[i].yPos){
      playTune(interactionTune);
      lost = 1;
      clearInterval(game);
      clearInterval(reset);
      lost();
      break;
    }
  }
}
const interactionWithWall = () => {
  playTune(interactionTune);
  lost = 1;
  

const eatSnack = () => {
  let headX = getFirst}

 

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1;
      // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
  
});

onInput("w",() => { 
  getFirst(player).y -= 1;
  
});

onInput("a",() => { 
  getFirst(player).x -= 1;
  
});
  

  
