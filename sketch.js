var ninja, enemy, ground, inground, boss, poison, star, edges;
var ninjaimg, enemyimg, gameState, snakeimg;
var ninjaStand, ninjaStar;
var skeletonGroup, starGroup;
var flag = 1;
var score = 440;
var bosshealth = 5;

function preload(){
  ninjaimg = loadAnimation("Ninja1.png", "Ninja2.png","Ninja3.png","Ninja4.png","Ninja5.png","Ninja6.png");
  ninjaStand = loadAnimation("NinjaStand.png");
  enemyimg = loadImage("Skeleton.png");
  ninjaStar = loadImage("NinjaStar.png");
  snakeimg = loadImage("Snake.png");
  poisonimg = loadImage("Poison.png");


}

function setup() {
  createCanvas(displayWidth,300);
  gameState = 0;
  ninja = createSprite(200, 300, 50, 50);
  ninja.addAnimation("standing",ninjaStand);
  ninja.addAnimation("running",ninjaimg);
  ninja.scale = 0.4;

  skeletonGroup = new Group();
  starGroup = new Group();
  poisonGroup = new Group();

  boss = createSprite(displayWidth-80, 150);
  boss.visible = false;
  boss.addImage("snake", snakeimg);
  boss.scale = 0.2;

 
  ground = createSprite(displayWidth/2, 305, width, 5);

  

}


function draw() {
  background(0);  
  edges = createEdgeSprites();
  if(gameState == 0){
    text("Welcome to Ambush", width/2 - 50, 150);
    text("The rules are simple: Press the right arrow to start and the up arrow to jump. Press space to shoot projectiles to defeat enemies. Kill the snake to win!", displayWidth/4.1, 160)
    if(keyWentDown("right")){
      gameState = 1;
      ninja.changeAnimation("running",ninjaimg);
      
    
      
    }
  }

  ninja.collide(ground);

  if (gameState == 1)
  {
    if(score <= 450){
  createEnemy();
  }
  else{
    if(keyWentDown("space")&&score >= 450){
      createStar2();
  
    }
    skeletonGroup.destroyEach();
    boss.visible = true;
    createPoison();
    stroke("purple");
    text(bosshealth, displayWidth-150, 50);

    if (flag == 1){
    boss.velocityY = -5;
    }
    if(boss.y < 0){boss.velocityY=7; flag = 0;}
    else if(boss.y > 300){boss.velocityY=-7;}
    // if(boss.isTouching(edges[2])||boss.isTouching(edges[3])){
    //   boss.bounceOff();
    // }

  }
  console.log(ninja.y);
  
  if(keyWentDown("up")&&ninja.y >= 200 && gameState != 0){
    ninja.velocityY = -13.5;
  }
  ninja.velocityY = ninja.velocityY + 0.5;

  if(keyWentDown("space") && score <= 450){
    createStar();

  }


  for(var i = 0; i < skeletonGroup.length; i++)
  {
    if(skeletonGroup.get(i).isTouching(starGroup))
    {
      skeletonGroup.get(i).destroy();
      starGroup.get(i).destroy();
      score += 10;
    }
  }
  for(var i = 0; i < poisonGroup.length; i++){
  if(poisonGroup.get(i).isTouching(starGroup))
  {
    poisonGroup.get(i).destroy();
    starGroup.destroyEach();
    score += 10;
  }
}
  if(ninja.isTouching(skeletonGroup) || ninja.isTouching(poisonGroup)){
    gameState = 2;
    ninja.y=300;
    ninja.velocityY=0;
    ninja.changeAnimation("standing",ninjaStand);
    skeletonGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    
  }
  }




  if(starGroup.isTouching(boss)){
    starGroup.destroyEach();
    bosshealth -= 1;
    if(bosshealth == 0){
      ninja.x = width/2;
      ninja.y=300;
      ninja.velocityY=0;
      gameState = 3;
      boss.destroy();
      
    
    }
     
  }

  


  drawSprites();

  if(gameState == 2){
  stroke("red");
  textSize(30);
  text("GAME OVER!", displayWidth/2, 150);
  }
  else if (gameState == 3){
  stroke("green");
  textSize(30);
  text("YOU WIN!", displayWidth/2, 150);
  createStar3();
  }

  stroke("grey");
  text(score, displayWidth-100, 50);

}

function createEnemy() {
   if(frameCount % 35 == 0){
    enemy = createSprite(displayWidth, Math.round(random(60,250)), 50, 50);
    skeletonGroup.add(enemy);
    enemy.addImage("skeleton",enemyimg);
    enemy.scale = 0.5;
    enemy.velocityX = -10;
    enemy.lifetime = (displayWidth/10)+10;
   }
}

function createStar() {
    star = createSprite(200, ninja.y, 10, 10);
    star.addImage("ninjastar", ninjaStar);
    starGroup.add(star);
    star.scale = 0.05;
    star.velocityX = 6;
    star.lifetime = (displayWidth/10)+10;
}

function createStar2() {
  star = createSprite(200, ninja.y, 10, 10);
  star.addImage("ninjastar", ninjaStar);
  starGroup.add(star);
  star.scale = 0.04;
  star.velocityX = 45;
  star.lifetime = (displayWidth/10)+10;
}

function createStar3() {
  star = createSprite(Math.round(random(width/2-400,width/2+400)), 300, 10, 10);
  star.addImage("ninjastar", ninjaStar);
  starGroup.add(star);
  star.scale = 0.04;
  star.velocityY = -5;
  star.lifetime = (displayWidth/10)+10;
}


function createPoison() {
  if(frameCount % 40 == 0){
  poison = createSprite(boss.x, boss.y, 10, 10);
  poison.addImage("poison", poisonimg);
  poisonGroup.add(poison);
  poison.scale = 0.1;
  poison.velocityX = -10;
  poison.lifetime = (displayWidth/10)+10;
  }
}