var database;
var hypnoticBall;
var position;

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  var balloonimage = loadImage("pro-C35+images/pro-C35 images/Hot Air Ballon-01.png")
 // createSprite(400, 200, 50, 50);
  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addImage(balloonimage);
  hypnoticBall.scale = 0.2;
  //hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('hot air balloon/position');
  hypnoticBallPosition.on("value", readPosition, showError)
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('hot air balloon/position').set({
    x : position.x + x ,
    y : position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}