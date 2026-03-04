// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let cX = 0



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function movingBall(){
  // using draw() loop, we can animate
  cX += 5;
  if(cX > width) cX = 0; //wrap around
  circle(cX, 50, 25);

}

function circleLine(y, size){
  // use this function to draw a line of circles
  // y -> number  height at which to draw the line
  // size -> number  diameter of the circles
  let xStart = width * 0.1; // 10% position from left
  let xEnd = width * 0.9    // 90% position from left

  for(let x = xStart; x < xEnd; x += size){

    circle(x,y,size)
  }
}

function gradientBackground(){
  // create a gradient to use as a background
  let h = 15; //height of each rectangle

  // use a loop (doesn't have to be WHILE)
  // to draw vertical stack of rectangles
  

  let y = 0;
  while (y < height){
    let value = map(y,0,height,0,255)
    fill(value, 255-value, 128-value/0.114);
    rect(0, y, width, h);
    y += h;
  }

}

function draw() {
  background(220);
  gradientBackground();
  movingBall();
  circleLine(height*0.35, 30);
  circleLine(height/2, 50);
  circleLine(height*0.65, 80);
}
