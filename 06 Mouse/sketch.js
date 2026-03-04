// Mousewhell, Map, Lerp
// Montier Liu
// Feb 26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x1, y1, x2, y2, x3, y3;
let diameter = 50 

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = x2 = x3 = width/2;  y1 = y2 = y3 = height/2;
  noFill();
  strokeWeight(4);
}

function draw() {
  background(220, 220, 220, 40);
  x = lerp(x, mouseX, 0.06)
  y = lerp(y, mouseY, 0.06)
  // line(x, y, mouseX, mouseY)

  let r = map(x, 0, width, 0, 255)
  let g = map(y, 0, height, 0, 255)
  let b = map(x+y, 0, width+height, 0, 255)
  stroke(r,g,b)

  rect(x - 25, y - 25, diameter);

}

function mouseWheel(event) {
  print(event.delta);
  if(event.delta < 0) {
    diameter +- 5;
  }
  else{
    diameter = max(5, diameter - 5)
  }
}