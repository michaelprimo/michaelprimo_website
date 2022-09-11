base_image = new Image();
base_image.src = 'sprite.png';

background_image = new Image();
background_image.src = 'background.png';

// DRAW LEVEL
function drawLevel()
{
  
  ctx.clearRect(0,0, width, height);
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 0.1;
  ctx.drawImage(background_image,16,96);
  ctx.globalAlpha = 1.0;
  /*
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, height/8);
 */
  

  
  /*
  ctx.strokeStyle = 'purple';
  ctx.strokeRect(playerCharacter.x, playerCharacter.y, playerCharacter.hitboxWidth, playerCharacter.hitboxHeight);
  ctx.strokeStyle = 'blue';
  ctx.strokeRect(playerCharacter.x, playerCharacter.y, playerCharacter.drawWidth, playerCharacter.drawHeight);
  */
  for(let i = 0; i<levelMap.length; i++)
  {
    
    if(levelMap[i].type_id >= 1)
    {
      if(levelMap[i].visible == true)
      {
      ctx.drawImage(base_image, (levelMap[i].idleMovement[levelMap[i].curFrame]*SPRITE_SIZE), 0, 16, 16,(levelMap[i].x)-((TILE_SIZE-levelMap[i].hitboxWidth)/2), (levelMap[i].y)-((TILE_SIZE-levelMap[i].hitboxHeight)/2), levelMap[i].drawWidth, levelMap[i].drawHeight);
      }
    }
    /*
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(levelMap[i].x, levelMap[i].y, levelMap[i].hitboxWidth, levelMap[i].hitboxHeight);
    */
    if(levelMap[i].delayFrame >= levelMap[i].maxDelayFrame)
    {
      if(levelMap[i].curFrame > levelMap[i].idleMovement.length-2)
      {
        levelMap[i].curFrame = 0;
      }
      else
      {
        levelMap[i].curFrame++;
      }
      levelMap[i].delayFrame = 0;
    }
    else
    {
      levelMap[i].delayFrame++;
    }
  }

  
  ctx.drawImage(base_image, (playerCharacter.idleMovement[playerCharacter.curFrame]*SPRITE_SIZE)-1, 0, 16, 16, playerCharacter.x-((TILE_SIZE-playerCharacter.hitboxWidth)/2), playerCharacter.y-((TILE_SIZE-playerCharacter.hitboxHeight)/2), playerCharacter.drawWidth, playerCharacter.drawHeight);
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
  
  
  ctx.fillStyle='#F0F0EB';
  ctx.font = "20px Tahoma";
  ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
  if(scene_manager.curLevel == 0 && scene_manager.isLevel == true)
  {
    ctx.fillText("Click and hold to the side of the screen", width/2, 575);
    ctx.fillText("where you want to move your character.", width/2, 605);
  }
  
  //ctx.fillText("Next Level:" + scene_manager.nextLevel, 100, 110);
  //ctx.fillText("Checkpoint ID:" + playerCharacter.checkpoint_last_id, 0, 150);
  
  /*
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, (height/8)*7, width, height/8);
  */
}
