(function () {
  let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


if(window.innerWidth > 500)
{
canvas.width = 500;
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
[15,30,15]
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
points: 0,
enemyPoints: 0,
noteCounter: -canvas.width/2,
curNote: 0,
maxNotes: 0,
positiveNotes: 0,
perfect: canvas.width/2,
noteDistance: canvas.width/4,
randomDistance: 2,
bpm: 80,
defaultBpm: 80,
bool_shutdown: false,
playerHealth: 40,
max_playerHealth: 40,
enemyHealth: 40,
max_enemyHealth: 40,
musicBullets: 6,
max_musicBullets: 6,
click: 0,
chain: 0,
enemyCharge: 0,
max_enemyCharge: 6
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
  
  if(leftSphere.type <= 2)
  {
    leftSphere.radius = canvas.width/20;
    leftSphere.width = 32;
    leftSphere.height = 32;
    leftChart.push(leftSphere);
    rightSphere = {...leftSphere};
    rightChart.push(rightSphere);
    rightChart[i].x = canvas.width + Math.abs(game.noteCounter);
    game.noteDistance = Math.floor(Math.random()*canvas.width/4) + canvas.width/7;
    game.noteCounter -= game.noteDistance;
  }
  
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

function drawPlayer2()
{
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/4*2.84, 45, 0, 2 * Math.PI);
ctx.stroke();
playerAnimation.frameCount++;
//if(playerAnimation.hurtBegin == false && playerAnimation.attackBegin == false)
//{
  idleAnimation();
//}
/*
if(playerAnimation.attackBegin == true)
{
  attackAnimation();
  playerAnimation.attackBegin = true;
}
if(playerAnimation.hurtBegin == true)
{
  hurtAnimation();
  
  
}
*/
if(playerAnimation.frameCount > 30)
{
  playerAnimation.frameCount = 0;
}
ctx.drawImage(player, 64*playerAnimation.animation, 0, 64, 64, canvas.width/2-32, canvas.height/4*3-32, 64, 64);
}

function idleAnimation()
{
if(playerAnimation.frameCount > 15)
{
  playerAnimation.animation = 1;
}
if(playerAnimation.frameCount <= 15 || playerAnimation.frameCount > 30)
{
  playerAnimation.animation = 0;
}

}

function attackAnimation()
{
playerAnimation.frameCount++;
playerAnimation.animation = 2;
playerAnimation.frameCount = 0;
if(playerAnimation.frameCount > 15)
{
  playerAnimation.attackBegin = false;
  idleAnimation();
}
enemyAnimation.animation = 3;
enemyAnimation.frameCount = 0;
}

function hurtAnimation()
{
playerAnimation.frameCount++;
playerAnimation.animation = 3;
playerAnimation.frameCount = 0;
if(playerAnimation.frameCount > 15)
{
  playerAnimation.hurtBegin = false;
  idleAnimation();
}
enemyAnimation.animation = 2;
enemyAnimation.frameCount = 0;
}

function chargeAnimation()
{
playerAnimation.animation = 4;
playerAnimation.frameCount = 0;
}

function drawEnemy()
{
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/3.45, 45, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
enemyAnimation.frameCount++;
if(enemyAnimation.frameCount > 15)
{
  enemyAnimation.animation = 1;
}
if(enemyAnimation.frameCount <= 15 || enemyAnimation.frameCount > 30)
{
  enemyAnimation.animation = 0;
}
if(enemyAnimation.frameCount > 30)
{
  enemyAnimation.frameCount = 0;
}
ctx.drawImage(enemy, 64*enemyAnimation.animation, 0, 64, 64, canvas.width/2-32, canvas.height/4-32, 64, 64);
}

function upload()
{
changeBpm();
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#0D1B2A";
ctx.fillRect(0,0,canvas.width,canvas.height/2);
ctx.fillStyle = "#0D1B2A";
ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height);
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

ctx.beginPath();
ctx.lineWidth = 3;
ctx.moveTo(0, canvas.height/2);
ctx.lineTo(canvas.width, canvas.height/2);
ctx.closePath();






ctx.beginPath();

if(leftChart.length > 0)
{
  
    if((leftChart[0].x > game.perfect))
      {
        avoidNote();
      }
  
    //draw notes
    for(let i = 0; i < leftChart.length; i++)
    {
      switch(leftChart[i].type)
      {
        case 0:
          ctx.fillStyle = "blue";
          break;
        case 1:
          ctx.fillStyle = "red";
          break;
        case 2:
          ctx.fillStyle = "blue";
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
  
ctx.closePath();
ctx.stroke();
drawLayout();
ctx.fillStyle = "white";
ctx.font = "50px Palatino Linotype";
ctx.fillText(Math.floor(game.playerHealth), canvas.width/5,canvas.height/5);
ctx.fillText(Math.floor(game.enemyHealth), canvas.width-canvas.width/5,canvas.height/5);
ctx.fillText(Math.floor(game.bpm), canvas.width/4,canvas.height/4);
ctx.fillText(Math.floor(game.chain), canvas.width-canvas.width/4,canvas.height/4);
/*
ctx.fillText(game.playerHealth, canvas.width/3,canvas.height/10);
ctx.fillText(game.enemyHealth, canvas.width/3*2,canvas.height/10);
ctx.fillText(game.chain, canvas.width/4,canvas.height/10*9);
ctx.fillText(game.chargeLevel, canvas.width/2,canvas.height/10*9);
ctx.fillText(game.chargeBar, canvas.width/3*2,canvas.height/10*9);
//ctx.fillText(game.enemyPoints, canvas.width/3,canvas.height/10*9.5);
ctx.fillText("Chain: " + game.randomDistance, canvas.width/5,canvas.height/2-55);
ctx.fillText("BPM: " + game.bpm.toFixed(2), canvas.width/5,canvas.height/9*6-20);
*/
for(let i = 0; i<leftChart.length; i++)
{
  leftChart[i].x += (((canvas.width/2)/60*(game.bpm/60))/leftChart[i].speed);
  rightChart[i].x -= ((canvas.width/2)/60*(game.bpm/60))/rightChart[i].speed;
  //leftChart[i].x += 0;
  //rightChart[i].x -= 0;
}
requestAnimationFrame(upload);
}

function drawLayout()
{
drawPlayer();

}

function checkNote(cursorX, cursorY)
{
game.click++;

if(leftChart[0].x > game.perfect-canvas.width/7)
{
    if(leftChart[0].type == 1 )
    {
      game.playerHealth--;
      game.chain = 0;
    }
    if(leftChart[0].type == 2 || leftChart[0].type == 0)
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
if(leftChart[0].type == 1 )
    {
      game.chain++;
    }
    if(leftChart[0].type == 2 || leftChart[0].type == 0)
    {
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
  leftChart.splice(0,1);
  rightChart.splice(0,1);
}

function changeBpm()
{
  game.bpm = game.defaultBpm + (game.defaultBpm/2/game.maxNotes)*game.chain;
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
checkNote(cursorX, cursorY);
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
