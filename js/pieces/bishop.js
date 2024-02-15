import { Piece } from "./piece.js";
class Bishop extends Piece {
  constructor(color, side = undefined) {
    super(color);
    this.image = `./Assets/${this.color}-bishop.svg`;
    this.type = "bishop";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color == "white") {
      if (this?.side == "right") x = 5;
      else x = 2;
      return [0, x];
    } else {
      if (this?.side == "right") x = 5;
      else x = 2;
      return [7, x];
    }
  }
  getAvailableSquares(
    chessboard,
    squareToBeIgnored = undefined,
    isPinned = undefined,
    piecePinning = undefined,
    isCheckingLineOfSightKing = undefined
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
    if (!isPinned) {
      return this.getAvailbleSquaresPiece(
        allSquaresByFourDirections,
        squareToBeIgnored,
        isCheckingLineOfSightKing
      );
    } else if (
      piecePinning.curSquare?.column === this.curSquare.column ||
      piecePinning.curSquare?.row === this.curSquare.row
    ) {
      return [];
    } else {
      const allAvailableSquaresTwoDirections = [
        this.getAvailbleSquaresPiece(
          allSquaresByFourDirections,
          squareToBeIgnored,
          isCheckingLineOfSightKing
        ).filter(
          (square) =>
            (square.row > this.curSquare.row &&
              square.column > this.curSquare.column) ||
            (square.row < this.curSquare.row &&
              square.column < this.curSquare.column)
        ),
        this.getAvailbleSquaresPiece(
          allSquaresByFourDirections,
          squareToBeIgnored,
          isCheckingLineOfSightKing
        ).filter(
          (square) =>
            (square.row > this.curSquare.row &&
              square.column < this.curSquare.column) ||
            (square.row < this.curSquare.row &&
              square.column > this.curSquare.column)
        ),
      ];

      if (
        piecePinning?.curSquare.column > this.curSquare.column &&
        piecePinning?.curSquare.row > this.curSquare.row
      ) {
        return allAvailableSquaresTwoDirections[0]
          .filter(
            (square) =>
              square.column < piecePinning.curSquare.column &&
              square.row < piecePinning.curSquare.row
          )
          .concat([piecePinning.curSquare.square]);
      }
      if (
        piecePinning.curSquare.column < this.curSquare.column &&
        piecePinning.curSquare.row < this.curSquare.row
      ) {
        return allAvailableSquaresTwoDirections[0]
          .filter(
            (square) =>
              square.column > piecePinning.curSquare.column &&
              square.row > piecePinning.curSquare.row
          )
          .concat([piecePinning.curSquare.square]);
      }
      if (
        piecePinning.curSquare.column > this.curSquare.column &&
        piecePinning.curSquare.row < this.curSquare.row
      ) {
        return allAvailableSquaresTwoDirections[1]
          .filter(
            (square) =>
              square.column < piecePinning.curSquare.column &&
              square.row > piecePinning.curSquare.row
          )
          .concat([piecePinning.curSquare.square]);
      }
      if (
        piecePinning.curSquare.column < this.curSquare.column &&
        piecePinning.curSquare.row > this.curSquare.row
      ) {
        return allAvailableSquaresTwoDirections[1]
          .filter(
            (square) =>
              square.column > piecePinning.curSquare.column &&
              square.row < piecePinning.curSquare.row
          )
          .concat([piecePinning.curSquare.square]);
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
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.column < this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .concat([this.curSquare.square]);
    } else if (
      king.curSquare.column > this.curSquare.column &&
      king.curSquare.row > this.curSquare.row
    ) {
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.column > this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .concat([this.curSquare.square]);
    } else if (
      king.curSquare.column > this.curSquare.column &&
      king.curSquare.row < this.curSquare.row
    ) {
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.column > this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .concat([this.curSquare.square]);
    } else if (
      king.curSquare.column < this.curSquare.column &&
      king.curSquare.row > this.curSquare.row
    ) {
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.column < this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .concat([this.curSquare.square]);
    } else {
      return [];
    }
  }
}
export default Bishop;
