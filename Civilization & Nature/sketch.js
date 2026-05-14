// Civilization and Nature
// Montier
// May 12

// Canvas
let canvasW = 900;
let canvasH = 600;

// Split the text into characters
let chars = [];

// Dots
let dots = [];

// Text
let message = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
let fontSizeValue = 32;
let textColor = "#111111";
let textX = 100;
let textY = 100;

// AttractCount
let attractMinCount = 10;
let attractMaxCount = 25;

function setup() {
  createCanvas (canvasW, canvasH);

  splitText();
}

function draw() { // Fix up: Order
  background(245);

  if (frameCount % 60 == 0) {
    // New Dot
    let newDot = {
      x: random(100, 800),
      y: random(100, 500),
      lineLength: random(50, 100)
    };

    dots.push(newDot);

    //
    let availableChars = []; // It means character which did not be attract

    for(let c of chars){
      if(c.isAttracted == false && c.char !== ""){
        availableChars.push(c);
      }
    }

    shuffle(availableChars, true); // shuffle the order of characters

    let attractCount = floor(random(attractMinCount, attractMaxCount + 1)); // Decide how many characters to attract this time
    attractCount = min(attractCount, availableChars.length);

    for(let i = 0; i < attractCount; i++){
      let c = availableChars[i];

      c.targetX = newDot.x;
      c.targetY = newDot.y;
      c.isAttracted = true; // mark that has been attracted and will not be sucked away by other dots again.
    }
  }

  // Draw dots and lines first
  for (let d of dots) {
    stroke(30);
    strokeWeight(2);

    line(d.x, d.y, d.x, d.y + d.lineLength);

    noStroke();
    fill("red");

    ellipse(d.x, d.y, 20);
  }

  // Draw text after dots, so text stays on top
  fill(textColor);
  noStroke();
  textSize(fontSizeValue);

  for (let c of chars) {
    c.x = lerp(c.x, c.targetX, 0.05);
    c.y = lerp(c.y, c.targetY, 0.05);

    text(c.char, c.x, c.y);
  }
}

function splitText(){
  textSize(fontSizeValue);

  let marginLeft = 80;
  let marginRight = 80;

  let x = marginLeft;
  let y = 100;

  let maxWidth = width - marginLeft - marginRight;

  
  for(let i = 0; i < message.length; i++){
    let ch = message[i];
    let w = textWidth(ch);
    

    // Automatic line change
    if(x + w > marginLeft + maxWidth){
      x = marginLeft
      y += 50;
    }

    chars.push({
      char: ch,
      x: x,
      y: y,
      targetX: x,
      targetY: y,
      isAttracted: false
    });

    x += w + 2;
  }
}
