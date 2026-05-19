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
let fontSizeValue = 9;
let textColor = "#111111";
let textX = 100;
let textY = 100;

// Stroke parameters
let textStrokeColor = "#ffffff";
let textStrokeWeightValue = 0; // There is no stroke in the initial text.

let attractedTextStrokeColor = "#111111";
let attractedTextStrokeWeightValue = 0; // There is no stroke either after being attracted.
let strokeLerpSpeed = 0.06;

// Attracted Text Color
let attractedTextColor1 = "#E84A5F";
let attractedTextColor2 = "#3FA7D6";
let attractedTextColor3 = "#F4A261";
let colorLerpSpeed = 0.06;
let attractedTextColors = [];

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
  background(245);

  if(frameCount % 60 == 0 && allCharactersAttracted == false){
    // New Dot
    let newDot = {
      x: random(100, canvasW - 100),
      y: random(100, canvasH - 200),
      lineLength: random(50, 100)
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

      currentColor: textColor,
      targetColor: textColor,
      
      currentStrokeColor: textStrokeColor,
      targetStrokeColor: textStrokeColor,

      currentStrokeWeight: textStrokeWeightValue,
      targetStrokeWeight: textStrokeWeightValue,
      
      isAttracted: false
    });

    x += w + 2;
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