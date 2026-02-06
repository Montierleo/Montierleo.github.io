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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); //wipes the screen
  //     X   Y   diameter
  circle(0, 0, 50);
}
