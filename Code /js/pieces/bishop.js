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
}
export default Bishop;
