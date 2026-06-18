let filterImg;

async function preload() {
  filterImg = await loadImage(
    "arrays/nuit.jpg"
  );
}

async function setup(){
  await preload();
  createCanvas(filterImg.width, filterImg.height);
  noLoop();
}

function draw(){
filterImg.loadPixels();

  for(let y = 0; y < filterImg.height; y++){
    for(let x = 0; x < filterImg.width; x++){
      let index = (x + y * filterImg.width) * 4;
    
      let r = filterImg.pixels[index + 0];
      let g = filterImg.pixels[index + 1];
      let b = filterImg.pixels[index + 2];
    
      let avg = (r + g + b) / 3;
    
      if(avg >= 205){
        filterImg.pixels[index + 0] = 170;
        filterImg.pixels[index + 1] = 230;
        filterImg.pixels[index + 2] = 220;
      }
      else if(avg >= 155){
        filterImg.pixels[index + 0] = 100;
        filterImg.pixels[index + 1] = 150;
        filterImg.pixels[index + 2] = 120;
      }
      else if(avg >= 105){
        filterImg.pixels[index + 0] = 120;
        filterImg.pixels[index + 1] = 180;
        filterImg.pixels[index + 2] = 60;
      }
      else if(avg >= 55){
        filterImg.pixels[index + 0] = 130;
        filterImg.pixels[index + 1] = 30;
        filterImg.pixels[index + 2] = 130;
      }
      else{
        filterImg.pixels[index + 0] = 80;
        filterImg.pixels[index + 1] = 10;
        filterImg.pixels[index + 2] = 50;
      }
    }
  }

  filterImg.updatePixels();

  image(filterImg, 0, 0);
}