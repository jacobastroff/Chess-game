import { Piece } from "./piece.js";
class Bishop extends Piece {
  constructor(color, side) {
    super(color);
    this.image = `./Assets/${this.color}-bishop.svg`;
    this.type = "bishop";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color == "white") {
      if (this.side == "right") x = 5;
      else x = 2;
      return [0, x];
    } else {
      if (this.side == "right") x = 5;
      else x = 2;
      return [7, x];
    }
  }
  getAvailableSquares(
    chessboard,
    squareToBeIgnored = undefined,
    isPinned = undefined,
    piecePinning = undefined
  ) {
    const allSquares = chessboard.getSquares().flat();
    const allSquaresByLeftRight = new Array(2).fill([[], []]);
    // console.log(allSquaresByLeftRight);
    for (const [i, upDown] of allSquaresByLeftRight.entries()) {
      // console.log(upDown);
      if (i === 0) {
        let counter = 0;
        for (let row = this.curSquare.row + 1; row <= 8; row++) {
          upDown[0].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column + counter + 1
            )
          );
          upDown[1].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column - counter - 1
            )
          );
          counter++;
        }
      } else {
        // console.log(upDown[1]);

        let counter = 0;
        for (let row = this.curSquare.row - 1; row >= 1; row--) {
          upDown[0].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column + counter + 1
            )
          );
          upDown[1].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column - counter - 1
            )
          );
          counter++;
        }
      }
    }
    const allSquaresByDirection = [...new Set(allSquaresByLeftRight.flat())];
    // console.log(allSquaresByDirection);
    const allSquaresByFourDirections = [
      allSquaresByDirection[0].filter(
        (square) => square?.row > this.curSquare?.row
      ),
      allSquaresByDirection[0].filter(
        (square) => square?.row < this.curSquare?.row
      ),
      allSquaresByDirection[1].filter(
        (square) => square?.row > this.curSquare?.row
      ),
      allSquaresByDirection[1].filter(
        (square) => square?.row < this.curSquare?.row
      ),
    ];
    // console.log(allSquaresByFourDirections);
    // console.log(this, allSquaresByDirection[3]);
    if (
      !isPinned ||
      piecePinning.curSquare.column === this.curSquare.column ||
      piecePinning.curSquare.row === this.curSquare.row
    ) {
      return this.getAvailbleSquaresPiece(
        allSquaresByFourDirections,
        squareToBeIgnored
      );
    } else {
      if (
        piecePinning.curSquare.column > this.curSquare.column &&
        piecePinning.curSquare.row > this.curSquare.row
      ) {
        return allSquaresByFourDirections.find((direction) =>
          direction.every(
            (square) =>
              square.column < piecePinning.curSquare.column &&
              square.row < piecePinning.curSquare.row
          )
        );
      }
      if (
        piecePinning.curSquare.column < this.curSquare.column &&
        piecePinning.curSquare.row < this.curSquare.row
      ) {
        return allSquaresByFourDirections.find((direction) =>
          direction.every(
            (square) =>
              square.column > piecePinning.curSquare.column &&
              square.row > piecePinning.curSquare.row
          )
        );
      }
      if (
        piecePinning.curSquare.column > this.curSquare.column &&
        piecePinning.curSquare.row < this.curSquare.row
      ) {
        return allSquaresByFourDirections.find((direction) =>
          direction.every(
            (square) =>
              square.column < piecePinning.curSquare.column &&
              square.row > piecePinning.curSquare.row
          )
        );
      }
      if (
        piecePinning.curSquare.column < this.curSquare.column &&
        piecePinning.curSquare.row > this.curSquare.row
      ) {
        return allSquaresByFourDirections.find((direction) =>
          direction.every(
            (square) =>
              square.column > piecePinning.curSquare.column &&
              square.row < piecePinning.curSquare.row
          )
        );
      }
    }
  }
  getLineToKingSquares(chessboard) {
    const king = this.getOpposingPieces(chessboard).find(
      (piece) => piece.type === "king"
    );
    if (
      king.curSquare.column < this.curSquare.column &&
      king.curSquare.row < this.curSquare.row
    ) {
      return this.getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.column < this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .concat([this.curSquare.square]);
    }
    if (
      king.curSquare.column > this.curSquare.column &&
      king.curSquare.row > this.curSquare.row
    ) {
      return this.getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.column > this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .concat([this.curSquare.square]);
    }
    if (
      king.curSquare.column > this.curSquare.column &&
      king.curSquare.row < this.curSquare.row
    ) {
      return this.getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.column > this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .concat([this.curSquare.square]);
    }
    if (
      king.curSquare.column < this.curSquare.column &&
      king.curSquare.row > this.curSquare.row
    ) {
      return this.getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.column < this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .concat([this.curSquare.square]);
    }
  }
}
export default Bishop;
