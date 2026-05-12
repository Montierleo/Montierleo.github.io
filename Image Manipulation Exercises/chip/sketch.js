// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chip;

function preload(){
  chip = loadImage("chip.jpg");
}

function setup(){
  createCanvas(chip.width, chip.height);
  chip.loadPixels();

  for(let y = 0; y < chip.height; y++){
    for(let x = 0; y < chip.width; x++){
      let index = (x + y * chip.width) * 4;

      let r = chip.pixels[index + 0];
      let g = chip.pixels[index + 1];
      let b = chip.pixels[index + 2];

      if(r>g && r>=b){
        chip.pixels[index + 0] = 255;
        chip.pixels[index + 1] = 0;
        chip.pixels[index + 2] = 0;
      }
      else if(g>=r && g>=b){
        chip.pixels[index + 0] = 0;
        chip.pixels[index + 1] = 255;
        chip.pixels[index + 2] = 0;
      }
      else{
        chip.pixels[index + 0] = 0;
        chip.pixels[index + 1] = 0;
        chip.pixels[index + 2] = 255;
      }
    }
  }
  chip.updatePixels();
  image(chip,0,0);
}

function draw(){
  
}