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
let message = "Hello world";
let fontSizeValue = 32;
let textColor = "#111111";
let textX = 100;
let textY = 100;

function setup() {
  createCanvas (canvasW, canvasH);

  splitText();
}

function draw() {
  background(245);

  fill(textColor);
  textSize(fontSizeValue);

  for(let c of chars){
    c.x = lerp(c.x, c.targetX, 0.05);
    c.y = lerp(c.y, c.targetY, 0.05);
    text(c.char, c.x, c.y);
  }

  for(let d of dots){
    stroke(30);
    strokeWeight(2);

    line(
     d.x,
     d.y,
     d.x,
     d.y + d.lineLength
    );
    
    noStroke;
    fill("red");

    ellipse(d.x, d.y, 20);
  }

  if(frameCount % 60 == 0){
    // New Dots
    let newDot = {
      x: random(100, 800),
      y: random(100, 500)
      lineLength: random(50, 100)
    };

    dots.push(newDot);

    // Random Character
    let randomChar = random(chars);

    // fly to dot
    randomChar.targetX = newDot.x;
    randomChar.targetY = newDot.y;
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
      targetY: y
    });

    x += w + 2;
  }
}
