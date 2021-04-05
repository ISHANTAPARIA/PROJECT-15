var score = 0;
var play=1;
var end = 0;
var load = 2;
var gamestate = load;

var ground,player;
var player_anime,bg_image;
var invisible,startB,startB_image;
var obstacle,obstaclesGroup;	
var ballon1,ballon2,ballon3,ballon4,ball;
var retryB,retryB_image;

function preload(){
  player_anime=loadAnimation("BOY-1.png","BOY-2.png","BOY-3.png","BOY-4.png","BOY-5.png",
  "BOY-6.png","BOY-7.png","BOY-8.png");
  player_fall=loadAnimation("BOY-7.png");
  bg_image=loadImage("background.jpg");
  startB_image=loadImage("play.png");
  ballon1=loadImage("ballon1.png");
  ballon2=loadImage("ballon2.png");
  ballon3=loadImage("ballon3.png");
  ballon4=loadImage("ballon4.png");
  ball=loadImage("Ball.png");
  retryB_image=loadImage("Retry.png");
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	
 
	ground=createSprite(windowWidth/2,550,windowWidth+900,30);
 ground.shapeColor = "DarkSlateGray";

	player=createSprite(200,300,30,100);
  player.addAnimation("running",player_anime);
  player.scale=1.3;
  player.visible = false;


  startB = createSprite(windowWidth/2,300,100,30);
  startB.addImage(startB_image);
  startB.visible = true ; 

  retryB = createSprite(windowWidth/2,300,100,30);
  retryB.addImage(retryB_image);
  retryB.scale = 0.5;
  retryB.visible = false ; 

	invisible=createSprite(windowWidth/2,550,windowWidth+850,10);
  invisible.visible=false;
	
  obstaclesGroup = new Group();
}


function draw() {
  background(bg_image);
 
if (gamestate === load && mousePressedOver(startB)){

gamestate = play ; 
startB.visible = false ; 

}

  if (gamestate === play){
    score = score + Math.round(getFrameRate()/100);
  ground.velocityX=-5;

  if (ground.x < 200) {
	ground.x = windowWidth/2;
    }

  if(touches.length>0 ||keyDown("space")&& player.y>=200){
		player.velocityY=-15;
    touches=[];
		}

  player.velocityY=player.velocityY+0.8;
  player.visible = true;
  startB.visible = false ; 
  player.collide(invisible);
  spawn_obstacle();
  }

  if(player.isTouching(obstaclesGroup)){
    gamestate=end;
  }
  if(gamestate===end){

     ground.velocityX=0;
     player.visible = true;
     player.addAnimation("running",player_fall);
        obstaclesGroup.destroyEach();
        obstaclesGroup.setVelocityXEach(0);
    player.velocityY=10;
    retryB.visible = true ; 

  }
  if(gamestate === end && mousePressedOver(retryB)){
    reset();
    retryB.visible = false ;
    player.addAnimation("running",player_anime);
  }
  drawSprites();
}

function spawn_obstacle(){
  if(frameCount %100 ===0){
  var rand2= Math.round(random(450,500));

  var obstacle=createSprite(windowWidth+50,rand2,10,40);
   obstacle.velocityX=-10; 
   
    var rand = Math.round(random(1,5));
   
   switch(rand) {
   case 1: obstacle.addImage(ballon1); 
       break; 
   case 2: obstacle.addImage(ballon2);
       break;
   case 3: obstacle.addImage(ballon3);
       break;
   case 4: obstacle.addImage(ballon4);
       break;
   case 5: obstacle.addImage(ball);
       break;
     default:  break;
   }  
   
    obstacle.scale=2;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
    
  }
}
function reset(){
  player.visible=true;
  player.y=0;
  gamestate=play;
}
