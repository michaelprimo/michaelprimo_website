h=a.height;
w=a.width;
v = h/99;
x = w/2;
y=k=h/9*4;
s = w/99;
f = s/4;
z=p=d=g=j=u=e=1;
r=[],t=[];
n=Math.random;
q="sine"
l="👾"
  for(i = 0; i<99; i++)
  {
    r[i] = n() * w
    t[i] = n() * h
  }
  
  setInterval(function()
  {
    if(g==1)
    {
    localStorage.e>1?e=localStorage.e:0;
    p>e?localStorage.e=p:0;

    a.width=w;
    c.fillStyle = "#104";
    c.fillRect(0, 0, w, h);
      
    
    for(i = 0; i<99; i++)
    {
      c.font = '1vh serif'
      r[i]+=f
      if(r[i]>=w)r[i]=0
      c.fillText("🌟", r[i], t[i])
    }
    c.font = '6vh serif';
    c.fillText(l, x-v*7, y);
    c.fillStyle = "#fff";
  
    c.fillText(p+"/"+e, x, y);
    

    c.font = '9vh serif';
    c.fillText("🌕", j-v*9, k);
      j += s;
      if(j >= w+v*9 || j <= -v*9)
      {
        p++;
        q="triangle";
        u=1;
        d = Math.floor(n() * 4);
        s<0?s=-s+f:s+=f
        d==0||d==1?k = h/9*6:0
        d==2||d==3?k = h/9*4:0
        d==0||d==2?j = -v*6:0
        if(d==1||d==3)
        {
          j = w+v*4
          s = -s
        }
      }
      if(j - x <= v*7 && j - x >= -v*7 && y==k)
      {
        q="sawtooth"
        u=1
        c.fillText("💥", x-v*9, y)
        g=0
      }
      if(u==1)
      {
        m = new AudioContext
        o = m.createOscillator()
        o.type=q
        o.connect(m.destination)
        o.start()
        o.stop(0.1)
        u=0
      }
    }
  }, 33);
  


a.addEventListener('click', function() {
  if(g==1)
  {
    c.fillText("✨", x-v*8, y);
    z==1?y = h/9*6:y=h/9*4;
    z=-z;
    c.fillText(l, x, y);
    q="sine";u=1;
  }
});