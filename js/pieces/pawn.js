import { Piece } from "./piece.js";
class Pawn extends Piece {
  firstMove = true;
  en_passant_status = false;
  constructor(color, startingCoordX) {
    super(color);
    this.image = `./Assets/${this.color}-pawn.svg`;
    this.type = "pawn";
    this.startingCoordX = startingCoordX;
  }
  get startingCoord() {
    if (this.color === "black") return [6, this.startingCoordX];
    else return [1, this.startingCoordX];
  }
  getAvailableSquares(chessboard) {
    const allSquares = chessboard.getSquares().flat();
    const allAvailableSquares = [];
    const upOrDown = this.color === "white" ? 1 : -1;
    const nextSquare = allSquares.find(
      (square) =>
        square.column === this.curSquare.column &&
        square.row === this.curSquare.row + 1 * upOrDown
    );
    const nextNextSquare = allSquares.find(
      (square) =>
        square.column === this.curSquare.column &&
        square.row === this.curSquare.row + 2 * upOrDown
    );
    const diagonals = [
      allSquares.find(
        (square) =>
          square.column === this.curSquare.column + 1 &&
          square.row === this.curSquare.row + 1 * upOrDown
      ),
      allSquares.find(
        (square) =>
          square.column === this.curSquare.column - 1 &&
          square.row === this.curSquare.row + 1 * upOrDown
      ),
    ];
    if (!nextSquare.isOccupied) {
      allAvailableSquares.push(nextSquare);
    }
    if (this.firstMove && !nextNextSquare?.isOccupied) {
      allAvailableSquares.push(nextNextSquare);
    }
    diagonals.forEach((square) => {
      if (
        square?.isOccupied &&
        !square?.pieceOccupying.startsWith(this.color)
      ) {
        allAvailableSquares.push(square);
      }
    });
    return allAvailableSquares;
  }
}
export default Pawn;
