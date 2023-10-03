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
  getAvailableSquares(chessboard) {
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

    return this.getAvailbleSquaresPiece(allMoveableSqaures);
  }
}
export default Queen;
