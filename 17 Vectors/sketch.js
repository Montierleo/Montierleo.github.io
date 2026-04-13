// Vectors Practice
// Montier Liu
// April 13

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //create objects
  if(mouseIsPressed){
    objects.push(new Ball(mouseX, mouseY));
  }

  //process objects
  for(let o of objects){
    if(keyIsDown(32)){
      o.move();
    }
    o.calcMouse();
    o.display();
  }
}

class Ball{
  constructor(x, y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5, 5) -5);
    this.force = createVector(0, 0.1); //GRAV
  }

  calcMouse(){
    this.force = createVector(mouseX, mouseY);
    this.force.sub(this.pos);
    this.force.normalize();
    this.force.mult(4);
  }

  move(){
    // update velocity and pos vectors
    this.vel.add(this.force);
    this.vel.limit(20); // can't go outside -20 and 20
    this.pos.add(this.vel);

    //wall bounce
    if(this.pos.x < 0 || this.pos.x > width){
      this.vel.x *= -1;
    }

    //floor bounce
    if(this.pos.y > height){
      this.vel.y *= -0.9;
    }
  }

  display(){
    //display the ball
    circle(this.pos.x, this.pos.y, 20 );

    //display the vectors
    if(true){
      stroke(255, 0, 0);
      line (0,0, this.pos.x, this.pos.y);

      let endX = this.pos.x + this.vel.x;
      let endY = this.pos.y + this.vel.y;

      stroke(0,0,255);
      line(this.pos.x, this.pos.y, endX, endY);

      stroke(0, 255, 0);
      line(endX, endY, endX + this.force.x, endY + this.force.y);
    }
  }
}