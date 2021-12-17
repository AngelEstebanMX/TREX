
var trex ,trex_running;
var ground;
var invicible_ground
var cloud
var obstacleImg1
var obstacleImg2
var obstacleImg3
var obstacleImg4
var obstacleImg5
var obstacleImg6
var cloudsGroup
var captusGroup
var teroImg
var teroGroup
var gameOver
var gameOverImg
var restart
var restartImg
var trex_collided
var checkPointSound, dieSound, JumpSound
var score=0
var gameState="play"
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImg=loadImage("ground2.png")
  cloundImg=loadImage("cloud.png")
  obstacleImg1=loadImage("obstacle1.png")
  obstacleImg2=loadImage("obstacle2.png")
  obstacleImg3=loadImage("obstacle3.png")
  obstacleImg4=loadImage("obstacle4.png")
  obstacleImg5=loadImage("obstacle5.png")
  obstacleImg6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  trex_collided=loadAnimation("trex_collided.png")
  teroImg=loadAnimation("tero1.png","tero2.png")
  checkPointSound=loadSound("checkPoint.mp3")
  JumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")

 }

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex=createSprite(50,windowHeight-30,20,40)
 trex.addAnimation("running",trex_running)
 trex.addAnimation("collided",trex_collided)
 trex.scale=0.5
 ground=createSprite(windowWidth/2,windowHeight-30,windowWidth,20)
 ground.addImage(groundImg)
 invicible_ground=createSprite(200,windowHeight-20,400,10)
 invicible_ground.visible=false
 captusGroup = new Group();
 cloudsGroup = new Group();
 teroGroup = new Group();
 trex.debug=true
 gameOver=createSprite(windowWidth/2,windowHeight/2,10,10)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.7
    gameOver.visible=false
    restart=createSprite(windowWidth/2,windowHeight/2+40,10,10)
    restart.addImage(restartImg)
    restart.scale=0.5
    restart.visible=false
 }

function draw(){
  background("white")
  text("Puntuacion="+score,windowWidth-200,windowHeight/2)
  if(gameState==="play"){
    score+=1
    if((keyDown("space")||touches.length>0) && trex.y>windowHeight-50){
      trex.velocityY=-10
      JumpSound.play();
      touches=[];
    }
    ground.velocityX=-(4+3*score/100);
  if(ground.x<0){
      ground.x= ground.width/2
    }
     trex.velocityY=trex.velocityY+0.5;
     trex.collide(invicible_ground)
     if(trex.isTouching(captusGroup)){
      gameState="end"
      dieSound.play();
     }
     spawnCaptus();
     spawnClouds();
     spawnTero();
     if(score%100 === 0 && score>0){
      checkPointSound.play();
    }
    
  }
 if(gameState==="end"){
   ground.velocityX=0
   trex.velocityY=0
   restart.visible=true
   gameOver.visible=true
   captusGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   trex.changeAnimation("collided")
   captusGroup.setLifetimeEach(-1)
   cloudsGroup.setLifetimeEach(-1)
 }
 if(mousePressedOver(restart)||touches.length>0){
   reset();
   touches=[];
 }
  drawSprites()
 }
 function reset(){
 trex.changeAnimation("running")
 score=0
 gameState="play"
 captusGroup.setLifetimeEach(0)
 cloudsGroup.setLifetimeEach(0)
 trex.y=172
 gameOver.visible=false
 restart.visible=false
 } 
 function spawnClouds(){
  if(frameCount%60===0){
 var nube=createSprite(windowWidth,80,40,20)
 nube.addImage(cloundImg)
 nube.y=Math.round(random(50,windowHeight-50))
 nube.velocityX=-(4+3*score/100);
 nube.scale=0.5
 trex.depth=nube.depth
 trex.depth=trex.depth+1
 nube.lifetime=160
 cloudsGroup.add(nube)
 }
 }
 function spawnCaptus(){
  if(frameCount%60===0){
  var captus=createSprite(windowWidth+100,windowHeight-40,20,40)
  captus.velocityX=-(4+3*score/100);
  captus.lifetime=160
  captus.scale=0.6
  var num=Math.round(random(1,6))
  switch(num){
  case 1:captus.addImage(obstacleImg1);break;
  case 2:captus.addImage(obstacleImg2);break;
  case 3:captus.addImage(obstacleImg3);break;
  case 4:captus.addImage(obstacleImg4);break;
  case 5:captus.addImage(obstacleImg5);break;
  case 6:captus.addImage(obstacleImg6);break;
  }
  captusGroup.add(captus)
  captus.lifetime=160
  captus.scale=0.6
  }
 }
function spawnTero(){
  if(frameCount%100===0){
var tero=createSprite(windowWidth+70,windowHeight-40,40,20)
tero.addAnimation("vuelo",teroImg)
tero.y=Math.round(random(50,windowHeight-50))
tero.velocityX=-(4+3*score/100);
tero.lifetime=160
teroGroup.add(tero)
}
}