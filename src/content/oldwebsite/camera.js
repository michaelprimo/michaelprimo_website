
class Camera
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
  }
}


function checkCamera()
{
  camera.y += 0.3;
  /*
  if(playerCharacter.y < camera.y+height)
  {
    playerCharacter.death();
  }
  */
  /*
  if(playerCharacter.isGliding == true)
  {
    /*
    camera.y = -48;
    camera.y = -(playerCharacter.y)/3 -48;
    */
   /*
    camera.y = -(playerCharacter.y)/2;
  }
  
  else
  {
    camera.y = -(playerCharacter.cameraY)/2;
  }
  */
}

let camera = new Camera();