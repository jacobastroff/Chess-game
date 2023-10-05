import { Piece } from "./piece.js";
class King extends Piece {
  // canCastle = false;
  firstMove = true;
  constructor(color) {
    super(color);
    this.image = `./Assets/${this.color}-king.svg`;
    this.type = "king";
  }
  get startingCoord() {
    if (this.color === "black") return [7, 4];
    else return [0, 4];
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
    const squaresWithCheck = squaresWithoutCheck.filter(
      (square) => !this.isInCheck(chessboard, square)
    );
    return squaresWithCheck;
  }
  isInCheck(chessboard, specificSquare = undefined) {
    console.log(this.getOpposingPieces(chessboard));
    if (!specificSquare) {
      // console.log(this.getOpposingPieces(chessboard));
      return this.getOpposingPieces(chessboard)
        .filter((piece) => piece.type !== "king")
        .some((piece) => {
          console.log(piece);
          return piece.isCheckingKing(piece.getAvailableSquares(chessboard));
        });
    } else {
      return this.getOpposingPieces(chessboard)
        .filter((piece) => piece.type !== "king")
        .some((piece) =>
          piece.canGoTo(
            specificSquare,
            piece.getAvailableSquares(
              chessboard,
              undefined,
              undefined,
              undefined,
              true
            )
          )
        );
    }
  }
  canCastle(rook, chessboard) {
    const leftRight =
      rook.curSquare.column > this.curSquare.column ? "right" : "left";
    let squaresAvailable;
    let neededAvailbleSquares;
    console.log(rook.getAvailableSquares(chessboard), this.curSquare.column);
    if (leftRight === "right") {
      squaresAvailable = rook
        .getAvailableSquares(chessboard)
        .filter(
          (square) => square.row === 1 && square.column > this.curSquare.column
        );

      neededAvailbleSquares = 2;
    }
    if (leftRight === "left") {
      squaresAvailable = rook
        .getAvailableSquares(chessboard)
        .filter(
          (square) => square.row === 1 && square.column < this.curSquare.column
        );
      neededAvailbleSquares = 3;
    }
    console.log(squaresAvailable, neededAvailbleSquares);
    if (squaresAvailable.length >= neededAvailbleSquares) {
      if (this.isInCheck(chessboard)) return false;
      if (
        squaresAvailable.some((square) => this.isInCheck(chessboard, square))
      ) {
        return false;
      }
      if (!rook.firstMove || !this.firstMove) return false;
      return true;
    } else {
      return false;
    }
  }
  castle(rook, chessboard) {
    const leftRight =
      rook.curSquare.column > this.curSquare.column ? "right" : "left";
    if (leftRight === "right") {
      this.moveTo(chessboard.getSquares()[0][6]);
      rook.moveTo(chessboard.getSquares()[0][5]);
    } else {
      this.moveTo(chessboard.getSquares()[0][2]);
      rook.moveTo(chessboard.getSquares()[0][3]);
    }
  }
  isBehindPinnedPiece(piece, chessboard) {
    const column = piece.curSquare.column;
    const piecesMinusPinned = [...this.getSameColorPieces(chessboard)];
    piecesMinusPinned.splice(piecesMinusPinned.indexOf(piece), 1);
    console.log(piecesMinusPinned);
    return this.getOpposingPieces(chessboard).some((opposingPiece) => {
      return (
        opposingPiece.canGoTo(
          piece.curSquare.square,
          opposingPiece.getAvailableSquares(chessboard)
        ) &&
        opposingPiece.isCheckingKing(
          opposingPiece.getAvailableSquares(chessboard, piece.curSquare.square)
        ) &&
        !opposingPiece.isCheckingKing(
          opposingPiece.getAvailableSquares(chessboard)
        ) &&
        !(opposingPiece.curSquare.column !== column && piece.type === "pawn")
      );
    });
  }
  piecePinning(piece, chessboard) {
    const column = piece.curSquare.column;
    const piecesMinusPinned = [...this.getSameColorPieces(chessboard)];
    piecesMinusPinned.splice(piecesMinusPinned.indexOf(piece), 1);
    console.log(piecesMinusPinned);
    return this.getOpposingPieces(chessboard).find(
      (opposingPiece) =>
        opposingPiece.canGoTo(
          piece.curSquare.square,
          opposingPiece.getAvailableSquares(chessboard)
        ) &&
        opposingPiece.isCheckingKing(
          opposingPiece.getAvailableSquares(chessboard, piece.curSquare.square)
        ) &&
        !opposingPiece.isCheckingKing(
          opposingPiece.getAvailableSquares(chessboard)
        ) &&
        !(opposingPiece.curSquare.column !== column && piece.type === "pawn")
    );
  }
  hasBeenCheckmated(chessboard) {
    if (this.isInCheck(chessboard)) {
      if (this.getAvailableSquares(chessboard).length === 0) {
        if (
          this.getOpposingPieces(chessboard)
            .filter((piece) => piece.type !== "king")
            .filter((piece) =>
              piece.isCheckingKing(piece.getAvailableSquares(chessboard))
            ).length === 1
        ) {
          let pieceCanGoThere = false;
          this.getOpposingPieces(chessboard)
            .find((piece) =>
              piece.isCheckingKing(piece.getAvailableSquares(chessboard))
            )
            .getLineToKingSquares(chessboard)
            .forEach((square) => {
              if (
                this.getSameColorPieces(chessboard).some((piece) =>
                  piece.canGoTo(square, piece.getAvailableSquares(chessboard))
                )
              ) {
                pieceCanGoThere = true;
              }
            });
          if (pieceCanGoThere) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    }
    return false;
  }
}

export default King;
