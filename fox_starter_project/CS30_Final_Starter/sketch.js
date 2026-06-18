// CS30 - Final Programming Challenge
// Complete this comment header - - - (it's being graded!)
//
//
//
//
//

//variable declarations - included for convenience, but you don't have to use these.
//                        feel free to handle this in a different way if you prefer.


let foxLeft = [];   //array to hold all 8 images for LEFT
let foxRight = [];   //array to hold all 8 images for RIGHT
let foxUp = [];   //array to hold all 8 images for UP
let foxDown = [];   //array to hold all 8 images for DOWN

let foxX;
let foxY;
let currentFox;
let moveSpeed = 10;
let foxSize = 80;
let defaultSize = 80;
let pepsiMode = false;
let pepsiSpeed = 20;
let animationIndex = 0;
let animationSpeed = 5;
let currentDirection = "down";
let computerFoxes = [];



async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAnimation();  //also defined at bottom
  foxX = width / 2;
  foxY = height / 2;
  // currentFox = foxDown[0];
  // computerFoxes.push(new computerFoxes(150,150));
  // computerFoxes.push(new computerFoxes(width - 150,150));
  // computerFoxes.push(new computerFoxes(width / 2, height - 150));
}

function draw() {
  background(220);

  if(pepsiMode){
    foxX += random(-pepsiSpeed,pepsiSpeed);
    foxY += random(-pepsiSpeed,pepsiSpeed);
    foxSize = random(20, 120);
    tint(random(255),random(255),random(255));
  }
  else{
    noTint();
  }
  
  if(frameCount % animationSpeed === 0){
    animationIndex++;

    if (animationIndex >= 8){
      animationIndex = 0;
    }
  }

  if(currentDirection === "left"){
    currentFox = foxLeft[animationIndex];
  }
  else if(currentDirection === "right"){
    currentFox = foxRight[animationIndex];
  }
  else if(currentDirection === "up"){
    currentFox = foxUp[animationIndex];
  }
  else if(currentDirection === "down"){
    currentFox = foxDown[animationIndex];
  }

  imageMode(CENTER);
  image(currentFox,foxX,foxY,foxSize,foxSize);  //example - you'll need to change this

  for(let computerFox of computerFoxes){
    computerFox.move();
    computerFox.display();
  }
}

function resetFox(){
  pepsiMode = false;
  foxX = width / 2;
  foxY = width / 2;
  foxSize = defaultSize;
  currentDirection = "Down"
  animationIndex = 0;
  currentFox = foxDown[0];
  noTint();
}

function keyPressed(){
  if (key === 'w'){
    foxY -= moveSpeed;
    currentDirection = "up";
  }
  else if (key === 'a'){
    foxX -= moveSpeed;
    currentDirection = "left";
  }
  else if (key === 's'){
    foxY += moveSpeed;
    currentDirection = "down";
  }
  else if (key === 'd'){
    foxX += moveSpeed;
    currentDirection = "right";
  }

  else if (key === 'p'){
    pepsiMode = !pepsiMode;
  }
  else if (key === 'r'){
    resetFox();
  }
}

function mousePressed(){
  if (mouseY < height / 2){
    foxSize += 10;
  }
  else{
    foxSize -= 10;
  }
  foxSize = max(20, foxSize);
}

// class ComputerFox{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//     this.size = 80;
//     this.speed = 5;
//     this.direction = "down";
//     this.changeTimer = int(random(20,41));// how many time to change a direction
//   }
// 
//   move(){
//     this.changeTimer--;
//     if(this.changeTimer <= 0){
//       let directions = ["left", "right", "up", "down"];
//       this.direction = random(directions);
//       this.changeTimer = int(random(20, 41))
//     }
//     if (this.direction === "left"){
//       this.x -= this.speed;
//     }
//     else if (this.direction === "right"){
//       this.x += this.speed;
//     }
//     else if (this.direction === "up"){
//       this.y -= this.speed;
//     }
//     else if (this.direction === "down"){
//       this.y += this.speed;
//     }
//   }
// 
//   
//   
// }

// ---------------- Shouldn't need to modify below this line ----------------

async function loadAnimation(){
  // loads all the fox images into 4 arrays
  // each array holds images for a different direction
  // left, right, up, and down
  
  for(let i = 1; i <= 8; i++){    //0-7 LEFT
    foxLeft.push(await loadImage("/assets/left" + i + ".png"))
  }

  for(let i = 1; i <= 8; i++){  //0-7 RIGHT
    foxRight.push(await loadImage("/assets/right" + i + ".png"))
  }

  for(let i = 1; i <= 8; i++){  //0-7 UP
    foxUp.push(await loadImage("/assets/up" + i + ".png"))
  }

  for(let i = 1; i <= 8; i++){  //0-7 DOWN
    foxDown.push(await loadImage("/assets/down" + i + ".png"))
  }
}