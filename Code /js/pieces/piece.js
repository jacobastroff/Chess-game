"use strict";
class Piece {
  color;
  #position;
  image;
  type;
  #el;
  curSquare;
  #parentEl = document.querySelector(".chess-board");
  availableSquares = [];
  constructor(color) {
    this.color = color;
  }
  init(square) {
    const html = `<img
          class="piece ${this.color}"
          src="${this.image}"
          alt="${this.color} ${this.type}"
        />`;
    this.#parentEl.insertAdjacentHTML("afterbegin", html);
    this.#el = this.#parentEl.querySelector(".piece");
    console.log(this.#el);
    this.curSquare = {
      row: square.row,
      column: square.column,
      square: square,
    };
    this.moveTo(square, true);
  }
  moveTo(square, isInit = false) {
    if (!isInit) {
      this.curSquare.square.isOccupied = false;
      this.curSquare.square.pieceOccupying = "";
      this.curSquare = {
        row: square.row,
        column: square.column,
        square: square,
      };
    }
    // console.log(this.curSquare);
    this.#el.style.top = `${square.yCor / 10}rem`;
    this.#el.style.left = `${square.xCor / 10}rem`;

    // console.log(this.curSquare);
    this.curSquare.square.isOccupied = true;
    this.curSquare.square.pieceOccupying = `${this.color} ${this.type}`;
    this.#position = { x: square.xCor, y: square.yCor };
  }
  getName() {
    return this.type;
  }

  getAvailbleSquaresPiece(sqauresFourDirections) {
    const availableSquares = [];
    sqauresFourDirections.forEach((dimension) => {
      console.log(dimension);
      for (const square of dimension) {
        if (!square.isOccupied) {
          // availableSquares.push(square)
          availableSquares.push(square);
        } else {
          // console.log(this);
          if (!square.pieceOccupying.startsWith(`${this.color}`)) {
            availableSquares.push(square);
          }
          break;
        }
      }
    });
    return availableSquares.flat();
  }
  isCheckingKing(availableSquares) {
    return availableSquares.some((square) =>
      square.pieceOccupying.endsWith("king")
    );
  }
}

export { Piece };
