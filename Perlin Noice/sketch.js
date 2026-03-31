// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 10;
let noiseOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  generateTerrain();
  noiseOffset += 0.01;
}

function drawFlag(x,y){
  strokeWeight(1.2);
  stroke(0);
  line(x, y, x, y-40);

  fill("pink");
  triangle(x, y-40, x+20, y-30, x, y-20);

}

function generateTerrain(){

  background(220);

  let highestHeight = 0;   
  let highestX = 0;        
  let xOffset = noiseOffset;
  let totalHeight = 0;
  let count = 0;
  
  for(let x = 0; x < width; x += rectWidth) {
    
    let h = noise(xOffset) * 400;
    stroke(0);
    fill(100,200,20)
    rect(x, height, rectWidth, -h);
    totalHeight += h;
    count += 1;
    
    if(h > highestHeight){
      highestHeight = h;
      highestX = x;
      
    }
    xOffset += 0.03;
  }
  let avgHeight = totalHeight / count;

  
  drawFlag(highestX + rectWidth/2, height - highestHeight);
  
  
  fill(0);
  noStroke();
  textSize(16);
  text("Average: " + int(avgHeight), 20, 30);
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    rectWidth = constrain(rectWidth - 2, 2, 50);
  }
  
  if(keyCode === RIGHT_ARROW) {
    rectWidth = constrain(rectWidth + 2, 2, 50);
  }
}
