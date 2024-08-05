/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: SNakeSnack
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const body ="b";
const background = "k";
const snack = "a";
const wall = "w";
const myTune = tune`
1500,
500: C5~500,
14000`;

setSolids([ wall ])



setLegend(
  [ player, bitmap`
................
....HH7938HH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHH22HH22HHHH.
.HHHH20HH02HHHH.
.HHHH20HH02HHHH.
.HH88HHHHHH88HH.
.HHHHHHHHHHHHHH.
.HHHHH0HHHHHHHH.
.HHHHH0000HHHHH.
.HHHHHHHHHHHHHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....
................` ],
  [ body, bitmap`
................
....88888888....
...8888888888...
..888888888888..
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
..888888888888..
...8888888888...
....88888888....
................`],
  [ background, bitmap`
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
  [ snack, bitmap`
.......0........
.......04D......
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333223223333..
..333232323333..
..333233323333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................`],
  [ wall, bitmap`
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
LLLLLLLLLLLLLLLL`]
);

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
w...........a..w
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

setMap(levels[level])

setPushables({
  [ player ]: []
})

const lost = () => {
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
  

  
afterInput(() => {});