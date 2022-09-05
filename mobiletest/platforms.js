class Platform 
{
  constructor(x, y, hitboxWidth, hitboxHeight, drawWidth, drawHeight, solid, visible, type_id, checkpoint_id)
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
    this.checkpoint_id = checkpoint_id; 
    
  }
}

