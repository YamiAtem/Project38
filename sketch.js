var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, restart;

var jumpSound , checkPointSound, dieSound;

localStorage["HighestScore"] = 0;

function preload() {
  trex_running =   loadAnimation("Images/trex1.png", "Images/trex3.png", "Images/trex4.png");
  trex_collided = loadAnimation("Images/trex_collided.png");
  
  groundImage = loadImage("Images/ground2.png");
  
  cloudImage = loadImage("Images/cloud.png");
  
  obstacle1 = loadImage("Images/obstacle1.png");
  obstacle2 = loadImage("Images/obstacle2.png");
  obstacle3 = loadImage("Images/obstacle3.png");
  obstacle4 = loadImage("Images/obstacle4.png");
  obstacle5 = loadImage("Images/obstacle5.png");
  obstacle6 = loadImage("Images/obstacle6.png");
  
  gameOverImg = loadImage("Images/gameOver.png");
  restartImg = loadImage("Images/restart.png");
  
  jumpSound = loadSound("Sounds/jump.mp3");
  dieSound = loadSound("Sounds/die.mp3");
  checkPointSound = loadSound("Sounds/checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(camera.x, 100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(camera.x, 140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  textSize(20);
  text("Score: "+ score, camera.x + 100,50);
  
  // display highscore
  text("Highscore: " + localStorage["HighestScore"], camera.x - 50, 50);
  
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y > 161) {
      trex.velocityY = -12;
      jumpSound.play();
    }
    
    if (score%100 === 0 && score > 0) {
      checkPointSound.play();
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);

    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  camera.x = trex.x;
  
  drawSprites();
}