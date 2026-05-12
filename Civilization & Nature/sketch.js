// Civilization and Nature
// Montier
// May 12

// Canvas
let canvasW = 900;
let canvasH = 600;

// Text
let message = "Hello world";
let fontSizeValue = 32;
let textColor = "#111111";
let textX = 100;
let textY = 100;

function setup() {
  createCanvas (canvasW, canvasH);
}

function draw() {
  background(245);

  fill(textColor);
  textSize(fontSizeValue);

  text(message, textX, textY)
}
