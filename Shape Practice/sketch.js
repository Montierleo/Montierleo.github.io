// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let headSize = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  drawcircle();
  drawRectangle();
  drawfeets();
  draweyes();
  drawmouth();
}

function drawcircle(){
  noStroke();
  fill(169, 255, 169);
  circle(250, 200, 100);
}

function drawRectangle(){
  noStroke();
  fill(169, 255, 169);
  rect(200, 200, 100, 60);
}

function drawfeets(){
  noStroke();
  fill(169, 255, 169);
  rect(200, 260, 5, 20);
  rect(295, 260, 5, 20);
}

function draweyes(){
  noStroke();
  fill(188, 20, 169);
  circle(220, 200, 15, 15);
  circle(280, 200, 15, 15);
}

function drawmouth(){
  noStroke();
  fill(188, 20, 169);
  rect(230, 220, 40, 5);
}