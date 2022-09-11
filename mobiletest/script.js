let musicFrame = 0;


// UPLOAD LOOP
function upload()
{
  if(scene_manager.isLevel == true)
  {
    if(scene_manager.waitFrames <= 60)
    {
      scene_manager.waitFrames++;
    }
    else
    {
      scene_manager.stop_waitFrames = true;
    }
    check_playerCollision();
    if(scene_manager.curLevel == 5)
    {
      checkCamera();
    }
    
    drawLevel();
    if(scene_manager.stop_waitFrames == true)
    {
      moveCharacter();
      playerCharacter.isGrounded();
      playerCharacter.check_playerGravity();
    }
   
    
    
  }
  else
  {
    if(scene_manager.curScene == 0)
    {
      ctx.clearRect(0,0, width, height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "yellow";
      ctx.fillText("Bye roll", 30, 110);
    }
    if(scene_manager.curScene == 1)
    {
      scene_manager.waitFrames++;
      if(scene_manager.waitFrames < 90)
      {
        ctx.clearRect(0,0, width, height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "yellow";
        ctx.font = "25px Tahoma";
        ctx.fillText("Awaken, fellow one.", width/2, 110);
        ctx.fillText("You are reborn in a " + die_roll_message + " world.", width/2, 170);
        ctx.fillText(die_roll_description, width/2, 230);
      }
      else
      {
        scene_manager.waitFrames = 0;
        scene_manager.isLevel = true;
      }
      
    }
    
  }

  window.requestAnimationFrame(upload);
}

function levelStart()
{
  levelMap.length = 0;
  createMap();
 
  playerCharacter.x =  levelManager[scene_manager.curLevel].player_spawnX;
  playerCharacter.y =  levelManager[scene_manager.curLevel].player_spawnY;
  
  playerCharacter.enemies_movement();
}



window.requestAnimationFrame(upload);
levelStart();



  


