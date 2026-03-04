// Random vs. Noice
// Montier Liu
// Feb 27, 2026
//
// Looking at unpreictability
// Specifically the difference between
// Uniformly distributed numbers
// and Perlin Noice
//
// Challange: use noice() to make/use a 
// ySpeed 

// Global Varibles
let d1, d2;
let minSize = 5; let maxSize = 200;
let x1, x2, y1, y2;

// variables for using noice()
let noiceTime = 5, noiceSpeed = 0.02;
// "noiceSpeed" controls how connected
//the random noice() values are

let ySpeed = 0; // Range:  -5 and +5
let yNoisetime = 


function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width * 0.3; y1 = height * 0.5;
  x2 = width * 0.7; y2 = height * 0.5;
  //frameRate(3);
}

function draw() {
  background(0);
  //randomSeed(703); // actual value
  //stars();
  ySpeed = noise(yNoiseTime)
  randomCircle();
  noiceCircle();

}

function noiceCircle() {
  // draw a fixed circle with randomly
  // changing diameter
  fill(200, 150, 50);
  d2 = noise(noiceTime); // yields value betweeb 0-1
  d2 = map(d2, 0, 1, minSize, maxSize);
  circle(x2, y2, d2);
  noiceTime += noiceSpeed;
}

function randomCircle() {
  // draw a fixed circle with random()ly
  // changing diameter
  fill(255, 255, 255);
  d1 = random(minSize, maxSize)
  circle(x1, y1, d1);
}

function stars() {
  // use random() to generate 100 stars
  // [alt][shift][F] - autoformat

  fill(255);
  for(let i = 0; i < 100; i++){
    let x = random(0, width);
    let y = random(0, height);
    circle(x,y,3);
  }

}