// 11 Nested loop and Popping Bubbles
// Montier Liu
// Mar 6, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bubbleSize = 30
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  populateArrays();
}

function draw() {
  background(220);
}

function drawBubble() {
  //through through our array and display
  //a bubble at each pos.
  //possinl
}

function populateArrays() {
  //simple nested loop test to make
  //ordered pairs:
  for(let x = 0; x <= width; x += bubbleSize) {
    //x: 0, 30, 60
    for(let y = 0; y <= height; y += bubbleSize) {
    //y: 0, 30, 60    
      let b = {x: x,  y: y};
      bubbles.push(b);
    }
  }
}