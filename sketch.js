var gameState = "PLAY";
var you,youImage;
var bullet,bulletImage,bulletSound,bulletGroup;
var bg,bgImage,bgSound;
var enemy,asteroid,enemyImage,asteroidImage,enemyGroup;
var score;
var gameOver,gameOverImage,gameOverSound;

function preload(){
  
  bgImage = loadImage("bg.png");
  youImage = loadImage("you.png");
  enemyImage = loadImage("villian.png");
  asteroidImage = loadImage("asteroid.png");
  bulletImage = loadImage("bullet.png");
  bulletSound = loadSound("bullet.mp3");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  score = 0;
  
  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bgImage);
  bg.velocityY = 2;
  
  you = createSprite(width/2,height/2+200);
  you.addImage(youImage);
  you.scale = 0.2;
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImage);
  
  enemyGroup = createGroup();
  bulletGroup = createGroup();
  enemyBulletGroup = createGroup();
}

function draw() {
  
  background("black");
  
  if(bg.x<0){
    bg.x = bg.height/2;
  }
  
  if(gameState === "PLAY"){
    
    if(touches.length>0 || keyDown("space")){
       var temp_bullet = createBullet();
       temp_bullet.addImage(bulletImage);
       temp_bullet.x =you.x;
       bulletSound.play();
       touches = [];
     }
    you.x = World.mouseX;
    
    var rand = Math.round(random(1,2));
    
    if(frameCount%100 === 0){
        if(rand === 1){
          spawnEnemy();
        
        }
        if(rand === 2){
        spawnAsteroid();
        }
      }
    
    if(bulletGroup.isTouching(enemyGroup)){
           enemyGroup.destroyEach();
           bulletGroup.destroyEach();
           score = score + 1;
           
     }
    
    gameOver.visible = false;
    
    if(enemyGroup.isTouching(you)){
      gameState = "END";
    }
    drawSprites();
    textSize(20);
    stroke("white")
    fill("black");
    text("Score: " + score,width-100,30); 
  }
  
  if(gameState === "END"){
    bg.velocityY = 0;
    bulletGroup.setVelocityYEach(0);
    enemyGroup.setVelocityYEach(0);
    gameOver.visible = true;
    gameOverSound.play();
    gameOverSound = true;
    drawSprite(gameOver);
  }
  

}

function createBullet(){
      bullet = createSprite(width-40,height/2+200,5,10);
      bullet.velocityY = -6;
      bullet.scale = 0.3;
      bulletGroup.add(bullet);
      return bullet;
}

function spawnEnemy(){
  
     enemy = createSprite(width,height/10,10,10);
     enemy.addImage(enemyImage);
     enemy.scale = 0.3;
  
     enemy.x = Math.round(random(width,height));
     enemy.velocityY = 4;
     enemyGroup.add(enemy);
}

function spawnAsteroid(){
  
     asteroid = createSprite(width,height/10,10,10);
     asteroid.addImage(enemyImage);
     asteroid.scale = 0.3;
  
     asteroid.x = Math.round(random(width,height));
     asteroid.velocityY = 4;
     enemyGroup.add(asteroid);
  
  
  
}