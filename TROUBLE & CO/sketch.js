var score = 0;
var play=1;
var end = 0;
var load = 2;
var gamestate = load;

var ground,player,ground_image;
var player_anime,bg_image;
var invisible,startB,startB_image;
var obstacle,obstaclesGroup;	
var ballon1,ballon2,ballon3,ballon4,ball;
var retryB,retryB_image,book;
var cloud1,cloud2,beam;
var beam2,beam3,beam4;
var shoes1,shoes2,scoreb,Score;
var title,titleI;

function preload(){
  player_anime=loadAnimation("BOY C-1/BOY-1.png","BOY C-1/BOY-2.png","BOY C-1/BOY-3.png",
  "BOY C-1/BOY-4.png","BOY C-1/BOY-5.png","BOY C-1/BOY-6.png","BOY C-1/BOY-7.png","BOY C-1/BOY-8.png");
  player_fall=loadAnimation("BOY C-1/BOY-7.png");
  bg_image=loadImage("background1.png");
  startB_image=loadImage("play.png");
  ballon1=loadImage("obstacles/ballon1.png");
  ballon2=loadImage("obstacles/ballon2.png");
  ballon3=loadImage("obstacles/ballon3.png");
  ballon4=loadImage("obstacles/ballon4.png");
  ball=loadImage("obstacles/Ball.png");
  retryB_image=loadImage("Retry.png");
  cloud1=loadImage("cloud.png");
  cloud2=loadImage("cloud2.png");
  beam=loadImage("obstacles/Beam.png");
  beam2=loadImage("obstacles/beam2.png");
  beam3=loadImage("obstacles/beam3.png");
  beam4=loadImage("obstacles/beam4.png");
  book=loadImage("obstacles/Book.png");
  ground_image=loadImage("ground.png");
  shoes1=loadImage("obstacles/shoes1.png");
  shoes2=loadImage("obstacles/shoes2.png");
  scoreb=loadImage("score.png");
  titleI=loadImage("TITLE.png");
}

function setup() {
	createCanvas(windowWidth,windowHeight);


 player_anime.frameDelay = 3;


	ground=createSprite(windowWidth/2,550,windowWidth+900,30);
  //ground.addImage(ground_image);
 //ground.scale= 0.3
 

	player=createSprite(200,300,30,100);
  player.addAnimation("running",player_anime);
  player.scale=1.3;
  player.visible = false;

//console.log(windowWidth);

  startB = createSprite(windowWidth/2,300,100,30);
  startB.addImage(startB_image);
  startB.scale = 0.5;
  startB.visible = true ; 

  retryB = createSprite(windowWidth/2,300,100,30);
  retryB.addImage(retryB_image);
  retryB.scale = 0.5;
  retryB.visible = false ; 

  Score = createSprite(60,30,10,20);
  Score.addImage(scoreb);
  Score.scale = 0.3;
  Score.visible = true;

	invisible=createSprite(windowWidth/2,550,windowWidth+850,10);
  invisible.visible=false;
	
  title = createSprite(windowWidth/2,150,10,10);
  title.addImage(titleI);
 title.scale=1;

  obstaclesGroup = new Group();
  cloudGroup = new Group();
}


function draw() {
  background(bg_image);
 
  

  if(gamestate === load){
    spawn_cloud();
  }
if (gamestate === load && mousePressedOver(startB)){

gamestate = play ; 
startB.visible = false ; 
title.visible = false ; 

;
}

  if (gamestate === play){
    score = score + Math.round(getFrameRate()/100);
  ground.velocityX=-5;

  if (ground.x < 200) {
	ground.x = windowWidth/2;
    }
title.visible = false ; 
  if(touches.length>0 ||keyDown("space")&& player.y>=300){
		player.velocityY=-15;
    touches=[];
		}

    player.setCollider("rectangle", 0, 0, 20, 80);


  player.velocityY=player.velocityY+0.8;
  player.visible = true;
  startB.visible = false ; 
  player.collide(invisible);
  spawn_obstacle();
  spawn_cloud();
  }

  if(player.isTouching(obstaclesGroup)){
    //gamestate=end;
  }
  if(gamestate===end){

     ground.velocityX=0;
     player.visible = true;
     player.addAnimation("running",player_fall);
        obstaclesGroup.destroyEach();
        obstaclesGroup.setVelocityXEach(0);
      
    player.velocityY=10;
    retryB.visible = true ; 
   
    spawn_cloud();

  }
  if(gamestate === end && mousePressedOver(retryB)){
    reset();
    retryB.visible = false ;
    player.addAnimation("running",player_anime);
  }
  drawSprites();
}

function spawn_obstacle(){
  if(frameCount %160 ===0){
  var rand2= Math.round(random(420,525));

  var obstacle=createSprite(windowWidth+50,rand2,10,40);
   obstacle.velocityX=-15; 
   
    var rand = Math.round(random(1,9));
    //console.log(rand);
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
   case 6: obstacle.addImage(beam);
       break;  
   case 7: obstacle.addImage(beam2);
       break;
   case 8: obstacle.addImage(beam3);
       break;    
   case 9: obstacle.addImage(beam4);
       break;  
  ///case 10: obstacle.addImage(shoes1);
       break;
   //case 11: obstacle.addImage(shoes2);
       break;                  
     default:  break;
   }  
   
    obstacle.scale=2;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("rectangle", 0, 0, 10 , 15);
  

    obstacle.depth=player.depth;
  player.depth=player.depth+1;
    

  }
}
function reset(){
  player.visible=true;
  player.y=0;
  gamestate=play;
}

function spawn_cloud(){
  if(frameCount %200 === 0){
    var rand3 = Math.round(random(100,150));
    var rand4 = Math.round(random(0.5,1.5));
  var cloud=createSprite(windowWidth+150,rand3,10,40);
  cloud.velocityX=-2; 
   
    var rand = Math.round(random(1,2));
   
   switch(rand) {
   case 1: cloud.addImage(cloud1); 
       break; 
   case 2: cloud.addImage(cloud2);
       break;
     default:  break;
   }  
   cloud.scale=rand4;
   cloud.lifetime=1000;
   cloudGroup.add(cloud);
    
   cloud.depth=player.depth;
  player.depth=player.depth+1;
    
  }
}