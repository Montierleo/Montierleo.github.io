// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let aCar;
let vehicles = []; // Save all the cars in a case

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < 10; i++){ // batch creation
    let laneY;
    let direction;
    
    if(i % 2 === 0){
      laneY = height/2 - 40;
      direction = 1;
    }
    else{
      laneY = height/2 + 40;
      direction = -1;
    }
    
    let v = new Vehicle(random(width), laneY, random(["car","truck"]));
    v.direction = direction;
    vehicles.push(v);
    
  }
  // aCar = new Vehicle(100, height/2, "car");
}

function draw() {
  background(220);
  drawRd();
  
  for(let v of vehicles){
    v.move();
    v.display();
  }
  // aCar.move();
  // aCar.display();
}

function drawRd(){
  background(200);
  
  //draw the black road and dash line
  fill(0);
  rect(0,height/3,width,height/3);
  stroke (255);
  strokeWeight(2);
  
  for(let x = 0; x < width;x += 40){
    line(x, height/2, x + 20, height/2);
  }
  
  
}

class Vehicle {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    
    this.speed = random(2, 5);
    this.direction = 1;
  }
  

  display() {
    fill(255, 0, 0);
    if(this.type === "car"){
      fill(0, 0, 255);
      rect(this.x, this.y - 20, 50, 40);
    }
    else if (this.type === "truck"){
      fill(0, 255, 0);
      rect(this.x, this.y - 25, 80, 40);
    }
  }
  
  move(){
    this.x += this.speed * this.direction;

    if (this.direction === 1 && this.x > width){
      this.x = -50;
    }


    if (this.direction === -1 && this.x < -80){
      this.x = width;
    }
  }
}