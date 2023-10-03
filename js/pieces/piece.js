"use strict";
class Piece {
  color;
  #position;
  image;
  type;
  #el;
  disabled = false;
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
    // console.log(this.#el);
    this.curSquare = {
      row: square.row,
      column: square.column,
      square: square,
    };
    this.moveTo(square, undefined, true);
  }
  moveTo(square, chessboard = undefined, isInit = false, isCastling = false) {
    if (!isInit) {
      // console.log(this.has_caused_en_passant);
      this.curSquare.square.isOccupied = false;
      this.curSquare.square.pieceOccupyingName = "";
      this.curSquare.square.piece = undefined;
      if (this.type === "pawn") {
        const upDown = this.color === "white" ? 1 : -1;
        if (
          this?.firstMove &&
          square.row === this?.curSquare?.row + 2 * upDown &&
          this.has_caused_en_passant(square, chessboard)
        ) {
          this.en_passant_status = true;
        } else {
          this.en_passant_status = false;
        }
        this.firstMove = false;
      }
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
    this.curSquare.square.pieceOccupyingName = `${this.color} ${this.type}`;
    this.curSquare.square.piece = this;
    this.#position = { x: square.xCor, y: square.yCor };
  }
  getName() {
    return this.type;
  }

  getAvailbleSquaresPiece(sqauresFourDirections) {
    const availableSquares = [];
    sqauresFourDirections.forEach((dimension) => {
      // console.log(dimension);
      for (const square of dimension) {
        if (!square.isOccupied) {
          // availableSquares.push(square)
          availableSquares.push(square);
        } else {
          // console.log(this);
          if (!square.pieceOccupyingName.startsWith(`${this.color}`)) {
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
      square.pieceOccupyingName.endsWith("king")
    );
  }
  canGoTo(square, availableSquares) {
    return availableSquares.includes(square);
  }
}

export { Piece };
