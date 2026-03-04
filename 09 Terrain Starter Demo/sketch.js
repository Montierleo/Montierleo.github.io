// 09 Tarrain Starter Demo
// Montier Liu
// Mar 3
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  //noloop(); //can leave
}

function generateTerrain() {
  //using a loop, onstruct a number
  //of side by side rectangles of
  //random height, to be 2D terrain
  for(let x = 0; x < width; x += rectWidth) {
    //generate random () (negative) height
    //eventually replace this with using notice()
    let rectHeight = random(0, height * 0.75);
    
    
    rect(x, height, rectWidth, -rectHeight);
  }
}

function draw() {
  //stabilize my random values once per frame
  //this needs to get adapted for noice() 
  //we swith out of random.

  randomSeed(25);

  background(220);
  generateTerrain();
}
