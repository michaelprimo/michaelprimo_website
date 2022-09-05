let musicFrame = 0;


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



  


