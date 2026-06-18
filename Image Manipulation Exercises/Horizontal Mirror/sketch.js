let handImg;

async function preload(){
  handImg = await loadImage("hand.jpg");
}

async function setup() {
  await preload();
  createCanvas(handImg.width, handImg.height);
  noLoop();
}

function draw() {
  handImg.loadPixels();

  for(let y = 0; y < handImg.height; y++){
    for(let x = handImg.width / 2; x < handImg.width; x++){
      let rightIndex = (x + y * handImg.width) * 4;
      let mirrorX = handImg.width - 1 - x;
      let leftIndex = (mirrorX + y * handImg.width) * 4;

      handImg.pixels[leftIndex + 0] = handImg.pixels[rightIndex + 0];
      handImg.pixels[leftIndex + 1] = handImg.pixels[rightIndex + 1];
      handImg.pixels[leftIndex + 2] = handImg.pixels[rightIndex + 2];
      handImg.pixels[leftIndex + 3] = handImg.pixels[rightIndex + 3];
    }
  }

  handImg.updatePixels();

  image(handImg, 0, 0);
}
