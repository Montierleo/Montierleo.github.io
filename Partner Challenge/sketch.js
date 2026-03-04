// Partner Challenge
// A
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "east"
let x = 0; 
let y = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function movingCube(){
  rect(x,y,30,30)
  if (state === "east" && x < windowWidth-30) {
    x +=10
  }
  else{
    state = "south"
  }
  if (state === "south" && windowHeight > y + 30) {
   y +=10
  }
  if (y + 30 > windowHeight) {
    state = "west"
  }
  if (state === "west" && x > 0) {
    x -=10
   }
  if(x === 0){
    state = "north"
  }
  if (state === "north" && y > 0) {
    y -= 10
  }
  
}

function draw() {
  background(220);
  movingCube()
}