import { Piece } from "./piece.js";
class King extends Piece {
  canCastle = false;
  constructor(color) {
    super(color);
    this.image = `./Assets/${this.color}-king.svg`;
    this.type = "king";
  }
  get startingCoord() {
    if (this.color === "black") return [7, 4];
    else return [0, 4];
  }
  getOpposingPieces(chessboard) {
    return chessboard
      .getSquares()
      .flat()
      .filter(
        (square) =>
          square.isOccupied &&
          !square.pieceOccupyingName?.startsWith(this.color)
      )
      .map((square) => square.piece);
  }
  getAvailableSquares(chessboard) {
    const allSquares = chessboard.getSquares().flat();
    const potentialSquares = allSquares.filter(
      (square) =>
        Math.abs(this.curSquare.column - square.column) <= 1 &&
        Math.abs(this.curSquare.row - square.row) <= 1 &&
        !(
          this.curSquare.row === square.row &&
          this.curSquare.column === square.column
        )
    );
    const squaresWithoutCheck = this.getAvailbleSquaresPiece(
      potentialSquares.map((square) => [square])
    );

    return squaresWithoutCheck;
  }
  isInCheck(chessboard, specificSquare = undefined) {
    if (!specificSquare) {
      // console.log(this.getOpposingPieces(chessboard));
      return this.getOpposingPieces(chessboard).some((piece) => {
        // console.log(piece);
        piece.isCheckingKing(piece.getAvailableSquares(chessboard));
      });
    } else {
      return this.getOpposingPieces(chessboard).some((piece) =>
        piece.canGoTo(specificSquare, piece.getAvailableSquares(chessboard))
      );
    }
  }
}
export default King;
