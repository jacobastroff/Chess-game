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
    if (this.color == "white") {
      if (this.side == "right") x = 7;
      else x = 0;
      return [0, x];
    } else {
      if (this.side == "right") x = 7;
      else x = 0;
      return [7, x];
    }
  }
  getAvailableSquares(chessboard) {
    return chessboard
      .getSquares()
      .flat()
      .filter(
        (square) =>
          (square.column === this.curSquare.column &&
            square.row !== this.curSquare.row) ||
          (square.row === this.curSquare.row &&
            square.column !== this.curSquare.column)
      )
      .map((square) => square.element);
  }
}
export default Rook;
