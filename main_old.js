const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let gameIsActive = true;

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
  }

  //print the field to the terminal
  print() {
    return this.field.map((x) => x.join("")).join("\n");
  }

  // checks the letter and add x or y coordinates to +- 1.
  // if its not valid console 'Enter a valid value'
  ask() {
    let move = prompt(
      "Which direction do you want to move?(U for up, D for down, L for left, R for right)"
    );
    let letter = move.toUpperCase();
    if (letter === "U") {
      console.log("Moving up");
      this.y -= 1;
    } else if (letter === "D") {
      console.log("Moving down");
      this.y += 1;
    } else if (letter === "L") {
      console.log("Moving left");
      this.x -= 1;
    } else if (letter === "R") {
      console.log("Moving right");
      this.x += 1;
    } else {
      console.log("Please enter a valid direction");
    }
  }
  //get current char loc
  getCurrentCharLoc() {
    return this.field[this.y][this.x];
  }
  //sets the new location for the changing the character
  setCurrentLocationChar() {
    this.field[this.y][this.x] = pathCharacter;
  }
  //game table size // returns an object {x,y}
  getSize() {
    return {
      x: this.field[0].length,
      y: this.field.length,
    };
  }
  //returns boolean, check two values {x,y}
  isInvalid() {
    let { x, y } = this.getSize();
    let isXinvalid = this.x < 0 || this.x >= x;
    let isYinvalid = this.y < 0 || this.y >= y;
    return isXinvalid || isYinvalid;
  }

  gameTurn() {
    console.clear();
    console.log(this.print());
    let prevY = this.y;
    let prevX = this.x;

    this.ask();
    let invalid = this.isInvalid();
    let currentCharLoc = this.getCurrentCharLoc();
    if (invalid) {
      gameIsActive = false;
      console.log("Out of boundary");
    } else if (currentCharLoc === hat) {
      console.log("You win!");
      gameIsActive = false;
    } else if (currentCharLoc === hole) {
      console.log("You lose!");
      gameIsActive = false;
    } else {
      console.log("Keep looking");
      gameIsActive = true;
      this.setCurrentLocationChar();
      this.field[prevY][prevX] = fieldCharacter;
    }
  }

  play() {
    while (gameIsActive) {
      this.gameTurn();
    }
  }
}

const myField = new Field([
  ["*", "^", "░", "░", "░", "O", "░", "░", "░", "O"],
  ["░", "O", "░", "░", "░", "O", "░", "░", "░", "O"],
  ["░", "^", "░", "░", "░", "░", "░", "░", "░", "O"],
  ["░", "O", "░", "░", "░", "░", "░", "░", "░", "O"],
  ["░", "O", "░", "░", "░", "░", "░", "░", "░", "O"],
  ["░", "O", "░", "░", "░", "░", "░", "░", "░", "O"],
]);

myField.play();
