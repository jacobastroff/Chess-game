import { Piece } from "./piece.js";
class Knight extends Piece {
  constructor(color, side) {
    super(color);
    this.image = `./Assets/${this.color}-knight.svg`;
    this.type = "knight";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color == "white") {
      if (this.side == "right") x = 6;
      else x = 1;
      return [0, x];
    } else {
      if (this.side == "right") x = 6;
      else x = 1;
      return [7, x];
    }
  }
  getAvailableSquares(
    chessboard,
    squareToBeIgnored = undefined,
    isPinned = undefined,
    isCheckingLineOfSightKing = undefined
  ) {
    const allSquares = chessboard.getSquares().flat();
    const allPotentialSqaures = [];
    for (let i = -1; i <= 1; i += 2) {
      // console.log(i);
      allPotentialSqaures.push(
        allSquares.find(
          (square) =>
            square.row === this.curSquare.row + i &&
            square.column === this.curSquare.column - 2
        )
      );
      allPotentialSqaures.push(
        allSquares.find(
          (square) =>
            square.row === this.curSquare.row + i &&
            square.column === this.curSquare.column + 2
        )
      );
      allPotentialSqaures.push(
        allSquares.find(
          (square) =>
            square.row === this.curSquare.row + i * 2 &&
            square.column === this.curSquare.column + 1
        )
      );
      allPotentialSqaures.push(
        allSquares.find(
          (square) =>
            square.row === this.curSquare.row + i * 2 &&
            square.column === this.curSquare.column - 1
        )
      );
    }
    const allRealSquares = [...new Set(allPotentialSqaures)];
    // console.log(allPotentialSqaures);
    // console.log(allRealSquares);
    //  allRealSquares.splice(allRealSquares.indexOf("N/A"));
    // console.log(allRealSquares);

    const allAvailableSquares = allRealSquares
      .filter((square) => square)
      .map((square) => [square]);
    // console.log(allAvailableSquares);
    if (!isPinned) {
      return this.getAvailbleSquaresPiece(
        allAvailableSquares,
        squareToBeIgnored,
        isCheckingLineOfSightKing
      );
    } else {
      return [];
    }
  }
  getLineToKingSquares() {
    return [this.curSquare.square];
  }
}
export default Knight;
