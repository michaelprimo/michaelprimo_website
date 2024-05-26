class Platform 
{
  constructor(x, y, hitboxWidth, hitboxHeight, drawWidth, drawHeight, solid, visible, type_id, mode_id, idleMovement)
  {
    this.x = x;
    this.y = y;
    this.oldY = y;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.drawWidth = drawWidth;
    this.drawHeight = drawHeight;
    this.solid = solid;
    this.visible = visible;
    this.type_id = type_id;
    this.mode_id = mode_id;
    this.checkpoint_id = 0;
    this.idleMovement = idleMovement;
    this.glitchDice = Math.floor(Math.random() * 100 +1);
    this.curFrame = 0;
    this.delayFrame = 20;
    this.maxDelayFrame = 20; 
    this.grabbed = false;
  }
}

