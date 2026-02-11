// Project Title
// Montier Liu
// Feb 9, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let textShade = 255;
let textScale = 60;
let bgcolor = "grey"

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function displaymouse(){
  // this function will report some 
  // system variables related to mouse
  // onto the screen via text()

  // mouseX, mouseY -> store current mouse pos
  // mouseIsPressed -> boolean: button pressed?
  //    good for mouseHELD events...
  if(mouseIsPressed){
    textScale = int(random(10,100));
  }

  textSize(textScale);
  fill(textShade);
  text(mouseX + ", "+ mouseY + ", " + mouseIsPressed, mouseX, mouseY);
} 

function mousePressed(){
  // this is a p5 function
  // automatically called exactly ONCE
  // per click event.

  textShade = int(random(0, 255));
}

function displayKeyboard(){
  // we'll use this function to inspect
  // some of p5's keyboard capbilities
  //
  // keyIsPressed -> is a keyboard button press?
  // key          -> last pressed key (non-coded)
  // keyCode      -> last pressed coded key

  if(keyIsPressed){
    if(key === " "){
      bgcolor = color(random(255), random(255), random(255))
    }
  }

  textSize(30);
  textAlign(CENTER, CENTER);
  let t = keyIsPressed + ", " + key + ", " + keycode;
  text(t, width/2, height/2)
}

function keyPressed(){

}

function draw() {
  // goal: keep draw() tidy!
  background(bgcolor); 
  // displayMouse();
  displaymouse();
}
