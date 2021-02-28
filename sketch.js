var bg,balloon,img,database,balloonPosition;

function preload(){
  img=loadAnimation("1.png","2.png","3.png");
  bg=loadImage("back.png");
}
function setup() {
  createCanvas(800,400);
  database=firebase.database();
  balloon=createSprite(300,290, 50, 50);
  balloon.addAnimation("r",img);
  balloon.scale=0.5;
  balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readposition,showError);
}

function draw() {
  background(bg);  
  if(keyDown("UP_ARROW")){
    updatePosition(0,-10);
    balloon.scale=balloon.scale- 0.01;  

  }
  if(keyDown("DOWN_ARROW")){
    updatePosition(0,+10);
    balloon.scale=balloon.scale+ 0.01;
  }
  if(keyDown("RIGHT_ARROW")){
    updatePosition(+10,0);
  }
  if(keyDown("LEFT_ARROW")){
    updatePosition(-10,0);
  }
  drawSprites();
  textSize(15);
  text("Press the arrow keys to move the balloon",10,20);
}
function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  }
  )
  }
  function readposition(data){
  position=data.val();  //x:200,y:200
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError()
{
    console.log("Error in database");
}
