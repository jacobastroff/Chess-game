import { Piece } from "./piece.js";
class King extends Piece {
  constructor(color) {
    super(color);
    this.image = `./Assets/${this.color}-king.svg`;
    this.type = "king";
  }
  get startingCoord() {
    if (this.color === "black") return [7, 4];
    else return [0, 4];
  }
}
export default King;
