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
setSolids([player,wall])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
w..............w
w..............w
w...p..........w
w..............w
w..............w
w..............w
w........a.....w
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

const placeSnack = () => {
    let found = 1;
  while(found === 1){
      getFirst(snack).x =Math.floor(Math.random() * 14)+1; 
      getFirst(snack).y = Math.floor(Math.random() * 12)+1;
      found =0;
    for(let i =0;i<snake.length;i++)
      if(snake[i].xpos === getFirst(snack).x && snake[i].yPos === getFirst(snack).y) {
        found =1;
        break;
      }
    }
      if(found === 0){
       
  }
}
        
  
 
let score =0;
const showScore = () => {
  addText( "SCORE: " +`${score}`, { 
      x: 4, 
      y: 1, 
      color: color`2`
  });
}
showScore();










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