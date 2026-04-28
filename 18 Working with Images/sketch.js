// Working With Images
// Montier Liu
// April 14.2026
// How to load images
// How to play animations

let lionL, lionR;
let pinImages = [];
let current = 0; //pinwheel curr index

async function loadAssets(){
  //load lions
  lionL = loadImage("Assets/lion-left.png");
  lionR = loadImage("Assets/lion-right.png");

  //pinwheel images
  for(let i = 0; i <= 8; i++){
    pinImages.push(loadImage("Asset/pin0"+ i + ".png"));
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
  imageMode(CENTER); //Center reference
  //noCursor();
  // frameRate(4);
}

function draw() {
  background(220);
  lion();
  pinwheel();
}

function pinwheel(){
  image(pinImages[current], width/2, height*0.7);
  if(frameCount%10===0){
    current = (current + 1) % 9;
  }
}

function lion(){
  // update state variable
  if(movedX < 0) dir = "left";
  else if(movedX > 0) dir = "right";

  // interpreting the state variable
  if(dir === "left"){
    image (lionL, mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
  else{
    image (lionR, mouseX, mouseY, lionR.width/2, lionR.height/2);
  }
}