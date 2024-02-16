import Rook from "./pieces/rook.js";
import Knight from "./pieces/knight.js";
import Bishop from "./pieces/bishop.js";
import Queen from "./pieces/queen.js";
import King from "./pieces/king.js";
import Pawn from "./pieces/pawn.js";
const black_pieces = [
  new Rook("black", "left"),
  new Rook("black", "right"),
  new Knight("black", "left"),
  new Knight("black", "right"),
  new Bishop("black", "right"),
  new Bishop("black", "left"),
  new Queen("black"),
  new King("black"),
  ...Array.from(new Array(8), (_, i) => new Pawn("black", i)),
];
const white_pieces = [
  new Rook("white", "left"),
  new Rook("white", "right"),
  new Knight("white", "left"),
  new Knight("white", "right"),
  new Bishop("white", "right"),
  new Bishop("white", "left"),
  new Queen("white"),
  new King("white"),
  ...Array.from(new Array(8), (_, i) => new Pawn("white", i)),
];
// black_pieces.splice(-4, 1);
export { white_pieces, black_pieces };
