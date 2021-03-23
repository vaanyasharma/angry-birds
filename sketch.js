var balloon, balloonI, scaler, database, bg, bgI;

function preload() {
    balloonI = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
    bgI = loadImage("HotAirBallon01.png");
}
function setup() {
    createCanvas(1700,720);
    database = firebase.database();
    //bg = createSprite(600,350 , 500, 500);
   // bg.addImage("back", bgI);
    balloon = createSprite(100, 400, 100, 100);
    balloon.addAnimation("image", balloonI);
    //bg.scale = 0.50;
    var BalloonPos = database.ref('Balloon/position');
    BalloonPos.on("value", readPosition, showError);
}

function draw() {
    background(bgI);
    textSize(25);
    fill("blue");
    stroke("red");
    strokeWeight(2)
    text("Use the arrow keys to move the hot air balloon in the sky", 30, 40);
    
    if (keyDown(LEFT_ARROW)) {
        writePosition(-3, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
        writePosition(3, 0);
    }
    else if (keyDown(UP_ARROW)) {
        writePosition(0, -3);
    }
    else if (keyDown(DOWN_ARROW)) {
        writePosition(0, +3);
    }
    scaler = (balloon.y / 450);
    balloon.scale = scaler;
    drawSprites();
}
function writePosition(x, y) {
    database.ref('Balloon/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}
function readPosition(data) {
    position = data.val();
    //console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
}
function showError() {
    console.log("error");
}