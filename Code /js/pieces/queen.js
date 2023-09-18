import Piece from "./piece.js";
class Queen extends Piece {
  constructor(color) {
    super(color);
    this.image = `./Assets/${this.color}-queen.svg`;
    this.type = "queen";
  }
  get startingCoord() {
    if (this.color === "black") return [7, 3];
    else return [0, 3];
  }
}
export default Queen;
