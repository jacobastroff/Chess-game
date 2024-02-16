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
    // console.log(this.pieceChecking(chessboard));
    const rooks = this.getSameColorPieces(chessboard).filter(
      (piece) => piece.type === "rook"
    );
    rooks.forEach(
      function (rook) {
        // console.log(this);
        if (this?.canCastle(rook, chessboard)) {
          // console.log(`THIS IS ${this}`);
          const leftOrRightMultiplier = rook.curSquare.column === 8 ? 2 : -2;
          console.log("Success");
          squaresWithCheck.push(
            allSquares.find(
              (square) =>
                square.column ===
                  this.curSquare.column + 1 * leftOrRightMultiplier &&
                square.row === (this.color === "white" ? 1 : 8)
            )
          );
        } else {
          console.log("Fail");
        }
      }.bind(this)
    );
    // console.log(squaresWithCheck);
    return squaresWithCheck;
  }
  isInCheck(chessboard, specificSquare = undefined) {
    // console.log(this.getOpposingPieces(chessboard));
    if (!specificSquare) {
      // console.log(this.getOpposingPieces(chessboard));
      return this.getOpposingPieces(chessboard)
        .filter((piece) => piece.type !== "king")
        .some((piece) => {
          // console.log(piece);
          return piece.isCheckingKing(piece.getAvailableSquares(chessboard));
        });
    } else {
      return (
        this.getOpposingPieces(chessboard)
          .filter((piece) => piece.type !== "king" && piece.type !== "pawn")
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
          ) ||
        this.getOpposingPieces(chessboard)
          .filter((piece) => piece.type === "pawn")
          .some((pawn) =>
            pawn.canGoTo(
              specificSquare,
              pawn.getAvailableSquares(
                chessboard,
                true,
                undefined,
                undefined,
                true
              )
            )
          )
      );
    }
  }
  canCastle(rook, chessboard) {
    const leftRight =
      rook.curSquare.column > this.curSquare.column ? "right" : "left";
    let squaresAvailable;
    const neededAvailbleSquares = 2;
    // console.log(rook.getAvailableSquares(chessboard), this.curSquare.column);
    if (leftRight === "right") {
      squaresAvailable = rook
        .getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.row === (this.color === "white" ? 1 : 8) &&
            square.column > this.curSquare.column
        );
    }
    if (leftRight === "left") {
      squaresAvailable = rook
        .getAvailableSquares(chessboard)
        .filter(
          (square) =>
            square.row === (this.color === "white" ? 1 : 8) &&
            (square.column === 4 || square.column === 3)
        );
    }
    // console.log(squaresAvailable, neededAvailbleSquares);
    if (squaresAvailable.length >= neededAvailbleSquares) {
      if (this.isInCheck(chessboard)) return false;
      console.log("King is not in check");
      if (
        squaresAvailable.some((square) => this.isInCheck(chessboard, square))
      ) {
        console.log("Square is in check");
        return false;
      }
      console.log("Square is not in check");
      if (!rook.firstMove || !this.firstMove) return false;
      console.log("King and rook first move");
      return true;
    } else {
      console.log("****");
      return false;
    }
  }
  castle(rook, chessboard) {
    if (this.color === "white") {
      const leftRight =
        rook.curSquare.column > this.curSquare.column ? "right" : "left";
      const castlingRow = this.color === "white" ? 0 : 7;
      if (leftRight === "right") {
        this.moveTo(chessboard.getSquares()[castlingRow][6], chessboard);
        rook.moveTo(chessboard.getSquares()[castlingRow][5], chessboard);
      } else {
        this.moveTo(chessboard.getSquares()[castlingRow][2], chessboard);
        rook.moveTo(chessboard.getSquares()[castlingRow][3], chessboard);
      }
    }
  }
  isBehindPinnedPiece(piece, chessboard) {
    const column = piece.curSquare.column;
    const piecesMinusPinned = [...this.getSameColorPieces(chessboard)];
    piecesMinusPinned.splice(piecesMinusPinned.indexOf(piece), 1);
    // console.log(piecesMinusPinned);
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
        (piece.type === "pawn"
          ? opposingPiece.curSquare.column !== column
          : true)
      );
    });
  }
  piecePinning(piece, chessboard) {
    const column = piece.curSquare.column;
    const piecesMinusPinned = [...this.getSameColorPieces(chessboard)];
    piecesMinusPinned.splice(piecesMinusPinned.indexOf(piece), 1);
    // console.log(piecesMinusPinned);
    return this.getOpposingPieces(chessboard)
      .filter((piece) => piece.type !== "king" && piece.type !== "pawn")
      .find(
        (opposingPiece) =>
          opposingPiece.canGoTo(
            piece.curSquare.square,
            opposingPiece.getAvailableSquares(chessboard)
          ) &&
          opposingPiece.isCheckingKing(
            opposingPiece.getAvailableSquares(
              chessboard,
              piece.curSquare.square
            )
          ) &&
          !opposingPiece.isCheckingKing(
            opposingPiece.getAvailableSquares(chessboard)
          )
      );
  }
  hasBeenCheckmated(chessboard) {
    // if (this.isInCheck(chessboard)) {
    //   if (this.getAvailableSquares(chessboard).length === 0) {
    //     if (
    //       this.getOpposingPieces(chessboard)
    //         .filter((piece) => piece.type !== "king")
    //         .filter((piece) =>
    //           piece.isCheckingKing(piece.getAvailableSquares(chessboard))
    //         ).length === 1
    //     ) {
    //       let pieceCanGoThere = false;
    //       this.getOpposingPieces(chessboard)
    //         .find((piece) =>
    //           piece.isCheckingKing(piece.getAvailableSquares(chessboard))
    //         )
    //         .getLineToKingSquares(chessboard)
    //         .forEach((square) => {
    //           if (
    //             this.getSameColorPieces(chessboard).some((piece) =>
    //               piece.canGoTo(square, piece.getAvailableSquares(chessboard))
    //             )
    //           ) {
    //             pieceCanGoThere = true;
    //           }
    //         });
    //       if (pieceCanGoThere) {
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     } else {
    //       return true;
    //     }
    //   }
    // }
    // return false;
    return !this.getSameColorPieces(chessboard).some(
      (piece) =>
        piece.filterOutDisabledSquares(
          piece.getAvailableSquares(chessboard),
          chessboard
        ).length > 0
    );
  }
  pieceChecking(chessboard) {
    // console.log(this.getOpposingPieces());
    return this.getOpposingPieces().filter((piece) =>
      piece.isCheckingKing(piece.getAvailableSquares(chessboard))
    );
  }
  hasDrawOccured(chessboard) {
    if (
      !this.getSameColorPieces(chessboard).some(
        (piece) =>
          piece.filterOutDisabledSquares(
            piece.getAvailableSquares(chessboard),
            chessboard
          ).length > 0
      ) &&
      !this.isInCheck(chessboard)
    ) {
      return true;
    } else if (
      !this.getSameColorPieces(chessboard)
        .find((piece) => piece.type === "king")
        .hasSufficientMaterial(chessboard) &&
      !this.getOpposingPieces(chessboard)
        .find((piece) => piece.type === "king")
        .hasSufficientMaterial(chessboard)
    ) {
      return true;
    } else {
      return false;
    }
  }
  hasSufficientMaterial(chessboard) {
    console.log(this.getSameColorPieces(chessboard));
    return (
      this.getSameColorPieces(chessboard).some(
        (piece) =>
          piece.type === "queen" ||
          piece.type === "rook" ||
          piece.type === "pawn"
      ) ||
      this.getSameColorPieces(chessboard).filter(
        (piece) => piece.type === "bishop"
      ).length > 1 ||
      (this.getSameColorPieces(chessboard).find(
        (piece) => piece.type === "bishop"
      ) &&
        this.getSameColorPieces(chessboard).filter(
          (piece) => piece.type === "knight"
        ).length > 1)
    );
  }
}

export default King;
