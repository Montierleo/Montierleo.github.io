// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let currentBg = ("Orange");



function setup() {
  createCanvas(windowWidth, windowHeight);
}

document.body.style.cursor = 'none';

function draw() {
  background(currentBg);
  drawwater();
  drawtree();
}

function drawtree(){
  noStroke()
  rect(mouseX-50, mouseY-50, 100, 100)
  rect(mouseX-70, mouseY+5, 50, 50)
  rect(mouseX+20, mouseY-10, 50, 50)
  fill(54, 30, 16)
  rect(mouseX+0, mouseY+50, 20, 60)
  fill(62, 157, 255)
}

function drawwater() {
  
  noStroke();
  rect (0, windowHeight - 200, windowWidth, 200);
  fill (186, 199, 156);
}