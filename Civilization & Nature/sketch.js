// Civilization and Nature
// Montier
// May 12


//                                  GLOBAL VARIABLE AREA
//============================================================================================

// Canvas
let canvasW = 600;
let canvasH = 800;

// Split the text into characters
let chars = [];

// Dots
let dots = [];
let allCharactersAttracted = false;

// Text
let message = "Civilization and nature have always existed in a complicated relationship. Human beings build cities, roads, schools, hospitals, farms, machines, governments, and cultures because they want to survive, improve their lives, and create meaning beyond basic existence. Civilization gives people safety, knowledge, medicine, communication, art, and the ability to dream about the future. However, civilization is not separate from nature, even when it tries to appear that way. Every building stands on land, every meal begins with soil, every breath depends on plants, and every human body still follows the laws of the natural world. The problem is not that civilization exists, but that modern civilization often forgets where it comes from. When people see nature only as a resource to be used, controlled, or conquered, civilization becomes dangerous. It may become powerful on the outside but empty and unstable on the inside. Nature is not just forests, rivers, mountains, animals, and weather. It is also the system that makes human life possible. It teaches balance, patience, limitation, renewal, and connection. A forest does not grow by forcing everything to become the same. It allows different forms of life to depend on one another. A river does not move in a straight line simply because efficiency demands it. It follows the land, changes over time, and still reaches its destination. In contrast, civilization often values speed, growth, productivity, and control. These values are useful, but when they become the only values, human beings begin to damage both the earth and themselves. Pollution, climate change, deforestation, overconsumption, and the loss of biodiversity show that civilization can become disconnected from the natural systems that support it. At the same time, anxiety, loneliness, burnout, and the feeling of being trapped in artificial routines show that humans also suffer when they are cut off from nature emotionally and spiritually. Civilization promises comfort, but comfort without connection can become a quiet prison. Nature reminds people that life is not only about achievement. It is also about presence, rhythm, and belonging. Still, it would be too simple to say that nature is purely good and civilization is purely bad. Nature can be beautiful, but it can also be harsh. Storms, disease, hunger, and natural disasters have shaped human history. Civilization developed partly because humans needed protection from these forces. Medicine saves lives, agriculture feeds communities, and technology allows people to communicate across great distances. A world without civilization would not automatically be peaceful or fair. Therefore, the real goal should not be to abandon civilization, but to build a wiser one. A healthy civilization should not treat nature as an enemy or a warehouse. It should treat nature as a teacher, partner, and foundation. This means designing cities with green spaces, protecting clean water, using energy responsibly, reducing waste, respecting animals, and understanding that endless economic growth cannot be the only measure of success. It also means changing the way people think. If humans believe they are above nature, they will use it carelessly. But if they understand that they are part of nature, they may become more humble and responsible. This change is not only environmental; it is moral. The way a society treats nature reveals the way it understands power. A civilization that destroys nature for short-term gain is often the same kind of civilization that sacrifices vulnerable people for profit or status. A civilization that respects nature is more likely to respect limits, interdependence, and future generations. In this sense, nature challenges civilization to become more mature. It asks humans to use intelligence without arrogance and ambition without destruction. The future of humanity depends on whether civilization can remember its roots. Progress should not mean moving farther away from nature. True progress should mean learning how to live well within nature. The most advanced civilization is not necessarily the one with the tallest buildings, fastest machines, or largest economy. It may be the one that knows how to protect life, preserve beauty, and allow human beings to remain human. Civilization gives people structure, but nature gives people origin. Civilization gives people tools, but nature gives people breath. If the two are separated, both become damaged: nature becomes exploited, and civilization becomes soulless. But if they are brought into harmony, human life can become both creative and grounded. The question is not whether humans should choose civilization or nature. The deeper question is whether civilization can become wise enough to honor nature while still developing itself. If it can, then human progress will no longer be a movement against the earth, but a way of living more consciously within it.";
let fontSizeValue = 10;
let textColor = "#666666";
let textX = 100;
let textY = 100;

// Title
let titleEnglish = "Civilization & Nature";
let titleChinese = "文明与自然";

let titleFontEnglish = "Georgia";
let titleFontChinese = "SimSun";
let titleEnglishSize = 39;
let titleChineseSize = 30;

let titleColor = "#6b776b";
let titleX = 18; // Control the left and right positions of the title
let titleY = 700; // Control the up and down positions of the title

let titleLineSpacing = 34; // Control the distance between the two lines
let titleLetterSpacing = 0; // Control the distance between the two letters

// Stroke parameters
let textStrokeColor = "#ffffff";
let textStrokeWeightValue = 0; // There is no stroke in the initial text.

let attractedTextStrokeColor = "#111111";
let attractedTextStrokeWeightValue = 0; // There is no stroke either after being attracted.
let strokeLerpSpeed = 0.06;

// Attracted Text Color
let attractedTextColor1 = "#63a648";
let attractedTextColor2 = "#8ec492";
let attractedTextColor3 = "#e6efb3";
let colorLerpSpeed = 0.06;
let attractedTextColors = [];

// When Attract
let attractedFontSize = 22;
let sizeLerpSpeed = 0.08;

let attractionStrength = 0.08 // the larger the text, the faster it will be pulled over.
let friction = 0.6; // the smaller the text, the easier it is to slow down.

// AttractCount
let attractMinCount = 15;
let attractMaxCount = 25;

// Safety Space bettween attracted characters
let targetMinRadius = 2.5;
let targetMaxRadius = 50;
let safeDistance = 24;
let maxAttempts = 1000;

// Interaction
let spacePressed = false;
let growRate = 4;

//============================================================================================

function setup() {
  createCanvas (canvasW, canvasH);

  textFont("Georgia");
  textAlign(LEFT, TOP);

  attractedTextColors = [
    attractedTextColor1,
    attractedTextColor2,
    attractedTextColor3
  ];

  splitText();
}

function draw() { // Fix up: Order
  background("#f9f8f4");

                  // Frame rate
  if(spacePressed == true && frameCount % growRate == 0){
    growOneTree();
  }
  
  // Draw dots and lines first
  for (let d of dots) {
    stroke("#978674");
    strokeWeight(1.5);

    line(d.x, d.y, d.x, d.y + d.lineLength);

    noStroke();
    fill("#80705f");

    ellipse(d.x, d.y, 2.5);
  }

  // Draw text after dots, so text stays on top
  fill(textColor);
  noStroke();
  textSize(fontSizeValue);

  for (let c of chars) {
    if(c.isAttracted == true){
      let dx = c.targetX - c.x;
      let dy = c.targetY - c.y;

      c.vx += dx * attractionStrength;
      c.vy += dy * attractionStrength;

      c.vx *= friction;
      c.vy *= friction;

      c.x += c.vx;
      c.y += c.vy;
    }

    c.size =  lerp(c.size, c.targetSize, sizeLerpSpeed);

    c.currentColor = lerpColor( // it means: current color -> slowly attracted -> target color
      color(c.currentColor),
      color(c.targetColor),
      colorLerpSpeed
    );

    c.currentStrokeColor = lerpColor(
      color(c.currentStrokeColor),
      color(c.targetStrokeColor),
      strokeLerpSpeed
    );

    c.currentStrokeWeight = lerp(
      c.currentStrokeWeight,
      c.targetStrokeWeight,
      strokeLerpSpeed
    );

    fill(c.currentColor);

    if(c.currentStrokeWeight <= 0.001){ 
      noStroke();
    }
    // here is very important because sometimes you will still see that there is something at the edge
    // so the best way is when the thickness is 0, just noStroke().
    else{
      stroke(c.currentStrokeColor);
      strokeWeight(c.currentStrokeWeight);
    }

    textSize(c.size);
    text(c.char, c.x, c.y);

  }

  drawTitle();
}

function growOneTree(){
  if(allCharactersAttracted == true){
    return;
  }

  // New Dot
  let newDot = {
    x: random(10, canvasW - 10),
    y: random(10, canvasH - 50),
    lineLength: random(70, 100)
  };

  dots.push(newDot);

  //
  let availableChars = []; // It means character which did not be attract

  for(let c of chars){
    if(c.isAttracted == false && c.char !== " "){
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

    if(foundSafePosition == false){
      let angle = random(TWO_PI);
      let radius = random(targetMinRadius, targetMaxRadius);

      c.targetX = newDot.x + cos(angle) * radius;
      c.targetY = newDot.y + sin(angle) * radius;
    }
    
    c.targetSize = attractedFontSize;
    c.targetColor = random(attractedTextColors);

    c.targetStrokeColor = attractedTextStrokeColor;
    c.targetStrokeWeight = attractedTextStrokeWeightValue;

    c.isAttracted = true; // mark that has been attracted and will not be sucked away by other dots again.
  }

  checkAllCharacters();
}


function splitText(){
  textSize(fontSizeValue);

  let marginLeft = 10;
  let marginRight = 10;
  let marginTop = 10;
  let marginBottom = 10;

  let x = marginLeft;
  let y = marginTop;

  let lineSpacing = 8;
  let lineHeight = fontSizeValue + lineSpacing;

  let maxWidth = width - marginLeft - marginRight;

  
  for(let i = 0; i < message.length; i++){
    let ch = message[i];
    let w = textWidth(ch);
    
    // Automatic line change
    if(x + w > marginLeft + maxWidth){
      x = marginLeft
      y += lineHeight;
    }

    if(y > height - marginBottom){
      break;
    }

    chars.push({
      char: ch,
      x: x,
      y: y,

      vx: 0, // horizontal velocity
      vy: 0, // vertical velocity

      targetX: x,
      targetY: y,

      size: fontSizeValue,
      targetSize: fontSizeValue,

      currentColor: textColor,
      targetColor: textColor,
      
      currentStrokeColor: textStrokeColor,
      targetStrokeColor: textStrokeColor,

      currentStrokeWeight: textStrokeWeightValue,
      targetStrokeWeight: textStrokeWeightValue,
      
      isAttracted: false
    });

    x += w;
  }
}

function checkAllCharacters(){ // Check how many characters are still unattracted.
  let remainingCharacters = 0;
  for(let c of chars){
    if(c.isAttracted == false && c.char !== " "){
      remainingCharacters++;
    }
  }
  if(remainingCharacters == 0){
    allCharactersAttracted = true;
  }
}

function drawTitle(){
  push();
  
  textAlign(LEFT, TOP);
  fill(titleColor);
  noStroke();

  // English title
  textFont(titleFontEnglish);
  textSize(titleEnglishSize);
  text(titleEnglish, titleX, titleY);


  // Chinese title
  textFont(titleFontChinese);
  textSize(titleChineseSize);
  text(titleChinese, titleX, titleY + titleLineSpacing);

  pop();
}

function keyPressed(){
  if(key ===" " && spacePressed === false){
    spacePressed = true;

    // Press the space once to grow a tree immediately.
    growOneTree();

    return false; // Prevent the webpage from scrolling because of the space.
  }
}

function keyReleased(){
  if(key === " "){
    spacePressed = false;
    return false;
  }
}