import Piece from "./piece.js";
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
}
export default Knight;
