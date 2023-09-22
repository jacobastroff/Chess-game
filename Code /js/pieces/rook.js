import Piece from "./piece.js";
class Rook extends Piece {
  #startingCoord = { x: "", y: "" };
  constructor(color, side) {
    super(color);
    this.image = `./Assets/${this.color}-rook.svg`;
    this.type = "rook";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color === "white") {
      if (this.side === "right") x = 7;
      else x = 0;
      return [0, x];
    } else {
      if (this.side === "right") x = 7;
      else x = 0;
      return [7, x];
    }
  }
  getAvailableSquares(chessboard) {
    const allSquaresByDirection = [
      chessboard
        .getSquares()
        .flat()
        .filter(
          (square) =>
            square.column === this.curSquare.column &&
            square.row < this.curSquare.row
        )
        .sort((a, b) => b.row - a.row),
      chessboard
        .getSquares()
        .flat()
        .filter(
          (square) =>
            square.column === this.curSquare.column &&
            square.row > this.curSquare.row
        )
        .sort((a, b) => a.row - b.row),
      chessboard
        .getSquares()
        .flat()
        .filter(
          (square) =>
            square.row === this.curSquare.row &&
            square.column < this.curSquare.column
        )
        .sort((a, b) => b.column - a.column),
      chessboard
        .getSquares()
        .flat()
        .filter(
          (square) =>
            square.row === this.curSquare.row &&
            square.column > this.curSquare.column
        )
        .sort((a, b) => a.row - b.row),
    ];
    // console.log(this, allSquaresByDirection[3]);

    const availableSquares = [];
    allSquaresByDirection.forEach((dimension) => {
      console.log(dimension);
      for (const square of dimension) {
        if (!square.isOccupied) {
          // availableSquares.push(square)
          availableSquares.push(square.element);
        } else {
          // console.log(this);
          if (!square.pieceOccupying.startsWith(`${this.color}`)) {
            availableSquares.push(square.element);
          }
          break;
        }
      }
    });
    return availableSquares;
  }
}
export default Rook;
