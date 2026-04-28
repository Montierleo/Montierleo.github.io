// Image Manipulation
// Montier Liu
// April 22, 2025

// Working with Images
// translation b/w 2D and 1D indices
// Part 2: using video

let myImage;
let myVideo;

function preload(){
  //called Before setup. Won't conclue
  //until all loads are complete.
    myImage = loadImage("assets/aviator.png");
}


function setup() {
  createCanvas(640, 480);
  myVideo = createCapture(VIDEO);
  pixelDensity(1);
}

function draw() {
  
  image(myVideo, 0,0);
  loadPixels();
  // boost();
  // greyscale();
  // updatePixels();
  background(0);
  textImage();
}

function textImage(){
  fill(255);
  let scaleAmount = 10;
  textSize(scaleAmount);

  for(let x = 0; x < width; x += scaleAmount){
    for(let y = 0; y < height; y += scaleAmount){
      let avg = getAvg(x, y); //0-255
      if(avg > 205) text("⚪", x, y);
      else if(avg > 165) text("🟪", x, y);
      else if(avg > 125) text("🟥", x, y);
      else if(avg > 85) text("🟠", x, y);
      else if(avg > 40) text("🟫", x, y);
      else if(avg > 0) text("🖤", x, y);
    }
  }
}

function boost(){
  //brightening filter
  let boostAmount = 50;
  for(let i = 0; i < pixels.length; i+=4){
    let r = pixels[i] + boostAmount;
    let g = pixels[i+1] + boostAmount;
    let b = pixels[i+2] + boostAmount;
    setPixelOneD(i,r,g,b);
  }
}

function getAvg(x,y){
  let index = (y*width + x)*4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  return (r+g+b) / 3
}

function greyscale(){
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      let avg = getAvg(x,y);
      setPixel(x, y, avg, avg, avg);
    }
  }
}

function setPixel(x,y,r,g,b){
  //x,y -> pixel location
  //r,g,b -> color values
  let index = ((y*width) + x)*4;
  setPixelOneD(index, r, g, b);
}

function setPixelOneD(pos, r, g, b){
  //pos -> 1D location of the pixel's red component
  //r, g, b -> new color values (0-255) for the pixel
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b;
}