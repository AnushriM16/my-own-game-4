var canvas,backgroundImage
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var playerCount;


var canvas;
var score;
var trucks;
var invground;
var col;
var obstacles;
var finishline;
var database;
var track;




var obstaclesgroup

function preload(){
  canvas = loadImage("canvas1.jpg");
  score = 0;
  obstaclesgroup = createGroup();


  track  = loadImage("track.png");
  truck1 = loadImage("truck1.png");
  truck2 = loadImage("truck2.png");
  obstaclesgroup = loadImage("obstacle.png");

track = createSprite(4000,395,800,30);
track.velocityX = -4;
track.x = track.width/2;

var truck1 = createSprite(236,134,20,20);
var truck2 = createSprite(252,84,20,20);
}

function setup(){
  canvas = createCanvas(400,400);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  invground = createSprite(width/2,390,width,10);
}
function draw(){
  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === PLAY){
    //move the ground
    backgroundImage = createSprite(400,300,20,20);
    backgroundImage.velocityX = -5;
    if(backgroundImage.x<0){
      backgroundImage.x = backgroundImage.width/2;
    }
    //score
    score = score + Math.round((getFrameRate()/30));
    //spawn obstacles
    obstacles();
  }
  if(keyDown("space") || keyDown(UP_ARROW)&&truck1.y,truck2.y>=330){
    truck1.velocityY = -15;
    truck2.velocityY = -15;
  }
  if(truck1.isTouching(obstaclesgroup)){
    gameState = END;
  }
  if(truck2.isTouching(obstaclesgroup)){
    gameState = END;
  }
  if(truck1.isTouching(finishline)){
    gameState = END;
  }
  if(truck2.isTouching(finishline)){
    gameState = END;
  }

  if(gameState === END){
    truck1.velocityY = 0;
    truck2.velocityY = 0;
    ground.velocityX = 0;
    truck1.visible = false;
    truck2.visible = false;
    obstaclesgroup.setVelocityXEach(0);
  }
  drawSprites();
  

}

function spawnobstacles(){
  if(World.frameCount%87===0){
    var obstacles = createSprite(400,345,20,20);
    obstacles.scale = 0.119;
    obstacles.velocityX = -5;
    obstacles.lifetime = 134;
    obstaclesgroup.add(obstacles);
    
  }
}

