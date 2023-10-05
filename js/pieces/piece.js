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
      if (this.type === "king" || this.type === "rook") {
        this.firstMove = false;
        this.canCastle = false;
      }
      if (square?.isOccupied) {
        square?.piece?.delete(square?.piece?.getSameColorPieces(chessboard));
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

  getAvailbleSquaresPiece(
    sqauresFourDirections,
    squareToBeIgnored = undefined,
    isCheckingLineOfSightKing = undefined
  ) {
    const availableSquares = [];
    sqauresFourDirections.forEach((dimension) => {
      // console.log(dimension);
      for (const square of dimension) {
        if (!square.isOccupied) {
          // availableSquares.push(square)
          availableSquares.push(square);
        } else if (square === squareToBeIgnored) {
          availableSquares.push(square);
        } else {
          // console.log(this);
          if (
            !square.pieceOccupyingName.startsWith(`${this.color}`) ||
            isCheckingLineOfSightKing
          ) {
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

  getOpposingPieces(chessboard) {
    return chessboard
      .getSquares()
      .flat()
      .filter(
        (square) =>
          square.isOccupied &&
          !square.pieceOccupyingName?.startsWith(this.color)
      )
      .map((square) => square.piece);
  }
  getSameColorPieces(chessboard) {
    return chessboard
      .getSquares()
      .flat()
      .filter(
        (square) =>
          square.isOccupied && square.pieceOccupyingName?.startsWith(this.color)
      )
      .map((square) => square.piece);
  }
  delete(group) {
    group.splice(group.indexOf(this), 1);
    this.#el.style.display = "none";
  }
}

export { Piece };
