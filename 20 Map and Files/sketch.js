// Maps and Files
// Montier
// April 21, 2026

let textFile;
let imgFile;
let rows;
let cols;
let colorMap;


async function loadAssets(){
  textFile = loadStrings("assets/info.txt");
  imgFile = loadStrings("assets/image.txt");
}

function preload(){
  textFile = loadStrings("assets/info.txt");
  imgFile = loadStrings("assets/colorImage.txt");
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
  noLoop();

  //Determine the # of rows and cols
  rows = imgFile.length
  cols = imgFile[0].length

  //Construct the Map of Colors
  colorMap = new map([
    ["b", "black"],
    ["w", color(255)],
    ["r", "red"],
    ["l", "brown"],
    ["p", "purple"]
  ]);

}

function drawImage(){
  // read through our text info and
  // construct an image.
  let pixelSize = 50;
  for (let y = 0; y < rows; y++){
    let currentRow = imgFile[y];
    for(let x = 0; x < cols; x++){
      let currentKey = currentRow[x];
      fill(colorMap.get(currentKey));
      square(x*pixelSize, y*pixelSize, pixelSize);
    }
  }
}

function draw() {
  background(220);
  processText();
  drawImage();
}

function processText(){
  // look at 3 different ways tp split up
  // larger strings into words, or characters
  // split() and ...spread syntax
  print("SPLIT INTO WORDS");
  let splitWords = textFile[0].split(" ");
  print(splitWords);

  print("SPLIT INTO CHARACTERS");
  let splitChars = textFile[1].split(" ");
  print(splitChars);

  print("SPREAD INTO CHARACTERS");
  let spreadChars = [...textFile[2]];
  print(spreadChars);

}