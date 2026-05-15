// Civilization and Nature
// Montier
// May 12


//                                  GLOBAL VARIABLE AREA
//============================================================================================

// Canvas
let canvasW = 900;
let canvasH = 600;

// Split the text into characters
let chars = [];

// Dots
let dots = [];
let allCharactersAttracted = false;

// Text
let message = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
let fontSizeValue = 32;
let textColor = "#111111";
let textX = 100;
let textY = 100;

// When Attract
let attractedFontSize = 50;
let sizeLerpSpeed = 0.08;

// AttractCount
let attractMinCount = 10;
let attractMaxCount = 25;

// Safety Space bettween attracted characters
let targetMinRadius = 25;
let targetMaxRadius = 70;
let safeDistance = 18;
let maxAttempts = 100;

//============================================================================================

function setup() {
  createCanvas (canvasW, canvasH);

  splitText();
}

function draw() { // Fix up: Order
  background(245);

  if(frameCount % 60 == 0 && allCharactersAttracted == false){
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

    let targetPositions = [];

    for(let i = 0; i < attractCount; i++){
      let c = availableChars[i];
      
      let foundSafePosition = false;
      let attempts = 0

      while(foundSafePosition == false && attempts < maxAttempts){
        let angle = random(TWO_PI);
        let radius = random(targetMinRadius, targetMaxRadius);

        let newX = newDot.x + cos(angle) * radius;
        let newY = newDot.y + sin(angle) * radius;

        let isSafe = true;

        for(let p of targetPositions){
          let distanceToOther = dist(newX, newY, p.x, p.y);

          if(distanceToOther < safeDistance){
            isSafe = false;
            break;
          }
        }

        if(isSafe == true){
          c.targetX = newX;
          c.targetY = newY;

          targetPositions.push({
            x: newX,
            y: newY
          })

          foundSafePosition = true;
        }

        attempts++;
      }

      if(foundSafePosition = false){
        let angle = random(TWO_PI);
        let radius = random(targetMinRadius, targetMaxRadius);

        c.targetX = newDot.x + cos(angle) * radius;
        c.targetY = newDot.y + sin(angle) * radius;
      }
      
      c.targetSize = attractedFontSize;
      c.isAttracted = true; // mark that has been attracted and will not be sucked away by other dots again.
    }

    checkAllCharacters();
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

    c.size =  lerp(c.size, c.targetSize, sizeLerpSpeed);

    textSize(c.size);
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

      size: fontSizeValue,
      targetSize: fontSizeValue,
      
      isAttracted: false
    });

    x += w + 2;
  }
}

function checkAllCharacters(){ // Check how many characters are still unattracted.
  let remainingCharacters = 0;
  for(let c of chars){
    if(c.isAttracted == false && c.char !== ""){
      remainingCharacters++;
    }
  }
  if(remainingCharacters == 0){
    allCharactersAttracted = true;
  }
}