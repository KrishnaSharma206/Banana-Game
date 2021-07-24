var player, playerImage;
var ground, obImage, bbGroup;
var g1, g2, g3, g4, go;
var Base;
var gb;
var gss = 1;
var play = 1, end = 0, ppapy = 2;
var lvl = 1;
var oby, endImage;
var bg, gbgr, OBIM, playerGroup, score = 0;
var reload = true, shots = 10;
function preload() {
  OBIM = loadImage("obstacle.png");
  playerImage = loadImage("banana.png");
  bg = loadImage("1c000e4b52385061590d3a4ed12afcdf.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
}
function setup() {
  rectMode(CENTER);
  bbGroup = createGroup();
  gbgr = createGroup();
  playerGroup = createGroup();
  player = createSprite(200, 360, 20, 20);
  player.addImage(playerImage);
  ground = createSprite(200, 380, 400, 20);
  player.scale = 0.1;
  Base = createSprite(400, 160, 20, 400);
  Base.shapeColor = color(255, 0, 0);
  //g2 = createSprite(200, 200, 50, 20);
  //g3 = createSprite(40, 100, 100, 20);
  //g4 = createSprite(300, 100, 100, 20);
  //g3.shapeColor = color(0, 0, 255)
  //go = createSprite(40, 80, 20, 20);
  //oby = createSprite(300, 60, 20, 20);
  //oby.addAnimation("moving", monkey_running);
  //oby.scale = 0.09;
  //bbGroup.add(g1);
  // bbGroup.add(g2);
  // bbGroup.add(g3);
  // bbGroup.add(g4);
  // bbGroup.add(go);
  // bbGroup.add(oby);
  playerGroup.add(player);
  createCanvas(400, 400);
}

function draw() {
  if(gss === 1) {  
  bbGroup.setVisibleEach(true);  
  background(bg); 
  obstacle();  
  gun();  
  if(keyIsDown(75))
  {
    reload = true;
  }  
  text("score: " + score, 300, 20);  
  player.velocityX = 0;
  player.velocityY = 0;  
  Camera.position = (player.x, player.y, 2);
  if(keyIsDown(LEFT_ARROW))
    {
      player.velocityX = -4;
    }
  if(keyIsDown(RIGHT_ARROW))
    {
      player.velocityX = 4;
    }
  if(keyIsDown(UP_ARROW))
    {
      player.velocityY -= 4;
    }
  if(keyIsDown(DOWN_ARROW))
    {
      player.velocityY += 4;
    }
  //if(player.isTouching(go))
  //  {
  //     gss = 2;
  //  }  
  //if(player.isTouching(oby))
  //  {
  //     gss = 0;
  //  }
      //player.velocityY += 0.5;
  //console.log(player.y);
  
  player.collide(ground);
  //player.collide(g1);
  //player.collide(g2);
  //player.collide(g3);
  //player.collide(g4);
  //console.log(player.y + " " + player.x)
  //obstacle();
  }  
  if(gss ===  0)
    {
        bbGroup.setVisibleEach(false); 
        background(220);      
        bbGroup.destroyEach();
        player.visible = false;
        ground.visble = false;
        Base.visible = false;
        textSize = 32;
        text("GAME OVER", 160, 200);
    }
  if(gss === 2)
  {
    bbGroup.setVisibleEach(false);
    bbGroup.destroyEach();
    gbgr.setVisibleEach(false);
    gbgr.destroyEach();
    playerGroup.setVisibleEach(false);
    player.visible = false;
    playerGroup.destroyEach();
    Base.visible = false;
    ground.visible = false;
    background(220);
    textSize = 32;
    text("YOU WIN!!!", 160, 200);
    var h = createSprite(200, 300, 20, 20);
    h.addImage(playerImage);
    h.scale = 0.1;
    //if(mouseIsPressed(h))
    //  {
    //   gss = 1;
    //  }
  }
  if(player.isTouching(bbGroup) || Base.isTouching(bbGroup))
    {
      gss = 0;
    }
  if(bbGroup.isTouching(gbgr))
    {
      score = score + 1;
      bbGroup.destroyEach();
      gbgr.destroyEach();
  if(score === 10)
    {
      gss = 2;
    }
    }
  drawSprites();
}
function obstacle() {
  if(frameCount % 300 === 0)
    {
      var rnd = Math.round(random(1, 2));
      // if(rnd === 1)
        // {
          var r2d2 = random(40, 360);
          var oby = createSprite(0, r2d2, 20, 20);
          oby.addAnimation("moving", monkey_running);
          oby.scale = 0.09;
          oby.velocityX = 4;
          oby.setLifeTime = 80;
          bbGroup.add(oby);
          return(oby);
        //}  
    }
}
function gun() {
  if(keyIsDown(32) && reload === true && shots !== 0) {
    gb = createSprite(player.x, player.y, 20, 20);
    gb.addImage(OBIM);
    gb.scale = 0.09
    gb.velocityX = -4;
    gbgr.add(gb);
    gbgr.setLifeTimeEach = 10;
    reload = false;
    shots = shots - 1; 
  }
}