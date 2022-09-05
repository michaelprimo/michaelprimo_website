class mobileControls
{
  constructor()
  {
    this.mouseIsDown = false;
    this.buttonPressed = "";
  }
}

class Player 
{
  constructor(x, y, hitboxWidth, hitboxHeight, drawWidth, drawHeight, grounded, speedX, speedY, maxSpeed, gravity, acceleration, friction, jumpPower, keys, collided, collision_type_id, idleMovement, curFrame, delayFrame, maxDelayFrame)
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
    this.oldAcceleration = acceleration;
    this.friction = friction;
    this.jumpPower = jumpPower;
    this.keys = keys;
    this.collided = collided;
    this.collision_type_id = collision_type_id;
    this.idleMovement = idleMovement;
    this.curFrame = curFrame;
    this.delayFrame = delayFrame;
    this.maxDelayFrame = maxDelayFrame;
    this.isBouncing = true;
    this.oldGravity = gravity;
    this.cameraY = y;
    this.spawnX = 150;
    this.spawnY = 350;
    this.checkpoint_id = 0;
    this.movementFrameCount = 0;
    this.direction = 90;
    this.death = function()
    {
      playerCharacter.direction = 360;
      on_a_roll(); 
      if(die_roll == 2)
      {
        playerCharacter.x = width - playerCharacter.spawnX;
      }
      else
      {
        playerCharacter.x = playerCharacter.spawnX;
        
      }
      playerCharacter.y = playerCharacter.spawnY;
      playerCharacter.collision_type_id = 0;
      playerCharacter.isBouncing = !playerCharacter.isBouncing;
      if(playerCharacter.isBouncing === true)
      {
        playerCharacter.gravity = playerCharacter.oldGravity;
        playerCharacter.acceleration = playerCharacter.oldAcceleration*2;
      }
      else
      {
        playerCharacter.gravity = playerCharacter.oldGravity*3;
        playerCharacter.acceleration = playerCharacter.oldAcceleration/2;
      }
      
      die_mode_level();
      playerCharacter.enemies_movement();
      //console.clear();
     // console.log("Death happened.");
      

    }
    this.isGrounded = function()
    {
      //console.log("42: function called");
      // Player is on air and they aren't touching anything.
      if(playerCharacter.grounded != true)
      {
        //if player is in "gliding" mode...
        if(playerCharacter.isBouncing === false)
        {
          //...move 
          playerCharacter.speedY = playerCharacter.gravity;
        }
        //nothing particular happen if you are in bouncing mode.
      }
      //if you are touching a platform, however...
      else
      {
       //...this happens in "bouncing mode".
       if(playerCharacter.isBouncing === true)
       {
        //set the speed as the jump speed.
        playerCharacter.speedY = -playerCharacter.jumpPower;
       
       }
       //this happens in gliding mode.
       else
       {
        //invert gravity.
        playerCharacter.gravity = -playerCharacter.gravity;
        playerCharacter.speedY = playerCharacter.gravity;
        //console.log("68: speedY when inverting gravity:" + playerCharacter.speedY);
         
       }
       
      }

      

    }
    this.check_playerGravity = function()
    {
      if(die_roll != 5)
      {
        if(playerCharacter.speedY >= playerCharacter.gravity)
        {
          playerCharacter.speedY = playerCharacter.gravity;
          //console.log("82: speedY when reaching the maximum:" + playerCharacter.speedY);
        }
  
        playerCharacter.speedX *= playerCharacter.friction;
        if(playerCharacter.isBouncing === true)
        {
          playerCharacter.speedY += playerCharacter.gravity;
          //console.log("87: speedY when adding gravity on it:" + playerCharacter.speedY);
        }
        playerCharacter.x += playerCharacter.speedX;
        playerCharacter.y += playerCharacter.speedY;
        //console.log("91: speedY moving the character because of the gravity" + playerCharacter.speedY);
      }
      if(die_roll == 5)
      {
        playerCharacter.movementFrameCount++;
      }
      
    }
          
    this.enemies_movement = function()
    {
      
      levelMap.forEach((number, index, array) => {
        
        if((levelMap[index].type_id == 3 && playerCharacter.isBouncing == false) || (levelMap[index].type_id == 4 && playerCharacter.isBouncing == true))
        {
          levelMap[index].solid = false;
          levelMap[index].visible = false; 
         
        }
        if((levelMap[index].type_id == 3 && playerCharacter.isBouncing == true) || (levelMap[index].type_id == 4 && playerCharacter.isBouncing == false))
        {
          levelMap[index].solid = true;
          levelMap[index].visible = true; 
        }
        if((levelMap[index].type_id == 23 && die_roll == 4))
        {
          levelMap[index].solid = false;
          levelMap[index].visible = false;
        }
        if((levelMap[index].type_id == 13 && die_roll == 3))
        {
          let d100_roll = Math.floor(Math.random() * 100) + 1;
          if(d100_roll < 50)
          {
            levelMap[index].solid = false;
            levelMap[index].visible = false;
          }
          
        }
        if((levelMap[index].type_id == 61 && playerCharacter.checkpoint_id != 0) || (levelMap[index].type_id == 62 && playerCharacter.checkpoint_id != 1))
        {
          levelMap[index].solid = false;
          levelMap[index].visible = false;
        }
      });
    }
    
  }
}



// CREATE CHARACTER
function moveCharacter() 
{ 
  if(die_roll == 5)
  {
    playerCharacter.y += 1;
  }
  /*
  else if(playerCharacter.isBouncing == false && die_roll == 5)
  {
    switch(playerCharacter.direction)
    {
      
      case 90:
        playerCharacter.x += TILE_SIZE/8;
        break;
      case 180:
        playerCharacter.y += TILE_SIZE/8;
        break;
      case 270:
        playerCharacter.x -= TILE_SIZE/8;
        break;
      case 360:
        playerCharacter.y -= TILE_SIZE/8;
        break;
     
    }
  }
  */
  if (playerCharacter.keys[39] || (mobileControl.buttonPressed == "left" && mobileControl.mouseIsDown == true)) 
  {
      // right arrow
      if(die_roll != 5)
      {
        if (playerCharacter.speedX < playerCharacter.maxSpeed) 
        {
          playerCharacter.speedX += playerCharacter.acceleration;
        }
      }
      else
      {
        if(die_roll == 5)
        {
          playerCharacter.x += 2;
          playerCharacter.y -= 2;
        }
        /*
        else
        {
          if(playerCharacter.movementFrameCount > TILE_SIZE/2)
          {
            switch(playerCharacter.direction)
            {
              case 90:
              case 180:
              case 270:
                playerCharacter.direction += 90;
                break;
              case 360:
                playerCharacter.direction = 90;
                break;
            }
            playerCharacter.movementFrameCount = 0;
          }
        }
         */ 
      }
  }
  if (playerCharacter.keys[37] || (mobileControl.buttonPressed == "right" && mobileControl.mouseIsDown == true)) 
  {
      // left arrow
      if(die_roll != 5)
      {
      if (playerCharacter.speedX > -playerCharacter.maxSpeed) 
      {
        playerCharacter.speedX -= playerCharacter.acceleration;
      }
      }
      else
      {
        if(die_roll == 5)
        {
          playerCharacter.x -= 2;
          playerCharacter.y -= 2;
        }
        /*
        else
        {
          if(playerCharacter.movementFrameCount > TILE_SIZE/2)
          {
            switch(playerCharacter.direction)
            {
              case 90:
                playerCharacter.direction = 360;
                break;
              case 180:
              case 270:
              case 360:
                playerCharacter.direction -= 90;
                break;
             
               
            }
            playerCharacter.movementFrameCount = 0;
          }
        }
        */
      }
  } 
}


// COLLISION
function check_playerCollision()
{
  playerCharacter.grounded = false;

  for(let i = 0; i<levelMap.length; i++)
  {  
    /*
    console.log("i: " + i);
    console.log("i+60: " + parseInt(60+i));
    */
    levelMap[i].y = camera.y + levelMap[i].oldY;
    let dir = colCheck(playerCharacter, levelMap[i]);

    if(dir != undefined)
    {
      playerCharacter.collision_type_id = levelMap[i].type_id;
    }

    if(playerCharacter.collision_type_id === 2 || (playerCharacter.collision_type_id === 23 && levelMap[i].type_id == 23 && levelMap[i].solid == true))
    {
      //console.log(levelMap[i]);
      playerCharacter.death();
    }

    if((playerCharacter.collision_type_id === 61 && levelMap[i].type_id === 61 && levelMap[i].solid == true) || (playerCharacter.collision_type_id === 62 && levelMap[i].type_id === 62 && levelMap[i].solid == true))
    {
      if(die_roll == 2)
      {
        playerCharacter.spawnX = width-levelMap[i].x;
      }
      else
      {
        playerCharacter.spawnX = levelMap[i].x;
      }
      playerCharacter.spawnY = levelMap[i].y;
      levelMap[i].solid = false;
      levelMap[i].visible = false;
      //playerCharacter.collision_type_id = 0;
      playerCharacter.checkpoint_id++;
      playerCharacter.death();
      
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
        
        if(playerCharacter.isBouncing === true)
        {
          playerCharacter.speedY = 0;
        }
        else
        {
          playerCharacter.grounded = true;
        }
        
      }
      
    }
  }
  }
  
document.body.addEventListener("keydown", function(e) {
  playerCharacter.keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  playerCharacter.keys[e.keyCode] = false;
})


let playerCharacter = new Player(250,250,22,22,TILE_SIZE,TILE_SIZE,false,0,0,5,1,2,0.8,12,[],false,0,[0,1,2,1,0],0,0,10,0,180);
let mobileControl = new mobileControls();

document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchend", end_touchHandler);

function touchHandler(e) 
{
  if (e.touches) 
  {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mobileControl.mouseIsDown = true;
    //alert("x: " + x + " y: " + y + " width/2: " + width/2);
    
      if(x > width/2)
      {
        mobileControl.buttonPressed = "left";
      }
      else
      {
        mobileControl.buttonPressed = "right";
      }
    e.preventDefault();
  }
}

function end_touchHandler(e) 
{
    mobileControl.mouseIsDown = false;
    mobileControl.buttonPressed = "";
}


canvas.onmousedown = function(e)
{
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  mobileControl.mouseIsDown = true;
  //alert("x: " + x + " y: " + y + " width/2: " + width/2);
  
    if(x > width/2)
    {
      mobileControl.buttonPressed = "left";
    }
    else
    {
      mobileControl.buttonPressed = "right";
    }
  
}
canvas.onmouseup = function(e){
    if(mobileControl.mouseIsDown)
    {
      mobileControl.mouseIsDown = false;
      mobileControl.buttonPressed = "";
      mouseClick(e);
    } 
}

