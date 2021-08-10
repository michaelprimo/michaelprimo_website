
// newly spawned objects start at Y=25
var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 1500;

// set how fast the objects will fall
var spawnRateOfDescent = 0.50;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

var img1 = new Image();
img1.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Button_Icon_Red.svg/300px-Button_Icon_Red.svg.png";

var img2 = new Image();
img2.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Button_Icon_Brown.svg/300px-Button_Icon_Brown.svg.png";

var img3 = new Image();
img3.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Button_Icon_Lime.svg/300px-Button_Icon_Lime.svg.png";

// Our images array
var images = [img1, img2, img3];

// start animating
window.onload=function(){
animate();
}



console.log(images)

function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
        // give random image
        image: images[Math.floor(Math.random()*images.length)]
    }
    // add the new object to the objects[] array
    objects.push(object);
}



function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw the line where new objects are spawned
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(canvas.width, spawnLineY);
    ctx.stroke();
    
    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.drawImage(object.image, object.x, object.y, 30, 30);
    }

}