(function () {
  let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


if(window.innerWidth > 568)
{
canvas.width = 568;
}
else
{
canvas.width  = window.innerWidth;
}

canvas.height = window.innerHeight;

let audioCtx = new AudioContext();
let oscillator = audioCtx.createOscillator();

let notes = new Image();
let player = new Image();
let enemy = new Image();

notes.src = "Image/notes.png";
player.src = "Image/player.png";
enemy.src = "Image/enemy.png";

ctx.strokeStyle = "white";


requestAnimationFrame(upload);


let dialogueBox = ["Oh, are you approaching me?","Instead of running away, you are coming right through me?"];
let playerTrees = [];
let spherePosition = [];
let leftChart = [];
let rightChart = [];
let curNotes = [];
let levelNotes = [
[30,15,15,15,15,15,15]
];

let curLevelNotes = [];
let centralSphere = 
{
x: canvas.width/2,
y: canvas.height/2,
radius: canvas.width/10,
color: "white",
colorData: -1
}

let game =
{
  level: 0,
  noteCounter: -canvas.width/2,
  maxNotes: 0,
  perfect: canvas.width/2,
  noteDistance: canvas.width/4,
  randomDistance: 2,
  bpm: 200,
  defaultBpm: 200,
  playerHealth: 40,
  max_playerHealth: 40,
  enemyHealth: 30,
  max_enemyHealth: 30,
  curNotes: 0,
  chain: 0,
}

let playerAnimation =
{
frameCount: 0,
animation: 0,
attackBegin: false,
attackEnd: true,
hurtBegin: false,
hurtEnd: true
}

let enemyAnimation =
{
frameCount: 0,
animation: 0
}

function loadSpheres()
{
for(let i = 0; i < curLevelNotes.length; i++)
{
  let leftSphere = {};
  let rightSphere;
  leftSphere.x = game.noteCounter;
  leftSphere.y = canvas.height/2;
  leftSphere.type = curLevelNotes[i];

  leftSphere.speed = 8/game.randomDistance;
  
  if(leftSphere.type == 3 || leftSphere.type == 4)
  {
    leftSphere.radius = canvas.width/50;
  }
  else
  {
    leftSphere.radius = canvas.width/20;
  }
    leftChart.push(leftSphere);
    rightSphere = {...leftSphere};
    rightChart.push(rightSphere);
    rightChart[i].x = canvas.width + Math.abs(game.noteCounter);
    //game.noteDistance = Math.floor(Math.random()*canvas.width/4) + canvas.width/6;
    game.noteDistance = canvas.width/6;
    game.noteCounter -= game.noteDistance;
  
  
}
/*
game.noteCounter = canvas.width;
for(let i = 0; i < rightChart.length; i++)
{
  
  rightChart[i].x += game.noteCounter;
  game.noteCounter += game.bpm*2;
}
*/
}


function setSpheres()
{
for(let i = 1; i < levelNotes[0].length; i++)
{
  for(let j = 0; j < levelNotes[0][i]; j++)
  {
    curLevelNotes.push(i);
  }
}
}

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
}

function setBeatSpheres()
{
for(let i = 0; i < levelNotes[0][0]; i++)
{
  curLevelNotes.splice(i*4,0,0);
}
}

function setMaxNotes()
{
for(let i = 0; i < levelNotes[0].length; i++)
{
  game.maxNotes += levelNotes[0][i];
}
game.positiveNotes += levelNotes[0][0] + levelNotes[0][1]; 
}

setSpheres();
shuffle(curLevelNotes);
setBeatSpheres();
loadSpheres();
setMaxNotes();


function drawPlayer()
{
ctx.beginPath();
ctx.strokeStyle = centralSphere.color;
ctx.arc(centralSphere.x, centralSphere.y, centralSphere.radius, 0, 2 * Math.PI);
ctx.stroke();
}

function drawEnemy()
{
ctx.beginPath();
ctx.arc(0, canvas.height/2, canvas.width/20, 0, 2 * Math.PI);
ctx.arc(canvas.width, canvas.height/2, canvas.width/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
}

function drawBackground()
{
  
  ctx.fillStyle = "#0D1B2A";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
}

function drawBoard()
{
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.closePath();
}

function drawText()
{
  ctx.fillStyle = "blue";
  ctx.beginPath();
          ctx.arc(canvas.width/3, canvas.height/5.8, canvas.height/30, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.font = "50px Palatino Linotype";
  ctx.fillText(Math.floor(game.max_playerHealth-game.playerHealth), canvas.width/5,canvas.height/5);
  ctx.fillText("x " + (game.curNotes) + " /  " + game.maxNotes, canvas.width/2.5,canvas.height/5);
  //ctx.fillText(Math.floor(game.bpm), canvas.width/4,canvas.height/4);
  //ctx.fillText(Math.floor(game.chain), canvas.width-canvas.width/4,canvas.height/4);
}

function drawNotes()
{ 
  if(leftChart.length > 0)
  {
    
      if((leftChart[0].x > game.perfect))
        {
          avoidNote();
        }
    
      //draw notes
      for(let i = 0; i < leftChart.length; i++)
      {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        switch(leftChart[i].type)
        {
          case 0:
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            break;
          case 2:
          case 4:
            ctx.fillStyle = "blue";
            break;
          case 1:
          case 3:
            ctx.fillStyle = "red";
            break;
          case 5:
            ctx.lineWidth = 7;
            ctx.fillStyle = "#0D1B2A";
            ctx.strokeStyle = "red";
            break;
          case 6:
            ctx.lineWidth = 7;
            ctx.fillStyle = "#0D1B2A";
            ctx.strokeStyle = "blue";
            break;
        }
          ctx.beginPath();
          ctx.arc(leftChart[i].x, leftChart[i].y, leftChart[i].radius, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
  
          ctx.beginPath();
          ctx.arc(rightChart[i].x, rightChart[i].y, rightChart[i].radius, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
      }
    }
    
  for(let i = 0; i<leftChart.length; i++)
  {
    leftChart[i].x += (((canvas.width/2)/60*(game.bpm/60))/leftChart[i].speed);
    rightChart[i].x -= ((canvas.width/2)/60*(game.bpm/60))/rightChart[i].speed;
  }
}

function upload()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  switch(game.level)
  {
    case 0:
      drawMenu();
      break;
    case 1:
      changeBpm();
      drawLayout();
      break;
  }
  
  requestAnimationFrame(upload);
}

function drawMenu()
{
  ctx.fillStyle = "#0D1B2A";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "5em Cortana";
  ctx.fillText("Wonder", 0, 100);
  ctx.fillText("Wanderer", 0, 200);
  ctx.fillText("3", 0, 300);
}
function drawLayout()
{
  drawBackground();
  drawPlayer();
  drawEnemy();
  drawBoard();
  drawText();
  drawNotes();
}

function checkNote(cursorX, cursorY)
{

if(leftChart[0].x > game.perfect-canvas.width/7)
{
    if(leftChart[0].type == 1 || leftChart[0].type == 3 || leftChart[0].type == 5)
    {
      game.playerHealth--;
      game.chain = 0;
    }
    if(leftChart[0].type == 2 || leftChart[0].type == 0 || leftChart[0].type == 4 || leftChart[0].type == 6)
    {
      game.enemyHealth--;
      game.chain++;
    }
    clearNote();
}
else
{
  missNote();
}

}

function avoidNote()
{
  if(leftChart[0].type == 1 || leftChart[0].type == 3 || leftChart[0].type == 5)
  {
    game.chain++;
  }
  if(leftChart[0].type == 2 || leftChart[0].type == 0 || leftChart[0].type == 4 || leftChart[0].type == 6)
  {
    game.playerHealth--;
    game.chain = 0;
  }
  clearNote();
}

function missNote()
{
  game.playerHealth--;
  game.chain = 0;
}

function clearNote()
{ 
  game.curNotes++;
  leftChart.splice(0,1);
  rightChart.splice(0,1);
}

function changeBpm()
{
  game.bpm = game.defaultBpm + (game.defaultBpm/2/game.maxNotes)*game.curNotes;
}

function playSound()
{
/*
with(new AudioContext)
    with(G=createGain())
    for(i in D=[Math.floor(Math.random() * 15 + 5)])
    with(createOscillator())
    if(D[i])
    connect(G),
    G.connect(destination),
    start(i*1/((game.bpm*4)/60)),
    frequency.setValueAtTime(440*1.06**(13-D[i]),i*1/((game.bpm*4)/60)),
    gain.setValueAtTime(1,i*1/((game.bpm*4)/60)),
    gain.setTargetAtTime(.0001,i*1/((game.bpm*4)/60)+.23,.005),
    stop(i*1/((game.bpm*4)/60)+.24);
    */
}

document.onmousedown = function(e)
{
let rect = canvas.getBoundingClientRect();
let cursorX = e.clientX - rect.left;
let cursorY = e.clientY - rect.top;
switch(game.level)
{
  case 0:
    game.level++;
  case 1:
    checkNote(cursorX, cursorY);
}
e.preventDefault();
}
/*
document.ontouchstart = function(e)
{
let rect = canvas.getBoundingClientRect();
let cursorX = e.clientX - rect.left;
let cursorY = e.clientY - rect.top;
checkNote(cursorX, cursorY);
e.preventDefault();
}
*/
