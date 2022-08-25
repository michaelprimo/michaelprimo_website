const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
const MAX_MAP_HEIGHT = 10;
const MAX_MAP_WIDTH = 10;
const TILE_SIZE = 48;
const SPRITE_SIZE = 16;
const cycleLoop = [0,1,2];

console.log("Window Width: " + window.innerWidth);
console.log("Window Height:" + window.innerHeight);
function resizeCanvas()
{
  window.devicePixelRatio=8;
  let sizeX = 480;
  let sizeY = 640;
  let ratioX = window.innerWidth/sizeX;
  let ratioY = window.innerHeight/sizeY;
  let ratio = Math.min(ratioX, ratioY);

  if(window.innerWidth < sizeX)
  {
    canvas.style.width = window.innerWidth + "px";
  }
  else
  {
    canvas.style.width = sizeX*ratio + "px";
  }

  if(window.innerHeight < sizeY)
  {
    canvas.style.height = window.innerHeight + "px";
  }
  else
  {
    canvas.style.height = sizeY*ratio + "px";
  }
  
  let scale = window.devicePixelRatio; 
  
  canvas.width = Math.floor(sizeX * scale);
  canvas.height = Math.floor(sizeY * scale);
  
  ctx.scale(scale, scale);
  
}

resizeCanvas();
class Player 
{
  constructor(x, y, hitboxWidth, hitboxHeight, drawWidth, drawHeight, grounded, speedX, speedY, maxSpeed, gravity, acceleration, friction, jumpPower, keys, collided, collision_ID, idleMovement, curFrame, delayFrame, maxDelayFrame)
  {
    this.x = x;
    this.y = y;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.drawWidth = drawWidth;
    this.drawHeight = drawHeight;
    this.grounded = grounded;
    this.speedX = speedX;
    this.speedY = speedY;
    this.maxSpeed = maxSpeed;
    this.gravity = gravity;
    this.acceleration = acceleration;
    this.friction = friction;
    this.jumpPower = jumpPower;
    this.keys = keys;
    this.collided = collided;
    this.collision_ID = collision_ID;
    this.idleMovement = idleMovement;
    this.curFrame = curFrame;
    this.delayFrame = delayFrame;
    this.maxDelayFrame = maxDelayFrame;
  }
}

class Platform 
{
  constructor(x, y, hitboxWidth, hitboxHeight, drawWidth, drawHeight, solid, visible, id)
  {
    this.x = x;
    this.y = y;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.drawWidth = drawWidth;
    this.drawHeight = drawHeight;
    this.solid = solid;
    this.visible = visible;
    this.id = id;
  }
}

let playerCharacter = new Player(50,450,34,34,TILE_SIZE,TILE_SIZE,false,0,0,5,0.9,1,0.8,14,[],false,0,[0,1,2,1,0],0,0,10);

let curLevel = 0;
let levelMap = [];

let musicFrame = 0;
function music()
{
  a([[0,12],[1,12],[2,12],[2,10]],500,.139,.58,.725,.2,.1,'triangle');
  a([[0,7],[1,6],[2,6]],400,.19,.18,.005,.2,.1,'');
}

/*
let level1 = 
[
  1,1,21,21,21,21,21,21,21,21,21,21,21,1,1,
  1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,
  1,0,0,0,0,1,0,0,0,1,1,1,0,0,1,
  1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,1,1,1,1,1,0,0,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
  1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,
  1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
  1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
*/

let level1 = 
[
  1,1,21,21,21,21,21,21,1,1,
  1,0,1,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,1,
  1,1,0,0,1,1,0,0,0,1,
  1,0,1,0,0,0,0,0,1,1,
  1,0,0,1,0,0,0,0,0,1,
  1,0,1,0,1,0,0,0,0,1,
  1,0,0,1,0,1,0,0,0,1,
  1,0,0,0,0,0,0,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
];

let level2 = 
[
  1,1,20,20,20,20,20,20,1,1,
  1,0,1,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,1,
  1,1,0,0,1,0,0,0,0,1,
  1,0,1,0,0,0,0,0,1,1,
  1,0,0,1,0,0,0,0,0,1,
  1,0,0,0,1,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,1,
  1,0,0,0,0,0,0,1,1,1,
  1,1,1,1,1,1,1,1,1,1,
];

let levelManager = 
[
  level1,level2
];
// MAP EDITOR
function createMap()
{
  for(let column = 0; column < MAX_MAP_HEIGHT; column++)
  {
    for(let row = 0; row < MAX_MAP_WIDTH; row++)
    {
      if(levelManager[curLevel][(column*MAX_MAP_HEIGHT)+row] == 1)
      {
        let hitboxWidth = 45;
        let hitboxHeight = 45;
        levelMap.push(new Platform((row*TILE_SIZE)+((TILE_SIZE-hitboxWidth)/2),((height/8)+column*TILE_SIZE)+((TILE_SIZE-hitboxHeight)/2),
        hitboxWidth,hitboxHeight,TILE_SIZE,TILE_SIZE, true, true, 1));
        
      }
      if(levelManager[curLevel][(column*MAX_MAP_HEIGHT)+row] == 20)
      {
        let hitboxWidth = 30;
        let hitboxHeight = 30;
        levelMap.push(new Platform((row*TILE_SIZE)+((TILE_SIZE-hitboxWidth)/2),((height/8)+column*TILE_SIZE)+((TILE_SIZE-hitboxHeight)/2),
        hitboxWidth,hitboxHeight,TILE_SIZE,TILE_SIZE, false, false, 20));
        
      }
      if(levelManager[curLevel][(column*MAX_MAP_HEIGHT)+row] == 21)
      {
        let hitboxWidth = 30;
        let hitboxHeight = 30;
        levelMap.push(new Platform((row*TILE_SIZE)+((TILE_SIZE-hitboxWidth)/2),((height/8)+column*TILE_SIZE)+((TILE_SIZE-hitboxHeight)/2),
        hitboxWidth,hitboxHeight,TILE_SIZE,TILE_SIZE, false, false, 21));
        
      }
    }
  }
}
createMap();
// CREATE CHARACTER
function moveCharacter() 
{ 
  if (playerCharacter.keys[39]) {
      // right arrow
      if (playerCharacter.speedX < playerCharacter.maxSpeed) {
          playerCharacter.speedX += playerCharacter.acceleration;
      }
  }
  if (playerCharacter.keys[37]) {
      // left arrow
      if (playerCharacter.speedX > -playerCharacter.maxSpeed) {
        playerCharacter.speedX -= playerCharacter.acceleration;
      }
  }   
}
// UPLOAD LOOP
function upload()
{
  /*
  musicFrame++;
  if(musicFrame >= 180)
  {
    music();
    musicFrame = 0;
  }
  */
  check_playerCollision();
  drawLevel();
  moveCharacter();
  check_playerGravity();
  window.requestAnimationFrame(upload);
}
// GRAVITY
function check_playerGravity()
{
  playerCharacter.speedX *= playerCharacter.friction;
  playerCharacter.speedY += playerCharacter.gravity;

  playerCharacter.x += playerCharacter.speedX;
  playerCharacter.y += playerCharacter.speedY;
}
// DRAW LEVEL
function drawLevel()
{
  
  ctx.clearRect(0,0, width, height);
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  base_image = new Image();
  base_image.src = 'Character_Game.png';
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, height/8);
  ctx.fillStyle = 'green';
 
  
  
  //ctx.drawImage(base_image, 0, 0, 0, 0, playerCharacter.x-((TILE_SIZE-playerCharacter.hitboxWidth)/2), playerCharacter.y-((TILE_SIZE-playerCharacter.hitboxHeight)/2), playerCharacter.drawWidth, playerCharacter.drawHeight)
  ctx.drawImage(base_image, playerCharacter.idleMovement[playerCharacter.curFrame]*SPRITE_SIZE, 0, 16, 16, playerCharacter.x-((TILE_SIZE-playerCharacter.hitboxWidth)/2), playerCharacter.y-((TILE_SIZE-playerCharacter.hitboxHeight)/2), playerCharacter.drawWidth, playerCharacter.drawHeight);
  if(playerCharacter.delayFrame >= playerCharacter.maxDelayFrame)
  {
    if(playerCharacter.curFrame > playerCharacter.idleMovement.length-2)
    {
      playerCharacter.curFrame = 0;
    }
    else
    {
      playerCharacter.curFrame++;
    }
    playerCharacter.delayFrame = 0;
  }
  else
  {
    playerCharacter.delayFrame++;
  }
  
  /*
  ctx.strokeStyle = 'purple';
  ctx.strokeRect(playerCharacter.x, playerCharacter.y, playerCharacter.hitboxWidth, playerCharacter.hitboxHeight);
  */
  for(let i = 0; i<levelMap.length; i++)
  {
    if(levelMap[i].visible == true)
    {
      base_image = new Image();
      base_image.src = 'Wall.png';
      /*ctx.fillStyle = 'red';
      ctx.fillRect((levelMap[i].x)-((TILE_SIZE-levelMap[i].hitboxWidth)/2), (levelMap[i].y)-((TILE_SIZE-levelMap[i].hitboxHeight)/2), levelMap[i].drawWidth, levelMap[i].drawHeight);
      */
      ctx.drawImage(base_image,(levelMap[i].x)-((TILE_SIZE-levelMap[i].hitboxWidth)/2), (levelMap[i].y)-((TILE_SIZE-levelMap[i].hitboxHeight)/2), levelMap[i].drawWidth, levelMap[i].drawHeight);
      
      /*ctx.strokeStyle = "yellow";
      ctx.strokeRect(levelMap[i].x, levelMap[i].y, levelMap[i].hitboxWidth, levelMap[i].hitboxHeight);*/
    }
  }
  
  ctx.fillStyle='red';
  ctx.font = "40px Tahoma";
  ctx.fillText("Level:" + curLevel, 100, 30);
  ctx.fillText("Collision ID:" + playerCharacter.collision_ID, 100, 70);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, (height/8)*7, width, height/8);
}

window.requestAnimationFrame(upload);
// COLLISION
function check_playerCollision()
{
  playerCharacter.grounded = false;

  for(let i = 0; i<levelMap.length; i++)
  {  
    let dir = colCheck(playerCharacter, levelMap[i]);

    if(dir != undefined)
    {
      playerCharacter.collision_ID = levelMap[i].id;
    }

    for(let i = 0; i<10; i++)
    {
     if(playerCharacter.collision_ID == i+20)
     {
      curLevel = i;
      playerCharacter.x = 50;
      playerCharacter.y = 450;
      playerCharacter.speedX = 0;
      playerCharacter.speedY = 0;
      playerCharacter.collision_ID = 0;
      levelMap.length = 0;
      createMap();
     } 
    }

    if (dir === "l" || dir === "r") 
    {
      if(levelMap[i].solid == true)
      {
        playerCharacter.speedX = -playerCharacter.speedX;
      }
     
    } 
    else if (dir === "b") 
    {
      if(levelMap[i].solid == true)
      {
        playerCharacter.grounded = true;
      }
      
     
    } 
    else if (dir === "t") 
    {
      if(levelMap[i].solid == true)
      {
        playerCharacter.speedY = 0;
      }
      
    }
  }

  
  if(playerCharacter.grounded != true)
  {
    playerCharacter.speedY += playerCharacter.gravity;
    if(playerCharacter.speedY >= playerCharacter.gravity)
    {
      playerCharacter.speedY = playerCharacter.gravity;
    }
    playerCharacter.y += playerCharacter.speedY;
  }
  else
  {
    playerCharacter.speedY = -playerCharacter.jumpPower;
    playerCharacter.y += playerCharacter.speedY;

  }
}
// CHECK COLLISION SIDE
function colCheck(shapeA, shapeB) {
  // get the vectors to check against
  var vX = (shapeA.x + (shapeA.hitboxWidth / 2)) - (shapeB.x + (shapeB.hitboxWidth / 2)),
      vY = (shapeA.y + (shapeA.hitboxHeight / 2)) - (shapeB.y + (shapeB.hitboxHeight / 2)), // add the half widths and half heights of the objects 
      hWidths = (shapeA.hitboxWidth / 2) + (shapeB.hitboxWidth / 2),
      hHeights = (shapeA.hitboxHeight / 2) + (shapeB.hitboxHeight / 2), 
      colDir = null;

      // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision 
if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // figures out on which side we are colliding (top, bottom, left, or right) 
  var oX = hWidths - Math.abs(vX), 
      oY = hHeights - Math.abs(vY); 
  if (oX >= oY) 
  { 
    if (vY > 0) 
    { 
      colDir = "t";
      if(shapeB.solid == true)
      {
        shapeA.y += oY;
      }
       
      
    } 
    else 
    {
      colDir = "b";
      if(shapeB.solid == true)
      {
        shapeA.y -= oY;
        playerCharacter.grounded = true;
      }
      
    } 
  } 
  else {
    if (vX > 0) 
    {
      colDir = "l";
      if(shapeB.solid == true)
      {
        shapeA.x += oX;
      }
      
    } 
    else 
    {
      colDir = "r";
      if(shapeB.solid == true)
      {
        shapeA.x -= oX; 
      }
      
    }
  } 
} return colDir; 
}



document.body.addEventListener("keydown", function(e) {
  playerCharacter.keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  playerCharacter.keys[e.keyCode] = false;
});

a=(notes,center,duration,decaystart,decayduration,interval,volume,waveform,i)=>{
  with(A=new AudioContext)
    with(G=createGain())
      for(i of notes){
        with(O=createOscillator()){
          connect(G),
          G.connect(destination),
          start(i[0]*interval),
          frequency.setValueAtTime(center*1.06**(13-i[1]),i[0]*interval),
          type=waveform,
          gain.setValueAtTime(volume,i[0]*interval),
          gain.setTargetAtTime(1e-5,i[0]*interval+decaystart,decayduration),
          stop(i[0]*interval+duration);
          
        }
     }
}

  


