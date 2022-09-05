base_image = new Image();
base_image.src = 'sprite.png';

// DRAW LEVEL
function drawLevel()
{
  
  ctx.clearRect(0,0, width, height);
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  /*
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, height/8);
 */
  
  
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
  
  /*
  ctx.strokeStyle = 'purple';
  ctx.strokeRect(playerCharacter.x, playerCharacter.y, playerCharacter.hitboxWidth, playerCharacter.hitboxHeight);
  */
  for(let i = 0; i<levelMap.length; i++)
  {
    if(levelMap[i].type_id === 1)
    {
      ctx.drawImage(base_image, 3*SPRITE_SIZE, 0, 16, 16,(levelMap[i].x)-((TILE_SIZE-levelMap[i].hitboxWidth)/2), (levelMap[i].y)-((TILE_SIZE-levelMap[i].hitboxHeight)/2), levelMap[i].drawWidth, levelMap[i].drawHeight);
      
     
    }
    if(levelMap[i].type_id > 1)
    {
      if(levelMap[i].visible == true)
      {
        ctx.drawImage(base_image, 0*SPRITE_SIZE, 0, 16, 16,(levelMap[i].x)-((TILE_SIZE-levelMap[i].hitboxWidth)/2), (levelMap[i].y)-((TILE_SIZE-levelMap[i].hitboxHeight)/2), levelMap[i].drawWidth, levelMap[i].drawHeight);

      }
    }
    
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(levelMap[i].x, levelMap[i].y, levelMap[i].hitboxWidth, levelMap[i].hitboxHeight);
    
  }
 
  ctx.fillStyle='red';
  ctx.font = "40px Tahoma";
  ctx.fillText("isDown:" + mobileControl.mouseIsDown, 100, 30);
  //ctx.fillText("spawnX: " + (width-playerCharacter.spawnX) + " spawnY: " + (width-playerCharacter.spawnY), 0, 70);
  ctx.fillText("buttonPressed:" + mobileControl.buttonPressed, 100, 70);
  ctx.fillText("Die roll:" + die_roll, 100, 110);
  //ctx.fillText("isGliding:" + playerCharacter.isGliding, 100, 150);
  
  /*
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, (height/8)*7, width, height/8);
  */
}
