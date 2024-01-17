const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let gameIsActive = true;

class Field {
  constructor(field) {
    this.field = field;
    this.column = 0;
    this.row = 0;
  }

  print() {
    return this.field.map((x) => x.join("")).join("\n");
  }

  ask() {
    let move = prompt(
      "Which direction do you want to move?(U for up, D for down, L for left, R for right)"
    );
    let letter = move.toUpperCase();
    if (letter === "U") {
      console.log("Moving up!");
      this.row += 1;
    } else if (letter === "D") {
      console.log("Moving down!");
      this.row -= 1;
    } else if (letter === "L") {
      console.log("Moving left");
      this.column -= 1;
    } else if (letter) {
      console.log("Moving right");
      this.column += 1;
    }
  }

  getCurrentChar() {
    return this.field[this.row][this.column];
  }

  setCurrentChar() {
    this.field[this.row][this.column] = pathCharacter;
  }

  getSize() {
    return {
      col: this.field[0].length,
      row: this.field.length,
    };
  }

  isInvalid() {
    let { col, row } = this.getSize();
    let colIsValid = this.column < 0 || this.column >= col;
    let rowIsValid = this.row < 0 || this.row >= row;
    return colIsValid || rowIsValid;
  }

  game() {
    console.log(this.print());
    this.ask();

    let invalid = this.isInvalid();
    let currentChar = this.getCurrentChar();

    if (invalid) {
      console.log("Please choose valid direction");
      gameIsActive = false;
    } else if (currentChar === hat) {
      console.log("You win!");
      gameIsActive = false;
    } else if (currentChar === hole) {
      console.log("Ups! A hole! Try again!");
      gameIsActive = false;
    } else if (currentChar === fieldCharacter) {
      gameIsActive = true;
      console.log("Keep looking for the hat!");
    } else {
      this.setCurrentChar();
    }
  }

  play() {
    while (gameIsActive) {
      this.game();
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

console.log(myField.play());
