// Multiple Keypress Detection
// and --- Drawing Practice ---
// Feb 10, 2026
// MOntier liu
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function checkMulti(){
  // a function to demonstrate how we can check
  // if multiple keyboard button are pressed
  // at once
  
  strokeWeight(mouseX / 10);
  stroke(250,0,0);

  // check for multiple keypresses (3 simult.)
  let a = keyIsDown(65); //a
  let b = keyIsDown(66); //b
  let c = keyIsDown(67); //c

  let str = "a: " + a + " b: " + b + " c: " + c;
  textSize(40)
  text(str, 100, 300)

}

function draw() {
  background(220);
  checkMulti()
}
