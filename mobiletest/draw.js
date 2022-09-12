base_image = new Image();
base_image.src = 'sprite.png';

background_image = new Image();
background_image.src = 'background.png';

let skull_sprite = new SceneSprite(30, 30, 32, 32, 18, [57,58,59,58]);
let star_sprite =  new SceneSprite(330, 30, 32, 32, 15, [48,49,50,49]);

let HUDSprites = [skull_sprite, star_sprite];

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

  for(let i = 0; i < HUDSprites.length; i++)
  {
    ctx.drawImage(base_image, (HUDSprites[i].idleMovement[HUDSprites[i].curFrame]*SPRITE_SIZE), 0, 16, 16, HUDSprites[i].x, HUDSprites[i].y, HUDSprites[i].drawWidth, HUDSprites[i].drawHeight);
    if(HUDSprites[i].delayFrame >= HUDSprites[i].maxDelayFrame)
    {
      if(HUDSprites[i].curFrame > HUDSprites[i].idleMovement.length-2)
      {
        HUDSprites[i].curFrame = 0;
      }
      else
      {
        HUDSprites[i].curFrame++;
      }
      HUDSprites[i].delayFrame = 0;
    }
    else
    {
      HUDSprites[i].delayFrame++;
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
  ctx.lineJoin = "round";
  ctx.beginPath();
    ctx.lineWidth = "1";
          
    // Set the path color
    ctx.strokeStyle = "#7BE098";
      
    ctx.moveTo(90, 550);
    ctx.lineTo(10, 590);
    ctx.lineTo(90, 630);
    ctx.lineTo(90, 550);
    ctx.moveTo(390, 550);
    ctx.lineTo(470, 590);
    ctx.lineTo(390, 630);
    ctx.lineTo(390, 550);
    ctx.stroke();
  if(scene_manager.curLevel == 0 && scene_manager.isLevel == true)
  {
    ctx.fillText("Click/hold the arrows for moving.", width/2, 575);
    ctx.fillText("Get all the stars to progress.", width/2, 605);  
  }

  if(scene_manager.curLevel == 1 && scene_manager.isLevel == true)
  {
    ctx.fillText("If you die, you will be able to fly.", width/2, 575);
    ctx.fillText("If you die again, you will bounce.", width/2, 605);
  }

  if(scene_manager.curLevel == 2 && scene_manager.isLevel == true)
  {
    ctx.fillText("The blue blocks only appears when", width/2, 575);
    ctx.fillText("you fly. Stars are also checkpoints.", width/2, 605);
  }

  if(scene_manager.curLevel == 3 && scene_manager.isLevel == true)
  {
    ctx.fillText("The green blocks only appears when", width/2, 575);
    ctx.fillText("you bounce. Use them well.", width/2, 605);
  }

  if(scene_manager.curLevel == 4 && scene_manager.isLevel == true)
  {
    ctx.fillText("Last level of the game!", width/2, 575);
    ctx.fillText("Show them what you got!", width/2, 605);
  }
  
  //ctx.fillText("Next Level:" + scene_manager.nextLevel, 100, 110);
  //ctx.fillText("Checkpoint ID:" + playerCharacter.checkpoint_last_id, 0, 150);
  
  /*
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, (height/8)*7, width, height/8);
  */
}
