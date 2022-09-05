let musicFrame = 0;


<<<<<<< HEAD
=======
let playerCharacter = new Player(50,450,22,22,TILE_SIZE,TILE_SIZE,false,0,0,5,1,1,0.8,24,[],false,0,[0,1,2,1,0],0,0,10,0,180);
let curLevel = 0;
let levelMap = [];

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


let level2 = 
[
  1,1,20,20,20,20,20,20,20,20,20,20,20,1,1,
  1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,1,1,0,0,0,1,0,0,1,
  1,0,0,0,1,0,0,0,0,1,1,1,0,0,1,
  1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
  1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
  1,0,0,1,0,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,1,1,1,1,1,0,0,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
  1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,
  1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
  1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,0,0,1,1,1,1,1,1
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
        let hitboxWidth = 28;
        let hitboxHeight = 28;
        levelMap.push(new Platform((row*TILE_SIZE)+((TILE_SIZE-hitboxWidth)/2),((height/8)+column*TILE_SIZE)+((TILE_SIZE-hitboxHeight)/2),
        hitboxWidth,hitboxHeight,TILE_SIZE,TILE_SIZE, true, true, 1));
        
      }
      if(levelManager[curLevel][(column*MAX_MAP_HEIGHT)+row] == 2)
      {
        let hitboxWidth = 30;
        let hitboxHeight = 30;
        levelMap.push(new Platform((row*TILE_SIZE)+((TILE_SIZE-hitboxWidth)/2),((height/8)+column*TILE_SIZE)+((TILE_SIZE-hitboxHeight)/2),
        hitboxWidth,hitboxHeight,TILE_SIZE,TILE_SIZE, false, false));
        
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
>>>>>>> 993b4e5a954842d2247b3572aa2363a72f13b83b
// UPLOAD LOOP
function upload()
{
  
  check_playerCollision();
  checkCamera();
  drawLevel();
  moveCharacter();
  
  playerCharacter.isGrounded();
  playerCharacter.check_playerGravity();
  window.requestAnimationFrame(upload);
}

function levelStart()
{
  playerCharacter.x = playerCharacter.spawnX;
  playerCharacter.y = playerCharacter.spawnY;
  levelMap.length = 0;
  
  createMap();
  playerCharacter.enemies_movement();
}



window.requestAnimationFrame(upload);
levelStart();



  


