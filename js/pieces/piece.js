"use strict";
import { white_pieces, black_pieces } from "../allPieces.js";
class Piece {
  color;
  #position;
  image;
  type;
  #el;
  disabled = false;
  pretend_disabled_checking_king = false;
  curSquare;
  #parentEl = document.querySelector(".chess-board");
  availableSquares = [];
  constructor(color) {
    this.color = color;
  }
  init(square, chessboard) {
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
    this.moveTo(square, chessboard, true);
  }
  moveTo(square, chessboard, isInit = false, isCastling = false) {
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
      }
      if (square?.isOccupied) {
        square?.piece?.delete(
          square?.piece?.getSameColorPieces(chessboard),
          chessboard
        );
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
    if (this.type === "pawn" && this?.is_enpassaning(chessboard)) {
      console.log(true);
      const en_passant_piece = this?.is_enpassaning(chessboard);
      en_passant_piece.delete(
        en_passant_piece.getSameColorPieces(chessboard),
        chessboard,
        true
      );
    }
    this.getOpposingPieces(chessboard)
      .filter((piece) => piece.type === "pawn")
      .forEach((piece) => (piece.en_passant_status = false));
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
    return (
      !this?.pretend_disabled_checking_king &&
      availableSquares.some((square) =>
        square.pieceOccupyingName.endsWith("king")
      )
    );
  }
  canGoTo(square, availableSquares) {
    return availableSquares.includes(square);
  }

  getOpposingPieces(chessboard) {
    // return chessboard
    //   .getSquares()
    //   .flat()
    //   .filter(
    //     (square) =>
    //       square.isOccupied &&
    //       !square.pieceOccupyingName?.startsWith(this.color)
    //   )
    //   .map((square) => square.piece);
    return this.color === "white" ? black_pieces : white_pieces;
  }
  getSameColorPieces(chessboard) {
    // return chessboard
    //   .getSquares()
    //   .flat()
    //   .filter(
    //     (square) =>
    //       square.isOccupied && square.pieceOccupyingName?.startsWith(this.color)
    //   )
    //   .map((square) => square.piece);
    return this.color === "black" ? black_pieces : white_pieces;
  }
  delete(group, chessboard, hasBeenEnpassant) {
    group.splice(group.indexOf(this), 1);
    if (hasBeenEnpassant) {
      this.curSquare.square.isOccupied = false;
      this.curSquare.square.pieceOccupying = undefined;
      this.curSquare.square.pieceOccupyingName = "";
    }
    this.getAvailableSquares(chessboard).forEach((square) =>
      square.element.classList.remove("potential-square")
    );
    this.#el.style.display = "none";
    chessboard
      .getSquares()
      .flat()
      .find((square) => square.piece === this).piece = "";
  }
  pretendToMoveTo(square, chessboard) {
    // if (!square.isOccupied) {
    this.curSquare.square.isOccupied = false;
    this.curSquare.square.pieceOccupyingName = "";
    this.curSquare.square.piece = undefined;
    let pieceOccupying;
    if (square.isOccupied) {
      if (square.piece.color !== this.color) {
        pieceOccupying = this.getOpposingPieces(chessboard).find(
          (piece) => piece.curSquare.square === square
        );
        console.log(pieceOccupying);
        pieceOccupying?.hasOwnProperty("pretend_disabled_checking_king")
          ? (pieceOccupying.pretend_disabled_checking_king = true)
          : null;
        if (
          pieceOccupying
            .getSameColorPieces(chessboard)
            .some((piece) =>
              piece.canGoTo(
                square,
                piece.getAvailableSquares(chessboard, square)
              )
            ) &&
          this.type === "king"
        ) {
          pieceOccupying.pretend_disabled_checking_king = false;
        }

        // }
      }
    }
    this.curSquare = {
      row: square.row,
      column: square.column,
      square: square,
    };

    this.curSquare.square.isOccupied = true;
    this.curSquare.square.pieceOccupyingName = `${this.color} ${this.type}`;
    this.curSquare.square.piece = this;
    return pieceOccupying;
  }

  filterOutDisabledSquares(availableSquares, chessboard) {
    const curSquare = this.curSquare.square;
    return availableSquares.filter((square) => {
      const pieceTaken = this.pretendToMoveTo(square, chessboard);
      console.log(this);
      const status1 = !this.getSameColorPieces(chessboard)
        .find((piece) => piece.type === "king")
        .isInCheck(chessboard);
      pieceTaken?.hasOwnProperty("pretend_disabled_checking_king")
        ? (pieceTaken.pretend_disabled_checking_king = false)
        : null;
      const opposingKing = this.getOpposingPieces(chessboard).find(
        (piece) => piece.type === "king"
      );
      const status2 =
        this.type === "king"
          ? !(
              Math.abs(square.column - opposingKing.curSquare.column) <= 1 &&
              Math.abs(square.row - opposingKing.curSquare.row) <= 1
            )
          : true;
      this.pretendToMoveTo(curSquare, chessboard);
      pieceTaken?.pretendToMoveTo(square, chessboard);

      return status1 && status2;
    });
  }
}

export { Piece };
