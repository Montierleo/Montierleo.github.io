// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let myBook;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBook = new Book("CS30 Text", "Mr. Scott",
    1234567891011, "leatherbound", 500,
    width * 0.3 );
  myBook2 = new Book("Harry Potter", "JK",
    9999, "softcover", 800,
    width * 0.4);
  myBook3

}

function draw() {
  background(220);
}

class  Book{
  //1. Constructor
  constructor(title,author,isbn,cover,pages,x){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;
  }

  //2. Class Methods
  display(){
    rectMode(CENTER);textAlign(CENTER,CENTER);
    textSize(20);

    //set fill color based on covertype
    switch( this.cover){
      case "softcover":
        fill(250,200,150); break;
      case "hardcover":
        fill(120,255,255); break;
      case "leatherbound":
        fill(150,100,15); break;
    }


    //now draw the book
    push();
    translate(this.x, height/2);
    rect(0, 0, this.pages/10, 150);
    fill(255);
    text(this.title[0], 0, -50)
    pop();
  }
}