import { Piece } from "./piece.js";
class Queen extends Piece {
  constructor(color) {
    super(color);
    this.image = `./Assets/${this.color}-queen.svg`;
    this.type = "queen";
  }
  get startingCoord() {
    if (this.color === "black") return [7, 3];
    else return [0, 3];
  }
  getAvailableSquares(
    chessboard,
    squareToBeIgnored = undefined,
    isPinned = undefined,
    piecePinning = undefined,
    isCheckingLineOfSightKing = undefined
  ) {
    const allSquares = chessboard.getSquares().flat();
    const allSquaresHorizontal = [
      allSquares
        .filter(
          (square) =>
            square.column === this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .sort((a, b) => b.row - a.row),
      allSquares
        .filter(
          (square) =>
            square.column === this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .sort((a, b) => a.row - b.row),
      allSquares
        .filter(
          (square) =>
            square.row === this.curSquare.row &&
            square.column < this.curSquare.column
        )
        .sort((a, b) => b.column - a.column),
      allSquares
        .filter(
          (square) =>
            square.row === this.curSquare.row &&
            square.column > this.curSquare.column
        )
        .sort((a, b) => a.row - b.row),
    ];
    const potentialSquaresDiagonal = new Array(2).fill([[], []]);
    for (const [i, upDown] of potentialSquaresDiagonal.entries()) {
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
    const allSquaresByDirection = [...new Set(potentialSquaresDiagonal.flat())];
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
    const allMoveableSqaures =
      allSquaresByFourDirections.concat(allSquaresHorizontal);
    // console.log(this, allSquaresByDirection[3]);
    // console.log(this, allSquaresByDirection[3]);
    if (!isPinned) {
      return this.getAvailbleSquaresPiece(
        allMoveableSqaures,
        squareToBeIgnored,
        isCheckingLineOfSightKing
      );
    } else {
      if (
        piecePinning.curSquare?.column === this.curSquare.column ||
        piecePinning.curSquare?.row === this.curSquare.row
      ) {
        const allAvailableSquares = this.getAvailbleSquaresPiece(
          allMoveableSqaures,
          squareToBeIgnored,
          isCheckingLineOfSightKing
        );
        if (piecePinning.curSquare.column > this.curSquare.column) {
          return allAvailableSquares.filter(
            (square) =>
              square.column <= piecePinning?.curSquare.column &&
              square.row === this.curSquare.row
          );
        }
        if (piecePinning.curSquare.column < this.curSquare.column) {
          return allAvailableSquares.filter(
            (square) =>
              square.column >= piecePinning?.curSquare.column &&
              square.row === this.curSquare.row
          );
        }
        // .filter((square) => square.column >= piecePinning?.curSquare.column);

        if (piecePinning.curSquare.row < this.curSquare.row) {
          return allAvailableSquares.filter(
            (square) =>
              square.row >= piecePinning?.curSquare.row &&
              square.column === this.curSquare.column
          );
        }
        if (piecePinning.curSquare.row > this.curSquare.row) {
          console.log("HELLO");
          return allAvailableSquares.filter(
            (square) =>
              square.row <= piecePinning?.curSquare.row &&
              square.column === this.curSquare.column
          );
        }
      } else {
        const allAvailableSquaresTwoDirections = [
          this.getAvailbleSquaresPiece(
            allMoveableSqaures,
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
  }
  getLineToKingSquares(chessboard) {
    const king = this.getOpposingPieces(chessboard).find(
      (piece) => piece.type === "king"
    );
    if (
      king.curSquare.column > this.curSquare.column &&
      king.curSquare.row === this.curSquare.row
    )
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
            square.row === this.curSquare.row
        )
        .concat([this.curSquare.square]);
    if (
      king.curSquare.column < this.curSquare.column &&
      king.curSquare.row === this.curSquare.row
    )
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
            square.row === this.curSquare.row
        )
        .concat([this.curSquare.square]);
    if (
      king.curSquare.row > this.curSquare.row &&
      this.curSquare.column === king.curSquare.column
    )
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.row > this.curSquare.row &&
            square.column === this.curSquare.column
        )
        .concat([this.curSquare.square]);
    if (
      king.curSquare.row < this.curSquare.row &&
      this.curSquare.column === king.curSquare.column
    )
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter(
          (square) =>
            square.row < this.curSquare.row &&
            square.column === this.curSquare.column
        )
        .concat([this.curSquare.square]);
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
    }
    if (
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
    }
    if (
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
    }
    if (
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
    }
  }
}
export default Queen;
