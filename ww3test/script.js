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
[32,64,32,0,0]
];

let curLevelNotes = [];
let centralSphere = 
{
x: canvas.width/2,
y: canvas.height/2,
radius: canvas.width/10,
color: "black",
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
randomDistance: 4,
bpm: 128,
defaultBpm: 128,
bool_shutdown: false,
playerHealth: 40,
max_playerHealth: 40,
enemyHealth: 40,
max_enemyHealth: 40,
musicBullets: 6,
max_musicBullets: 6,
click: 0,
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
  
  if(leftSphere.type <= 4)
  {
    leftSphere.radius = canvas.width/20;
    leftSphere.width = 32;
    leftSphere.height = 32;
    leftChart.push(leftSphere);
    rightSphere = {...leftSphere};
    rightChart.push(rightSphere);
    rightChart[i].x = canvas.width + Math.abs(game.noteCounter);
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
loadTrees();
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
        clearNote();
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
        case 3:
          ctx.fillStyle = "green";
          break;
        case 4:
          ctx.fillStyle = "yellow";
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
//drawEnemy();
//drawButtons();
//drawTimer();
//drawTrees();
//drawBullets();
}

function drawButtons()
{
ctx.strokeStyle = "white";
ctx.strokeRect(0,canvas.height/20*17,canvas.width,canvas.height/6.5);

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/8, canvas.height-canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/2.6, canvas.height-canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/1.6, canvas.height-canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/1.15, canvas.height-canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();

}

function drawTimer()
{
ctx.font = "25px Consolas";
ctx.strokeStyle = "white";
//ctx.strokeRect(0,0,canvas.width,canvas.height/6.5);

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/8, canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
ctx.fillText(game.enemyHealth + " / " + game.max_enemyHealth, 12.5, canvas.height/6);

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/2.6, canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
ctx.fillText(game.musicBullets + " / " + game.max_musicBullets, canvas.width/4, canvas.height/6);

ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/1.6, canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
ctx.fillText(game.enemyCharge + " / " + game.max_enemyCharge, canvas.width/2, canvas.height/6);


ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(canvas.width/1.15, canvas.height/14, canvas.height/20, 0, 2 * Math.PI);
ctx.closePath();
ctx.stroke();
ctx.fillText(game.bpm, canvas.width/3*2, canvas.height/6);
}

function drawBullets()
{
ctx.strokeStyle = "#47B39D";
ctx.fillStyle = "#47B39D";
ctx.strokeRect(0,canvas.height/6.5,80,canvas.height-canvas.height/3.3);

ctx.beginPath();
ctx.ellipse(canvas.width/7.5, canvas.height/4.5, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width/15, canvas.height/3.1, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width/7.5, canvas.height/2.2, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width/15, canvas.height/1.8, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width/7.5, canvas.height/1.48, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width/15, canvas.height/1.3, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.strokeStyle = "#EB6B56";
ctx.fillStyle = "#EB6B56";

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/7.5, canvas.height/4.5, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/15, canvas.height/3.1, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/7.5, canvas.height/2.2, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/15, canvas.height/1.8, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/7.5, canvas.height/1.48, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.ellipse(canvas.width - canvas.width/15, canvas.height/1.3, 32, 16, Math.PI / 2, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

ctx.strokeRect(canvas.width-80,canvas.height/6.5,canvas.width-50,canvas.height-canvas.height/3.3);
}


function loadTrees()
{

for(let i = 0; i < 100; i++)
{
  let playerTree = 
  {
    x: (Math.random() * canvas.width)-16,
    y: canvas.height-canvas.height/2.55,
    radiusX: 16,
    radiusY: 4,
    rotation: Math.PI / 2,
    startAngle: 0,
    endAngle: 2 * Math.PI
  }
let randDirection = Math.floor(Math.random() * 4);
switch(randDirection)
{
  case 1:
    playerTree.x = (Math.random() * canvas.width)-16;
    playerTree.y = canvas.height-canvas.height/5;
    break;
  case 2:
    playerTree.x = (Math.random() * canvas.width)-16;
    playerTree.y = canvas.height-canvas.height/2.55;
    break;
  case 3:
    playerTree.x = (Math.random() * canvas.width - canvas.width/3)-16;
    playerTree.y = canvas.height-canvas.height/3.55;
    break;
  case 4:
    playerTree.x = (Math.random() * canvas.width - canvas.width/3)-16;
    playerTree.y = canvas.height-canvas.height/3;
    break;
}
playerTrees.push(playerTree);
  
}


}

function drawTrees()
{
for(let i = 0; i < playerTrees.length; i++)
{
  ctx.beginPath();
  ctx.ellipse(playerTrees[i].x,playerTrees[i].y,playerTrees[i].radiusX,playerTrees[i].radiusY,playerTrees[i].rotation,playerTrees[i].startAngle,playerTrees[i].endAngle);
  ctx.stroke();
  ctx.fill();
}
}

function checkNote(cursorX, cursorY)
{
game.click++;

if(leftChart[0].x > game.perfect-canvas.width/7)
{
  /*
  if(cursorX < canvas.width/4)
  {
    bulletHit();
  }
  if(cursorX > canvas.width/4 && cursorX < canvas.width/2)
  {
    bulletRecharge();
  }
  if(cursorX > canvas.width/2 && cursorX < canvas.width/4*3)
  {
    bulletShowdown();
  }
  if(cursorX > canvas.width/4*3 && cursorX < canvas.width)
  {
    bulletBpm();
  }
  
    if(leftChart[0].type == 0)
    {
      enemyHit();
      playSound();
    }
    */
    if(leftChart[0].type == 1 )
    {
      game.playerHealth--;
    }
    if(leftChart[0].type == 2 || leftChart[0].type == 0)
    {
      game.enemyHealth--;
    }
    clearNote();
}
else
{
  missNote();
}
//beatTime();




}

function missNote()
{
//playerMiss();
//beatTime();
/*
if(centralSphere.colorData == leftChart[0].type)
{
  centralSphere.color = "black";
  centralSphere.colorData = -1;
}
else
{
  switch(leftChart[0].type)
  {
    case 0:
      centralSphere.color = "white";
      break;
    case 1:
      centralSphere.color = "red";
      break;
    case 2:
      centralSphere.color = "blue";
      break;
    case 3:
      centralSphere.color = "green";
      break;
    case 4:
      centralSphere.color = "yellow";
      break;
  }
  centralSphere.colorData = leftChart[0].type;
}
*/
game.playerHealth--;


}

function clearNote()
{ 
  leftChart.splice(0,1);
  rightChart.splice(0,1);
}

function beatTime()
{
if(game.bpm > game.defaultBpm)
{
  game.bpm--;
}

if(game.bool_shutdown == false)
{
  game.enemyCharge++;
  if(game.enemyCharge >= game.max_enemyCharge)
  {
    game.enemyCharge = 0;
  }
}
else
{
  game.enemyCharge -= 2;
  if(game.enemyCharge < 0)
  {
    game.enemyCharge = 0;
  }
  game.bool_shutdown = false;
}
}

function bulletHit()
{
if(game.musicBullets > 0)
{
  game.musicBullets--;
  game.enemyHealth--;
}
}

function bulletRecharge()
{
if(game.musicBullets < game.max_musicBullets)
{
  game.musicBullets++;
}
}

function bulletShowdown()
{
if(game.musicBullets > 0)
{
  game.musicBullets--;
  game.bool_shutdown = true;
}
}

function bulletBpm()
{
if(game.musicBullets > 0)
{
  game.musicBullets--;
  game.bpm += 10;
}

}
/*
function playerMiss()
{
game.chain = 0;
game.playerHealth -= game.enemyAttack;
}
*/
/*
function enemyHit()
{
game.chain++; 
game.enemyHealth -= game.playerAttack;
}
*/
function changeBpm()
{
game.bpm = (Math.random() * game.defaultBpm/2) + game.defaultBpm;
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

document.onkeydown = function(e)
{
//W
if(e.keyCode == 87)
{
  bulletHit();
}
//A
if(e.keyCode == 65)
{
  bulletRecharge();
}
//S
if(e.keyCode == 83)
{
  bulletShowdown();
}
//D
if(e.keyCode == 68)
{
  bulletBpm();
}
}

document.onmousedown = function(e)
{
let rect = canvas.getBoundingClientRect();
let cursorX = e.clientX - rect.left;
let cursorY = e.clientY - rect.top;
checkNote(cursorX, cursorY);
e.preventDefault();
}

document.ontouchstart = function(e)
{
let rect = canvas.getBoundingClientRect();
let cursorX = e.clientX - rect.left;
let cursorY = e.clientY - rect.top;
checkNote(cursorX, cursorY);
e.preventDefault();
}
