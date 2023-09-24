import { Piece } from "./piece.js";
class Pawn extends Piece {
  constructor(color, startingCoordX) {
    super(color);
    this.image = `./Assets/${this.color}-pawn.svg`;
    this.type = "pawn";
    this.startingCoordX = startingCoordX;
  }
  get startingCoord() {
    if (this.color === "black") return [6, this.startingCoordX];
    else return [1, this.startingCoordX];
  }
}
export default Pawn;
