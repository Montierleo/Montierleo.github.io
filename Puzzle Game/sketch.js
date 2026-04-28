// 2D Array Basics
// Mr. Scott
// April 15, 2026
//
// 0 (black)   255 (white)
// grid is 6 x 5 

let grid = [
  [0,   0,   0,   255,  0,  255],
  [255, 0, 255,   0,    255,  0],
  [0,   0,   0,   0,    0,  255],
  [255, 255, 255, 255,  255,  0],
  [0,   255, 0,   0,    0,  255]
];
let rows = grid.length;
let cols = grid[0].length;
let tileSize = 60;
let squareMode = false;

function setup() {
  createCanvas(cols*tileSize, rows*tileSize);
  randomGrid();
}

function draw() {
  background(220);
  renderGrid();
  drawOverlay();
  textSize(20);
  fill(255,0,0);
  // text(getCurrentX()+","+getCurrentY(),mouseX, mouseY)

  if(checkWin()){
    textSize(65);
    fill(0,255,0);
    textAlign(CENTER, CENTER);
    text("You Win!!!", width/2, height/2);
  }

  textSize(20);
  fill(0,0,255);
  textAlign(LEFT, BASELINE);

  if(squareMode){
  text("Square Mode", 10, 25);
  }
  else{
  text("Cross Mode", 10, 25);
  }
}

function flipSquare(x, y){
  // flip a 2x2 square starting from the clicked tile
  for(let dy = 0; dy <= 1; dy++){
    for(let dx = 0; dx <= 1; dx++){
      let newX = x+dx;
      let newY = y+dy;

      if(newX >= 0 && newX < cols && newY >= 0 && newY < rows){
        flip(newX, newY);

      }
    }
  }
}

function randomGrid(){
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){

      if(random(1) < 0.5){
        grid[y][x] = 0;
      }

      else{
        grid[y][x] = 255;
      }

    }
  }
}

function flip(x,y){
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function flipCross(x,y){
  // flip the center title
  flip(x,y);

  // flip the cardinal neighbours if thy exist
  if(x-1 >= 0) flip(x-1, y);  // left
  if(x+1 < cols) flip(x+1, y);  // right
  if(y-1 >= 0) flip(x, y-1);  // up
  if(y+1 < rows) flip(x, y+1);  // down
}

function keyPressed(){
  if(key === " "){
    squareMode = !squareMode;
  }
}

function mousePressed(){
  //only do a flip if mouse is on the Canvas
  if(mouseX < width && mouseY < height && mouseX >= 0 && mouseY >= 0){
    
    let x = getCurrentX();
    let y = getCurrentY();

    // if shift is held, only flip the tile under the mouse
    if(keyIsDown(SHIFT)){
      flip(x, y);
    }
    
    // otherwise, flip tiles in a cross pattern
    else{
      if(squareMode){
        flipSquare(x, y);
      }
      else{
        flipCross(x, y);
      }
    }
  }
  
}

function renderGrid(){
  // intepret the data stored in 2D array (grid) and
  // draw a matrix of squares to reflect it
  for(let y = 0; y < rows; y++){ //y:0 1 2 3 4
    for(let x = 0; x < cols; x++){ //x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*tileSize, y*tileSize, tileSize);
    }
  }
}

function checkWin(){
  let target = grid[0][0];
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      if(grid[y][x] !== target){
        return false;
      }
    }

  }
  return true;
}

function getCurrentX(){
  //determine the current col position of mouse
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / tileSize);
}

function getCurrentY(){
  //determine the current row position of mouse
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / tileSize);
}

function drawOverlay(){
  let x = getCurrentX();
  let y = getCurrentY();
  fill(0, 255, 255, 65);
  noStroke();

  if(squareMode){
    for(let dy = 0; dy <= 1; dy++){
      for(let dx = 0; dx <= 1; dx++){
        let newX = x+dx;
        let newY = y+dy;

        if(newX >= 0 && newX < cols && newY >= 0 && newY < rows){
          square(newX * tileSize, newY * tileSize, tileSize);
        }
      }
    }
  }
  else{
    square(x * tileSize, y * tileSize, tileSize);

    if(x-1 >= 0) square((x-1) * tileSize, y * tileSize, tileSize);
    if(x+1 < cols) square((x+1) * tileSize, y * tileSize, tileSize);
    if(y-1 >= 0) square(x * tileSize, (y-1) * tileSize, tileSize);
    if(y+1 < rows) square(x * tileSize, (y+1) * tileSize, tileSize);
  }

  stroke(0);
}