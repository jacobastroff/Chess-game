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
    const allPotentialSquares = [];
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
      allPotentialSquares.push(nextSquare);
    }
    if (this.firstMove && !nextNextSquare?.isOccupied) {
      allPotentialSquares.push(nextNextSquare);
    }
    diagonals.forEach((square) => {
      if (
        square?.isOccupied &&
        !square?.pieceOccupyingName.startsWith(this.color)
      ) {
        allPotentialSquares.push(square);
      }
    });
    const allAvailableSquares = [...new Set(allPotentialSquares)].filter(
      (square) => square
    );
    const en_passant_pieces = allSquares.filter((square) => {
      // console.log(
      //   square.piece?.curSquare?.column - this.curSquare.column,
      //   square
      // );
      return (
        square?.piece?.color !== this.color &&
        square?.piece?.type === "pawn" &&
        Math.abs(square.piece?.curSquare?.column - this.curSquare.column) ===
          1 &&
        square?.piece?.en_passant_status === true
      );
    });
    // console.log(en_passant_pieces);
    for (const en_passant_piece of en_passant_pieces) {
      allAvailableSquares.push(
        allSquares.find(
          (square) =>
            square.row === en_passant_piece.row + 1 * upOrDown &&
            square.column === en_passant_piece.column
        )
      );
      en_passant_piece.piece.en_passant_status = false;
    }
    return allAvailableSquares;
  }
  has_caused_en_passant(squareTo, chessboard) {
    const allSquares = chessboard.getSquares().flat();
    // console.error("Hello");
    // console.log(allSquares.some((square) => square.row === squareTo.row));
    return allSquares.some(
      (square) =>
        square.row === squareTo.row &&
        // Math.abs(squareTo.column - square.column) === 1 &&
        square.isOccupied &&
        !square.pieceOccupyingName.startsWith(`${this.color}`) &&
        square.pieceOccupyingName.endsWith("pawn")
    );
  }
}
export default Pawn;
