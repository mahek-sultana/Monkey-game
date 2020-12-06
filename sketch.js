var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver="Nice Try";

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var Food;
var ground,groundImage;
var score;
var survivalTime=0;



function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("lightgreen");
  
  //monkey should jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -12;
  }
     //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    //resetting the ground to half it's width.
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }

  //calling the fuctions here
  Food();
  obstacle();
  
  
  if(gameState === PLAY){
    gameOver.visible=false;
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      survivalTime = survivalTime+2;
}
  }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      obstacleGroup.destroyEach();
      
} if(gameState === END){
  
      monkey.destroy();
      ground.destroy();
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      gameOver.visible=true;
      stroke("black");
      textSize(20);
      fill("black");
      text("Gameover: " + gameOver,120,200);
}

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,200,50);

  
//monkey collide with ground
  monkey.collide(ground);
  
  drawSprites();
}


function Food(){
  if(frameCount % 80 === 0){
    var banana=createSprite(300,130,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    
    //assign lifetime to banana
    banana.lifetime=200;
    
    //add each banana to the group
    bananaGroup.add(banana);   
  }
}

function obstacle(){
 if(frameCount % 300===0){
   var obstacle=createSprite(400,330,10,40);
   obstacle.velocityX=-(6 + score/100);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX=-5;
   obstacle.lifetime=150;
   obstacleGroup.add(obstacle);

 }  
}



