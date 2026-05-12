// External Libraries
// Montier Liu
// May 8
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gui, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  b = createButton("myButton",50,50);
}

function draw() {
  background(220);
  drawGui();
  if(b.isPressed){
    print(b.label + " is pressed.");
  }
}
