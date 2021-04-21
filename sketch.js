var balloon,balloonImage1,balloonImage2;
var database,readPosition
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  var balloonPosition=database.ref('Balloon/Height')
balloonPosition.on("value" ,readPosition, showError)
  
balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    balloon.x=balloon.x-2
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    balloon.x=balloon.x+2
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-10)
    balloon.scale=balloon.scale-0.02
    //write code to move air balloon in up direction
    balloon.y=balloon.y-2

  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+10)
    balloon.scale=balloon.scale+0.02
    //write code to move air balloon in down direction
      balloon.y= balloon.y+2
    
  }
  readHeight();

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
database.ref('Balloon/Height').set({
'x': Height.x + x ,
'y': Height.y + y
})
}

function readHeight(data){
  Height = data.val();
  balloon.x=Height.x;
  balloon.y=Height.y;
}

function showError(){
  console.log("Error in writing to database")
}
