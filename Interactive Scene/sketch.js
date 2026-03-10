// Tree's Tour
// Montier Liu
// Date:
//
let currentBg = (0);
let treeX = 200
let treeY = 300;
let treeSize = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.cursor = 'none';
}



function draw() {
  drawBackground();
  drawwater();
  drawtree();

  fill(0);
  textSize(16);
  text("Montier", windowWidth - 70, windowHeight - 10);
}

function drawBackground() {
  if(currentBg == 0) {
    background(135, 206, 235);
  }

  else if(currentBg == 1) {
    background(20, 20, 60);
  }

  else if(currentBg == 2) {
    background(100, 200, 200);
  }

  else if(currentBg == 3) {
    background(200, 200, 200);
  }
}

function keyPressed(){

  if(key === 'r'){
    treeSize = 1;
  }

  if(key === 'c'){
    currentBg += 1;

    if(currentBg > 3){
      currentBg = 0;
    }
  }
  
  if(key === 'a'){
    treeX -= 20;
  }

  if(key === 'd'){
    treeX += 20;
  }

  if(key === 'w'){
    treeY -= 20;
  }

  if(key === 's'){
    treeY += 20;
  }

}

function mousePressed() {
  if (mouseButton === CENTER) {
    currentBg += 1;

    if (currentBg > 3) {
      currentBg = 0;
    }
  }

  if (mouseButton === LEFT) {
    treeSize += 0.1;
  }
}

function drawtree(){

  push();
  translate(treeX, treeY);
  scale(treeSize);

  noStroke();
  fill("White");
  triangle(-30,113, 50,113, 10,250);

  rect(-40,113,100,25);

  fill(83,50,26);
  ellipse(10,113,100,10);

  fill(30,200,0);
  rect(-50,-50,100,100);
  rect(-70,5,50,50);
  rect(20,-10,50,50);

  fill(54,30,16);
  rect(0,50,20,60);

  pop();
} 

function drawwater() {
  noStroke();
  fill(62, 157, 255);
  rect (0, windowHeight - 200, windowWidth, 200);
}


// -------------------------


let currentBg = (0);
let treeX = 200
let treeY = 300;
let treeSize = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.cursor = 'none';
}



function draw() {
  drawBackground();
  drawwater();
  drawtree();

  fill(0);
  textSize(16);
  text("Montier", windowWidth - 70, windowHeight - 10);
}

function drawBackground() {
  if(currentBg == 0) {
    background(135, 206, 235);
  }

  else if(currentBg == 1) {
    background(20, 20, 60);
  }

  else if(currentBg == 2) {
    background(100, 200, 200);
  }

  else if(currentBg == 3) {
    background(200, 200, 200);
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    treeX = treeX - 10;
  }
}

function mousePressed() {
  if (mouseButton === CENTER) {
    currentBg += 1;

    if (currentBg > 3) {
      currentBg = 0;
    }
  }

  if (mouseButton === LEFT) {
    
  }
}

function drawtree(){
  push();
  translate(mouseX, mouseY);
  scale()

  noStroke();
  fill("White");
  triangle(mouseX-30, mouseY+113, mouseX+50, mouseY+113, mouseX+10, mouseY+250)
  
  fill(215, 215, 215)
  rect(mouseX-40, mouseY+113, 100, 25)

  fill(83, 50, 26);
  ellipse(mouseX+10, mouseY+113, 100, 10);
  
  fill(30, 200, 0);
  rect(mouseX-50, mouseY-50, 100, 100);
  rect(mouseX-70, mouseY+5, 50, 50);
  rect(mouseX+20, mouseY-10, 50, 50);

  fill(54, 30, 16);
  rect(mouseX+0, mouseY+50, 20, 60);
  
  
}

function drawwater() {
  noStroke();
  fill(62, 157, 255);
  rect (0, windowHeight - 200, windowWidth, 200);
}
