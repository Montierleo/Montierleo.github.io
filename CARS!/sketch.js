// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawRd();
}

function drawRd(){
  background(200);
  
  //draw the black road and dash line
  fill(0);
  rect(0,height/3,width,height/3);
  stroke (255);
  strokeWeight(2);
  
  for(let x = 0; x < width;x += 40){
    line(x, height/2, x + 20, height/2);
  }
  
  
}