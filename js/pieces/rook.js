import { Piece } from "./piece.js";
class Rook extends Piece {
  #startingCoord = { x: "", y: "" };
  // canCastle = false;

  firstMove = true;
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
  getAvailableSquares(chessboard, squareToBeIgnored = undefined) {
    const allSquares = chessboard.getSquares().flat();
    const allSquaresByDirection = [
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
    // console.log(this, allSquaresByDirection[3]);

    return this.getAvailbleSquaresPiece(
      allSquaresByDirection,
      squareToBeIgnored
    );
  }
  getLineToKingSquares(chessboard) {
    const king = this.getOpposingPieces(chessboard).find(
      (piece) => piece.type === "king"
    );
    if (king.curSquare.column > this.curSquare.column)
      return this.getAvailableSquares(chessboard)
        .filter((square) => square.column > this.curSquare.column)
        .concat([this.curSquare.square]);
    if (king.curSquare.column < this.curSquare.column)
      return this.getAvailableSquares(chessboard)
        .filter((square) => square.column < this.curSquare.column)
        .concat([this.curSquare.square]);
    if (king.curSquare.row > this.curSquare.row)
      return this.getAvailableSquares(chessboard)
        .filter((square) => square.row > this.curSquare.row)
        .concat([this.curSquare.square]);
    if (king.curSquare.row < this.curSquare.row)
      return this.getAvailableSquares(chessboard)
        .filter((square) => square.row < this.curSquare.row)
        .concat([this.curSquare.square]);
  }
}
export default Rook;
