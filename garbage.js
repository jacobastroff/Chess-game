allAvailableSquares.forEach((square) => {
  const curPawnSquare = Object.assign(this.curSquare);
  console.log(curPawnSquare);
  this?.pretendToMoveTo(square, chessboard);
  if (
    this.getSameColorPieces(chessboard)
      .find((piece, i) => piece.type === "king")
      ?.isInCheck(chessboard)
  ) {
    allAvailableSquares.splice(i, 1);
  }
  this.pretendToMoveTo(curPawnSquare.square, chessboard);
});
////
const curKingSquare = Object.assign(this.curSquare);
console.log(curKingSquare);
this?.pretendToMoveTo(specificSquare, chessboard);
console.log(specificSquare);
const checkedStatus = this.getOpposingPieces(chessboard)
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
      ),
      chessboard
    )
  );
this.pretendToMoveTo(curKingSquare.square, chessboard);
console.log(curKingSquare);
return checkedStatus;
