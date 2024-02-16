import { Piece } from "./piece.js";
class Rook extends Piece {
  #startingCoord = { x: "", y: "" };
  // canCastle = false;

  firstMove = true;
  constructor(color, side = undefined) {
    super(color);
    this.image = `./Assets/${this.color}-rook.svg`;
    this.type = "rook";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color === "white") {
      if (this?.side === "right") x = 7;
      else x = 0;
      return [0, x];
    } else {
      if (this?.side === "right") x = 7;
      else x = 0;
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
    if (!isPinned) {
      return this.getAvailbleSquaresPiece(
        allSquaresByDirection,
        squareToBeIgnored,
        isCheckingLineOfSightKing
      );
    } else if (
      piecePinning?.curSquare.column !== this.curSquare.column &&
      piecePinning.curSquare.row !== this.curSquare.row
    ) {
      return [];
    } else {
      const allAvailableSquares = this.getAvailbleSquaresPiece(
        allSquaresByDirection,
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
        // console.log("HELLO");
        return allAvailableSquares.filter(
          (square) =>
            square.row <= piecePinning?.curSquare.row &&
            square.column === this.curSquare.column
        );
      }
    }
  }
  getLineToKingSquares(chessboard) {
    const king = this.getOpposingPieces(chessboard).find(
      (piece) => piece.type === "king"
    );
    if (king.curSquare.column > this.curSquare.column)
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter((square) => square.column > this.curSquare.column)
        .concat([this.curSquare.square]);
    if (king.curSquare.column < this.curSquare.column)
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter((square) => square.column < this.curSquare.column)
        .concat([this.curSquare.square]);
    if (king.curSquare.row > this.curSquare.row)
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter((square) => square.row > this.curSquare.row)
        .concat([this.curSquare.square]);
    if (king.curSquare.row < this.curSquare.row)
      return this.getAvailableSquares(
        chessboard,
        undefined,
        undefined,
        undefined,
        true
      )
        .filter((square) => square.row < this.curSquare.row)
        .concat([this.curSquare.square]);
  }
}
export default Rook;
