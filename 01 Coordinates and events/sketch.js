// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// In Python, we wrote "run-to-completion"
//    (start at top, end at the bottom)
//
// In p5.js, we write "interactive"
//    Setup() -> runs once, at the start
//    draw() -> runs over and over (after setup)
//                targeting 60 times per second
//
//            screen is updated at bottom

// ----- Global Variable Section -----
// we can DECLARE variables here
// we can INITIALIZE variables with
//    simple data types
//   > don't have access to system variable
let circleX = 200;

function setup() {
  createCanvas(500, 400);
}

function draw() {
  //repeat over and over(automatically) 60fps
  background(0); //wipes the screen
  drawTwoCircles()
  fivecircles()

  //    R    G   B
  fill(67, 108, 133)
  stroke("436C85")
  //     X         Y   diameter
  circle(circleX, 100, 50);
}


function drawTwoCircles(){
  //    R    G   B
  fill(222, 153, 96)
  stroke("DE9960")
  //     X         Y   diameter
  circle(circleX, 100, 50);

  // SECOND CIRCLE
  circle(width/2, height/2, 200)
}

function fivecircles(){
  //    R    G   B
  fill(222, 153, 96)
  stroke("DE9960")
  //     X         Y   diameter
  circle(0, 0, 50);

  // SECOND CIRCLE
  circle(400, 0, 50);
}