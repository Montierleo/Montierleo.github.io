// No Green Right Side
// Montier Liu
// June 2nd

let race;

function preload() {
  race = loadImage("race.jpg");
}

function setup() {
  createCanvas(race.width, race.height);

  race.loadPixels();

  for (let y = 0; y < race.height; y++) {
    for (let x = 0; x < race.width; x++) {

      let index = (x + y * race.width) * 4;

      // only change the right half of the image
      if (x >= race.width / 2) {
        race.pixels[index + 1] = 0; // remove green
      }
    }
  }

  race.updatePixels();

  image(race, 0, 0);
}

function draw() {

}
