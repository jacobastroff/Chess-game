import Piece from "./piece.js";
class Bishop extends Piece {
  constructor(color, side) {
    super(color);
    this.image = `./Assets/${this.color}-bishop.svg`;
    this.type = "bishop";
    this.side = side;
  }
  get startingCoord() {
    let x;
    if (this.color == "white") {
      if (this.side == "right") x = 5;
      else x = 2;
      return [0, x];
    } else {
      if (this.side == "right") x = 5;
      else x = 2;
      return [7, x];
    }
  }
  getAvailableSquares(chessboard) {
    const allSquares = chessboard.getSquares().flat();
    const allSquaresByLeftRight = new Array(2).fill([[], []]);
    console.log(allSquaresByLeftRight);
    for (const [i, upDown] of allSquaresByLeftRight.entries()) {
      console.log(upDown);
      if (i === 0) {
        let counter = 0;
        for (let row = this.curSquare.row + 1; row <= 8; row++) {
          upDown[0].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column + counter + 1
            )
          );
          upDown[1].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column - counter - 1
            )
          );
          counter++;
        }
      } else {
        console.log(upDown[1]);

        let counter = 0;
        for (let row = this.curSquare.row - 1; row >= 1; row--) {
          upDown[0].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column + counter + 1
            )
          );
          upDown[1].push(
            allSquares.find(
              (square) =>
                square.row === row &&
                square.column === this.curSquare.column - counter - 1
            )
          );
          counter++;
        }
      }
    }
    const allSquaresByDirection = [...new Set(allSquaresByLeftRight.flat())];
    console.log(allSquaresByDirection);
    const allSquaresByFourDirections = [
      allSquaresByDirection[0].filter(
        (square) => square?.row > this.curSquare?.row
      ),
      allSquaresByDirection[0].filter(
        (square) => square?.row < this.curSquare?.row
      ),
      allSquaresByDirection[1].filter(
        (square) => square?.row > this.curSquare?.row
      ),
      allSquaresByDirection[1].filter(
        (square) => square?.row < this.curSquare?.row
      ),
    ];
    console.log(allSquaresByFourDirections);
    // console.log(this, allSquaresByDirection[3]);

    const availableSquares = [];
    allSquaresByFourDirections.forEach((dimension) => {
      console.log(dimension);
      for (const square of dimension) {
        if (!square.isOccupied) {
          // availableSquares.push(square)
          availableSquares.push(square.element);
        } else {
          // console.log(this);
          if (!square.pieceOccupying.startsWith(`${this.color}`)) {
            availableSquares.push(square.element);
          }
          break;
        }
      }
    });
    return availableSquares.flat();
  }
}
export default Bishop;
