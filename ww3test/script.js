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

ctx.strokeStyle = "white";


let starfield = [[],[],[]];
let dialogueBox = ["Oh, are you approaching me?","Instead of running away, you are coming right through me?"];
let playerTrees = [];
let spherePosition = [];
let leftChart = [];
let rightChart = [];
let curNotes = [];
let levelNotes = [
[12,6,6,6,6,6,6]
];
let data_levelNotes = [12,6,6,6,6,6,6];

let curLevelNotes = [];
let centralSphere =
{
x: canvas.width/2,
y: canvas.height/2,
radius: canvas.width/10,
color: "white",
colorData: -1
};

let game =
{
  level: 0,
  points: 0,
  newColor: "white",
  bool_bpmButton: false,
  noteCounter: -canvas.width/2,
  maxNotes: 0,
  perfect: canvas.width/2,
  noteDistance: canvas.width/4,
  randomDistance: 2,
  effectFrame: 0,
  bool_effectFrame: false,
  bpmPoints: 1333,
  bpm: 144,
  defaultBpm: 144,
  playerHealth: 40,
  max_playerHealth: 40,
  enemyHealth: 30,
  max_enemyHealth: 30,
  curNotes: 0,
  chain: 0
};

let buttonPosition =
[
  {
    x: canvas.width/2-canvas.width/8,
    y: canvas.height/5*3.5-canvas.width/8,
    width: canvas.width/4,
    height: canvas.width/4
  },
  {
    x: canvas.width/2-canvas.width/8,
    y: canvas.height/5*4-canvas.width/8,
    width: canvas.width/4,
    height: canvas.width/4,
    id_curLevel: 0,
    id_nextLevel: 1
  },
  {
    x: canvas.width/2-canvas.width/8,
    y: canvas.height/5*4.5-canvas.width/8,
    width: canvas.width/4,
    height: canvas.width/4,
    id_curLevel: 1,
    id_nextLevel: 0
  },
  {
    x: 0,
    y: canvas.height/4,
    width: canvas.width/10*9+canvas.width/10,
    height: canvas.height/10,
    id_curLevel: 1,
    id_nextLevel: 10
  },
  {
    x: 0,
    y: canvas.height/4+canvas.height/10,
    width: canvas.width/10*9+canvas.width/10,
    height: canvas.height/10,
    id_curLevel: 1,
    id_nextLevel: 20
  },
  {
    x: 0,
    y: canvas.height/4+canvas.height/10*2,
    width: canvas.width/10*9+canvas.width/10,
    height: canvas.height/10,
    id_curLevel: 1,
    id_nextLevel: 30
  },
  {
    x: 0,
    y: canvas.height/4+canvas.height/10*3,
    width: canvas.width/10*9+canvas.width/10,
    height: canvas.height/10,
    id_curLevel: 1,
    id_nextLevel: 40
  },
  {
    x: 0,
    y: canvas.height/4+canvas.height/10*4,
    width: canvas.width/10*9+canvas.width/10,
    height: canvas.height/10,
    id_curLevel: 1,
    id_nextLevel: 50
  },
];


let playerAnimation =
{
frameCount: 0,
animation: 0,
attackBegin: false,
attackEnd: true,
hurtBegin: false,
hurtEnd: true
};

let enemyAnimation =
{
frameCount: 0,
animation: 0
};

load_starfield();

requestAnimationFrame(upload);


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
    game.noteDistance = Math.floor(Math.random()*canvas.width/4) + canvas.width/6;
    //game.noteDistance = canvas.width/6;
    game.noteCounter -= game.noteDistance; 
}

}

function resetChart()
{
  leftChart.length = 0;
  rightChart.length = 0;
  game.noteCounter = -canvas.width/2;
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

resetChart();
  setSpheres();
  shuffle(curLevelNotes);
  setBeatSpheres();
  loadSpheres();
  setMaxNotes();
function setStage()
{
  
}

function drawPlayer()
{
  ctx.lineWidth = 3;
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.strokeStyle = centralSphere.color;
  if(game.level == 30 && game.bool_effectFrame == true)
  {
    ctx.fillStyle = "#3f1208";
  }
  else
  {
    ctx.fillStyle = "#080c3f";
  }
  
  ctx.arc(centralSphere.x, centralSphere.y, centralSphere.radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1;
}

function drawEnemy()
{
ctx.fillStyle = "#3f1208";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.globalAlpha = 0.8;
ctx.arc(canvas.width/20, canvas.height/2, canvas.width/20, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();
ctx.closePath();
ctx.beginPath();
ctx.arc(canvas.width-canvas.width/20, canvas.height/2, canvas.width/20, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();
ctx.closePath();
ctx.globalAlpha = 1;
}

function drawBackground()
{
  let grd;
  if(game.level == 10)
  {
    grd = ctx.createLinearGradient(0,canvas.height/12,canvas.width,canvas.height);
    grd.addColorStop(0,"#22171a");
    grd.addColorStop(0.5,"#6f3700");
    grd.addColorStop(1,"#3a3a27");
  }

  if(game.level == 20)
  {
    grd = ctx.createLinearGradient(canvas.width/50,canvas.height/12,canvas.width,canvas.height);
    grd.addColorStop(0,"#195b5b");
    grd.addColorStop(0.5,"#065b36");
    grd.addColorStop(1,"#004c3e");
  }

  if(game.level == 30)
  {
    grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grd.addColorStop(0,"#06014f");
    grd.addColorStop(0.5, "#352f8e");
    grd.addColorStop(1,"#0e0a47");
  }

  if(game.level == 40)
  {
    grd = ctx.createLinearGradient(canvas.width/10,0,canvas.width/2,canvas.height);
    grd.addColorStop(0,"#b59a17");
    grd.addColorStop(0.5,"#4f4e13");
    grd.addColorStop(1,"#666404");
  }

  if(game.level == 50)
  {
    grd = ctx.createLinearGradient(0,50,canvas.width,canvas.height);
    grd.addColorStop(0,"#b73f17");
    grd.addColorStop(0.5,"#441b0d");
    grd.addColorStop(1,"#8c500c");
  }
  
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
}

function drawBackground_effect()
{
  
  if(game.level == 10)
  {
    ctx.fillStyle = "#6d3504";
    ctx.strokeStyle = "black";
    if(game.bool_effectFrame == true)
    {
        ctx.fillRect(canvas.width/6, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.fillRect(canvas.width/4, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.strokeRect(canvas.width/6, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.strokeRect(canvas.width/4, canvas.height/2.2, canvas.width/10, canvas.height/10);
    }
    else
    {
        ctx.fillRect(canvas.width/6*4.5, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.fillRect(canvas.width/6*4, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.strokeRect(canvas.width/6*4.5, canvas.height/2.2, canvas.width/10, canvas.height/10);
        ctx.strokeRect(canvas.width/6*4, canvas.height/2.2, canvas.width/10, canvas.height/10);
    }
  }
  if(game.level == 20)
  {
    let randPosition;
    if(game.bool_effectFrame == true)
    {
      for(let i = 0; i < leftChart.length; i++)
      {
        randPosition = canvas.height/2-canvas.height/15 + Math.random() * canvas.height/7.5;
        leftChart[i].y = randPosition;
        rightChart[i].y = randPosition;
      }
      game.bool_effectFrame = false;
    }
    
  }
  if(game.level == 30)
  {
    if(game.bool_effectFrame == false)
    {
      if(game.effectFrame <= 8)
      {
        game.effectFrame++;
      }
      
    }
    else
    {
      if(game.effectFrame >= 0)
      {
        game.effectFrame--;
      }
      
    }
    
  }
}

function drawBoard()
{
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width/10,canvas.height/2);
  ctx.lineTo(canvas.width/2-canvas.width/10,canvas.height/2);
  ctx.moveTo(canvas.width/2+canvas.width/10,canvas.height/2);
  ctx.lineTo(canvas.width/10*9,canvas.height/2);
  ctx.closePath();
  ctx.stroke();
}

function drawText()
{
  ctx.lineWidth = 5;
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.textAlign = 'center'; 
  ctx.font = "6vh Lucida Sans Unicode";
  if(document.monetization && document.monetization.state === 'started')
  {
    ctx.fillText(Math.floor(game.points), canvas.width/2,canvas.height/6);
    ctx.beginPath()
    ctx.moveTo(canvas.width/4,canvas.height/10);
    ctx.lineTo(canvas.width/4*3,canvas.height/10);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "blue";
    ctx.beginPath()
    ctx.moveTo(canvas.width/4,canvas.height/10);
    ctx.lineTo(canvas.width/4+(((canvas.width/2)/game.maxNotes)*game.curNotes),canvas.height/10);
    ctx.closePath();
    ctx.stroke();
  }
  
}

function drawNotes()
{ 
  ctx.globalAlpha = 0.8;
  if(leftChart.length > 0)
  {
    
      if((leftChart[0].x > game.perfect))
        {
          avoidNote();
        }
    
      //draw notes
      for(let i = 0; i < leftChart.length; i++)
      {
        let newColor;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        switch(leftChart[i].type)
        {
          case 0:
            if(game.level == 40)
            {
              ctx.fillStyle = game.newColor;
            }
            else
            {
              ctx.fillStyle = "white";
            }
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
    
  for(let i = 0; i<rightChart.length; i++)
  {
    leftChart[i].x += (((canvas.width/2)/60*(game.bpm/60))/leftChart[i].speed);
    rightChart[i].x -= ((canvas.width/2)/60*(game.bpm/60))/rightChart[i].speed;
  }
  ctx.globalAlpha = 1;
}

function getRandomColor()
{
  let letters = '0123456789ABCDEF';
  let color = '#00';
  for (var i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  game.bool_effectFrame = false;
  return color;
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
      drawStage();
      break;
    case 10:
    case 20:
    case 30:
    case 40:
    case 50:    
      drawLayout();
      break;
  }
  
  requestAnimationFrame(upload);
}

function drawMenu()
{
  ctx.fillStyle = "#1d0530";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  move_starfield();
  ctx.fillStyle = "#471e21";
  // left window
  ctx.fillRect(0,0,canvas.width/20,canvas.height);
  //right window
  ctx.fillRect(canvas.width-canvas.width/20,0,canvas.width/20,canvas.height);
  //up window
  ctx.fillRect(canvas.width/20,0,canvas.width,canvas.height/20);
  //down window
  ctx.fillRect(canvas.width/20,canvas.height-canvas.height/20,canvas.width,canvas.height/20);
  // center horizontally window
  ctx.fillRect(canvas.width/20,canvas.height/2-canvas.height/40,canvas.width,canvas.height/20);
  // center vertically window
  ctx.fillRect(canvas.width/2-canvas.width/40,0,canvas.width/20,canvas.height);
  
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "10vh Lucida Sans Unicode";
  ctx.fillText("W", canvas.width/6.2, canvas.height/5);
  ctx.fillText("3", canvas.width-canvas.width/4.2, canvas.height/5);
  ctx.font = "5vh Lucida Sans Unicode";
  ctx.fillText("onder", canvas.width/2.8, canvas.height/8);
  ctx.fillText("anderer", canvas.width/2.8, canvas.height/5);  
  
  drawMenuButtons();
  
  
}

function drawStage()
{
  /*
  // Assuming your canvas element is ctx
ctx.shadowColor = "red" // string
//Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
ctx.shadowOffsetX = 0; // integer
//Horizontal distance of the shadow, in relation to the text.
ctx.shadowOffsetY = 0; // integer
//Vertical distance of the shadow, in relation to the text.
ctx.shadowBlur = 1; // integer
//Blurring effect to the shadow, the larger the value, the greater the blur.
*/

  ctx.fillStyle = "#1d0530";
  ctx.fillRect(0,0,canvas.width,canvas.height);
 
  move_starfield();
  ctx.strokeStyle = "#fff";
  
  // center vertically window
  for(let i = 3; i<8; i++)
  {
    ctx.strokeRect(buttonPosition[i].x,buttonPosition[i].y,buttonPosition[i].width,buttonPosition[i].height);
  }
  
  


  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "8vh Lucida Sans Unicode";
  
  ctx.fillText("S", canvas.width/6, canvas.height/5);
  ctx.font = "4vh Lucida Sans Unicode";
  ctx.fillText("Stage 1", canvas.width/3,canvas.height/3);
  ctx.fillText("Stage 2", canvas.width/3,canvas.height/3+canvas.height/10);
  ctx.fillText("Stage 3", canvas.width/3,canvas.height/3+(canvas.height/10)*2);
  ctx.fillText("Stage 4", canvas.width/3,canvas.height/3+(canvas.height/10)*3);
  ctx.fillText("Stage 5", canvas.width/3,canvas.height/3+(canvas.height/10)*4);
  ctx.fillText("tage", canvas.width/3, canvas.height/8);
  ctx.fillText("elect", canvas.width/3, canvas.height/5);  
  drawMenuButtons();
  
}

function load_starfield()
{
  for(let i = 0; i < 100; i++)
  {
    starfield[0].push(Math.random()*canvas.width);
    starfield[1].push(Math.random()*canvas.height);
    starfield[2].push(Math.random()*2);
  }
}

function move_starfield()
{
  ctx.fillStyle = "white";
  for(let i = 0; i < 100; i++)
  { 
    ctx.font = starfield[2][i] + "em Lucida Sans Unicode";
    starfield[0][i] += starfield[2][i];
    if(starfield[0][i] >= canvas.width)
    {
      starfield[0][i] = 0;
    }
    ctx.fillText("⭐", starfield[0][i], starfield[1][i]);
  }
}

function drawMenuButtons()
{
  ctx.lineWidth = 6;
  ctx.font = "4.2vh Lucida Sans Unicode";
   
  ctx.strokeStyle = "white";
  ctx.beginPath();
  switch(game.level)
  {
    case 0:
      ctx.arc(canvas.width/2, canvas.height/5*4, canvas.width/8, 0, 2 * Math.PI);
      ctx.fillText("WANDER", canvas.width/2.6,canvas.height/5*4.1);
      break;
    case 1:
      ctx.arc(canvas.width/2, canvas.height/5*4.5, canvas.width/8, 0, 2 * Math.PI);
      ctx.fillText("BACK", canvas.width/2.35,canvas.height/5*4.55);
      break;
  }
  ctx.stroke();
  ctx.closePath();
  //ctx.fillRect(buttonPosition[1].x, buttonPosition[1].y, buttonPosition[1].width, buttonPosition[1].height);
}

function clickMenuButtons(cursorX, cursorY)
{
  game.bool_clickedButton = true;
  for(let i = 1; i < buttonPosition.length; i++)
  {
    if(cursorX > buttonPosition[i].x && cursorX < buttonPosition[i].x+buttonPosition[i].width && cursorY > buttonPosition[i].y && cursorY < buttonPosition[i].y+buttonPosition[i].height && game.level == buttonPosition[i].id_curLevel)
    {
        setStage();
        game.level = buttonPosition[i].id_nextLevel;
        cursorX = 0;
        cursorY = 0;
    }
     
  }
}

function draw_bpmButton()
{
  
  ctx.shadowColor = "white" // string
  ctx.fillStyle = "white" // string
  ctx.strokeStyle = "white";
  if(game.bool_bpmButton == true)
  {
    ctx.font = "3em Lucida Sans Unicode";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3;
    ctx.fillText("BPM", canvas.width/2-canvas.width/12,canvas.height/5*3.6)
  }
  else
  {
    ctx.font = "2em Lucida Sans Unicode";
    ctx.shadowBlur = 0;
    ctx.lineWidth = 0.5;
    ctx.strokeText("EMPTY", canvas.width/2-canvas.width/11,canvas.height/5*3.55)
  }
  
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/5*3.5, canvas.width/8, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
  
 
  
}

function click_bpmButton()
{
  if(game.bool_bpmButton == true)
  {
    game.points += game.bpmPoints;
    changeBpm();
    game.bpmPoints = 1333;
    game.bool_bpmButton = false;
  }
}

function drawLayout()
{
  drawBackground();
  drawBoard();
  drawText();
  drawNotes();
  draw_bpmButton();
  drawPlayer();
  drawEnemy();
  drawBackground_effect();
}

function checkNote(cursorX, cursorY)
{
  if(cursorX > buttonPosition[0].x && cursorX < buttonPosition[0].x+buttonPosition[0].width && cursorY > buttonPosition[0].y && cursorY < buttonPosition[0].y+buttonPosition[0].height)
  {
    click_bpmButton();
  }
  else
  {
    if(leftChart[0].x > game.perfect-canvas.width/7)
    {
      if(leftChart[0].type == 1 || leftChart[0].type == 3 || leftChart[0].type == 5)
      {
        if(game.level == 30 && game.bool_effectFrame == true)
        {
          rightNote();
        }
        else
        {
          wrongNote();
        }
      }
      if(leftChart[0].type == 2 || leftChart[0].type == 4 || leftChart[0].type == 6 || leftChart[0].type == 0)
      {
        if(game.level == 30 && game.bool_effectFrame == true && leftChart[0].type != 0)
        {
          wrongNote();
        }
        else
        {
          rightNote();
        }
      }
      clearNote();
    }
    else
    {
      missNote();
    }
  }
  

}

function wrongNote()
{
  game.points -= (1000/(canvas.width/7)*(leftChart[0].x-(game.perfect-canvas.width/7)));
  if(game.points < 0)
  {
    game.points = 0;
  }
}

function rightNote()
{
  game.points += (1000/(canvas.width/7)*(leftChart[0].x-(game.perfect-canvas.width/7)));
  if(leftChart[0].type == 0)
  {
    game.bool_bpmButton = true;
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
  if(game.bool_bpmButton == true)
  {
    game.bpmPoints -= 333;
    if(game.bpmPoints < 0)
    {
      game.bpmPoints = 1;
    }
  }
  if(leftChart[0].type == 0)
  {
    if(game.level == 10 || game.level == 20 || game.level == 30 || game.level == 40 || game.level == 50)
    {
      if(game.level == 40)
      {
        game.newColor = getRandomColor();
      }
      if(game.level == 50)
      {
        changeBpm();
      }
      game.bool_effectFrame = !game.bool_effectFrame;
      if(game.effectFrame > 1)
      {
        game.effectFrame = 0;
      }
    }
  }
  
  game.curNotes++;
  leftChart.splice(0,1);
  rightChart.splice(0,1);
}

function changeBpm()
{
  //game.bpm = game.defaultBpm + (game.defaultBpm/2/game.maxNotes)*game.curNotes;
  game.bpm += (game.defaultBpm/2/game.maxNotes)*4;
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
  case 1:
    clickMenuButtons(cursorX, cursorY);
    break;
  case 10:
  case 20:
  case 30:
  case 40:
  case 50:
    checkNote(cursorX, cursorY);
    break;
}
e.preventDefault();
}

document.onkeydown = function(e)
{
  if(e.keyCode == 32)
  {
    click_bpmButton();
  }
  e.preventDefault();
}

document.ontouchstart = function(e)
{
let rect = canvas.getBoundingClientRect();
let cursorX = e.clientX - rect.left;
let cursorY = e.clientY - rect.top;
switch(game.level)
{
  case 0:
  case 1:
    clickMenuButtons(cursorX, cursorY);
    break;
  case 10:
  case 20:
  case 30:
  case 40:
  case 50:
    checkNote(cursorX, cursorY);
    break;
}
e.preventDefault();
}